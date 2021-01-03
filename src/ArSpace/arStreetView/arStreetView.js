'use strict';
import googleApi from '../../Api/googlePlaces';
import React, { Component } from 'react';
import Geolocation from 'react-native-geolocation-service';
import {PermissionsAndroid} from 'react-native';
import {StyleSheet} from 'react-native';
import proj4 from "proj4";

import {
  ViroARScene,
  ViroText,
  ViroConstants,
  ViroBox,
  ViroNode,
  ViroAmbientLight,
  ViroFlexView,
  ViroImage,
  ViroOmniLight,
  ViroOrbitCamera,
  ViroSpotLight
} from 'react-viro';

export default class StreetViewAR extends Component {

  constructor() {
    super();
    this.state = {
      text : "Initializing AR...",
      isAvailable: true,
      resultPlace:[],
      longitude:80.1810422,
      latitude:6.1318517,
      error:null,
      errorMessage:null,
      arNode:[],
      isLoading:true,
    };
    this._onInitialized = this._onInitialized.bind(this);
  }
  async componentDidMount() {
    const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
            'title': 'ReactNativeCode Location Permission',
            'message': 'ReactNativeCode App needs access to your location '
        })

    if (granted) {
        Geolocation.getCurrentPosition(
          async (position) => {
             let x,y;
                console.log("My current location", JSON.stringify(position));
                console.log(this.state.text);
                await this.setState({longitude: position.coords.latitude.toString(),latitude:position.coords.longitude.toString()});
                proj4.defs("EPSG:27700", "+proj=tmerc +lat_0=49 +lon_0=-2 +k=0.9996012717 +x_0=400000 +y_0=-100000 +ellps=airy +datum=OSGB36 +units=m +no_defs");
                [ x, y]= proj4('EPSG:27700','EPSG:4326').inverse( [ parseInt(this.state.longitude), parseInt(this.state.latitude) ] ); // lon, lat !!! 
                console.log(x+"longitude")
                console.log(y +"latitude")
                 this.setState({resultPlace:await this.SearchApi(position.coords.latitude,position.coords.longitude)});
                await this.projFourCoordinateConverter(this.state.resultPlace,x,y).then(()=>this.state.isLoading = false);
                console.log(this.state.text);

            },
            (error) => {

                console.log(error.code, error.message);
                this.setState({error:error.message})
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
            
        this.watchID = navigator.geolocation.watchPosition((lastPosition) => {
        this.setState({lastPosition});
});
    }
    
}
componentWillUnmoun (){
    Geolocation.clearWatch(this.watchID)
  }


  async SearchApi(La,Lo) {  
    console.log(this.state.latitude+this.state.longitude+"ttt")
  try {
      const response = await googleApi.get('nearbysearch/json?location='+La+','+Lo,{
          params:{
            radius:500,
            key:'AIzaSyAkAQ543Uwj8tX22YOKkU2xaaWwqvsXmzk'
          }
      });
      console.log(response.data.results)
          return response.data.results;

  } catch (error) {

      console.log(error)
      return error
      
  }
  
}
 async projFourCoordinateConverter(Places,CenterX,CenterY) {  
     console.log("ddjdj");
      for (var  j = 0;j <Places.length;j++){
            let projX=null,projY=null;
            let icon=null,name=null,rating=null,review_count=null;
            console.log(j);
            console.log(Places[j]+"un");
            proj4.defs("EPSG:27700", "+proj=tmerc +lat_0=49 +lon_0=-2 +k=0.9996012717 +x_0=400000 +y_0=-100000 +ellps=airy +datum=OSGB36 +units=m +no_defs");
            [ projX, projY]= proj4('EPSG:27700','EPSG:4326').inverse( [ Places[j].geometry.location.lng, Places[j].geometry.location.lat ] );
            console.log(Places[j].geometry.location.lng+" "+ Places[j].geometry.location.lat +" sdddefr4rrrrr");
            console.log(projX+" "+ projY);
            projX = projX - CenterX;
            projY = projY - CenterY;
            icon  = Places[j].icon;
            name  = Places[j].name;
            console.log(projX +"ddjd");
            if(4 < Places[j].rating <=5){
              rating= "../../images/5.png"
            }
            if(3 < Places[j].rating <=4){
              rating= "../../images/4.png"
            }
            if(2 < Places[j].rating <=3){
              rating= "../../images/3.png"
            }
            if(1 < Places[j].rating <=2){
              rating= "../../images/2.png"
            }
            if(0 < Places[j].rating <= 1){
              rating= "../../images/1.png"
            }
            if(Places[j].rating == "undefined"){
              rating= "../../images/5.png"
            }
            review_count = Places[j].user_ratings_total;
            console.log(projX+" "+ projY);
            this.setState({arNode:[...this.state.arNode,{projX,projY,
                                  icon,
                                  name,
                                  rating,
                                  review_count}]});
           console.log(icon+name+rating+review_count)
      
      }  
      console.log(this.state.arNode)
}


  render() {
if(this.state.isLoading){
    return (
      <ViroARScene onTrackingUpdated={this._onInitialized} >
        <ViroText text={this.state.text} scale={[.5, .5, .5]} position={[0, 0, -1]} style={styles.helloWorldTextStyle} />
      </ViroARScene>
    );
    }

    if(!this.state.isLoading){

      return (
        <ViroARScene onTrackingUpdated={this._onInitialized} >
                    <ViroNode
                          position={[10, 3, -0]}
                          rotation={[0, 0, 0]}
                          scale={[1.0, 1.0, 1.0]}
                      >
  
              <ViroFlexView style={this.state.isAvailable ? styles.containerAvail : styles.containerNotAvail}
                            width={5}
                            height={2}
                            position={[0, 0, -5]}
                            rotation={[0, 0, 0]}>  
                          <ViroFlexView style={styles.imageIcone}
                                        width={2}
                                        height={2}
                                        position={[-2, 0, -3]}
                                        rotation={[0, 0, 0]}>
  
                                  <ViroImage
                                    height={1}
                                    width={1}
                                    placeholderSource={require("../../images/sjsj.png")}
                                    source={{uri:this.state.arNode[0].icon}}
                                              />
                          
                              </ViroFlexView> 
                              <ViroFlexView style={styles.ratingStyle}
                                            width={3}
                                            height={2}
                                            position={[0, 0, -3]}
                                            rotation={[0, 0, 0]}>
  
  
                                                <ViroFlexView style={styles.nameStyle}
                                                              width={3}
                                                              height={1}
                                                              position={[0, 0, -3]}
                                                              rotation={[0, 0, 0]}>
  
                                                                    <ViroText text={this.state.arNode[0].name}
                                                                    width={3}
                                                                    height={1}
                                                                    style={styles.helloWorldTextStyle}/>
  
                                                </ViroFlexView>
  
                                                <ViroFlexView style={styles.starStyle}
                                                              width={3}
                                                              height={1}
                                                              position={[0, 0, -3]}
                                                              rotation={[0, 0, 0]}>
                                                                  <ViroImage
                                                                    height={0.5}
                                                                    width={2}
                                                                    placeholderSource={require("../../images/5.png")}
                                                                    source={{uri:this.state.arNode[0].rating}}
                                                                              />
                                                                     <ViroText text={this.state.arNode[0].review_count+" Stares from"}
                                                                    width={0.5}
                                                                    height={0.1}
    
                                                                    style={styles.starTextStyle}/>
                                                </ViroFlexView>
                              </ViroFlexView>
                </ViroFlexView>          
            </ViroNode>








            <ViroNode
                          position={[10, 3, -10]}
                          rotation={[0, 0, 0]}
                          scale={[1.0, 1.0, 1.0]}
                      >
  
              <ViroFlexView style={this.state.isAvailable ? styles.containerAvail : styles.containerNotAvail}
                            width={5}
                            height={2}
                            position={[0, 0, -5]}
                            rotation={[0, 0, 0]}>  
                          <ViroFlexView style={styles.imageIcone}
                                        width={2}
                                        height={2}
                                        position={[-2, 0, -3]}
                                        rotation={[0, 0, 0]}>
  
                                  <ViroImage
                                    height={1}
                                    width={1}
                                    placeholderSource={require("../../images/sjsj.png")}
                                    source={{uri:this.state.arNode[2].icon}}
                                              />
                          
                              </ViroFlexView> 
                              <ViroFlexView style={styles.ratingStyle}
                                            width={3}
                                            height={2}
                                            position={[0, 0, -3]}
                                            rotation={[0, 0, 0]}>
  
  
                                                <ViroFlexView style={styles.nameStyle}
                                                              width={3}
                                                              height={1}
                                                              position={[0, 0, -3]}
                                                              rotation={[0, 0, 0]}>
  
                                                                    <ViroText text={this.state.arNode[2].name}
                                                                    width={3}
                                                                    height={1}
                                                                    style={styles.helloWorldTextStyle}/>
  
                                                </ViroFlexView>
  
                                                <ViroFlexView style={styles.starStyle}
                                                              width={3}
                                                              height={1}
                                                              position={[0, 0, -3]}
                                                              rotation={[0, 0, 0]}>
                                                                  <ViroImage
                                                                    height={0.5}
                                                                    width={2}
                                                                    placeholderSource={require("../../images/5.png")}
                                                                    source={{uri:this.state.arNode[2].rating}}
                                                                              />
                                                                     <ViroText text={this.state.arNode[2].review_count+" Stares from"}
                                                                    width={0.5}
                                                                    height={0.1}
    
                                                                    style={styles.starTextStyle}/>
                                                </ViroFlexView>
                              </ViroFlexView>
                </ViroFlexView>          
            </ViroNode>

            <ViroNode
                          position={[10, 3, -20]}
                          rotation={[0, 0, 0]}
                          scale={[1.0, 1.0, 1.0]}
                      >
  
              <ViroFlexView style={this.state.isAvailable ? styles.containerAvail : styles.containerNotAvail}
                            width={5}
                            height={2}
                            position={[0, 0, -5]}
                            rotation={[0, 0, 0]}>  
                          <ViroFlexView style={styles.imageIcone}
                                        width={2}
                                        height={2}
                                        position={[-2, 0, -3]}
                                        rotation={[0, 0, 0]}>
  
                                  <ViroImage
                                    height={1}
                                    width={1}
                                    placeholderSource={require("../../images/sjsj.png")}
                                    source={{uri:this.state.arNode[3].icon}}
                                              />
                          
                              </ViroFlexView> 
                              <ViroFlexView style={styles.ratingStyle}
                                            width={3}
                                            height={2}
                                            position={[0, 0, -3]}
                                            rotation={[0, 0, 0]}>
  
  
                                                <ViroFlexView style={styles.nameStyle}
                                                              width={3}
                                                              height={1}
                                                              position={[0, 0, -3]}
                                                              rotation={[0, 0, 0]}>
  
                                                                    <ViroText text={this.state.arNode[3].name}
                                                                    width={3}
                                                                    height={1}
                                                                    style={styles.helloWorldTextStyle}/>
  
                                                </ViroFlexView>
  
                                                <ViroFlexView style={styles.starStyle}
                                                              width={3}
                                                              height={1}
                                                              position={[0, 0, -3]}
                                                              rotation={[0, 0, 0]}>
                                                                  <ViroImage
                                                                    height={0.5}
                                                                    width={2}
                                                                    placeholderSource={require("../../images/5.png")}
                                                                    source={{uri:this.state.arNode[3].rating}}
                                                                              />
                                                                     <ViroText text={this.state.arNode[3].review_count+" Stares from"}
                                                                    width={0.5}
                                                                    height={0.1}
    
                                                                    style={styles.starTextStyle}/>
                                                </ViroFlexView>
                              </ViroFlexView>
                </ViroFlexView>          
            </ViroNode>




      <ViroNode
                          position={[10, 3, -30]}
                          rotation={[0, 0, 0]}
                          scale={[1.0, 1.0, 1.0]}
                      >
  
              <ViroFlexView style={this.state.isAvailable ? styles.containerAvail : styles.containerNotAvail}
                            width={5}
                            height={2}
                            position={[0, 0, -5]}
                            rotation={[0, 0, 0]}>  
                          <ViroFlexView style={styles.imageIcone}
                                        width={2}
                                        height={2}
                                        position={[-2, 0, -3]}
                                        rotation={[0, 0, 0]}>
  
                                  <ViroImage
                                    height={1}
                                    width={1}
                                    placeholderSource={require("../../images/sjsj.png")}
                                    source={{uri:this.state.arNode[4].icon}}
                                              />
                          
                              </ViroFlexView> 
                              <ViroFlexView style={styles.ratingStyle}
                                            width={3}
                                            height={2}
                                            position={[0, 0, -3]}
                                            rotation={[0, 0, 0]}>
  
  
                                                <ViroFlexView style={styles.nameStyle}
                                                              width={3}
                                                              height={1}
                                                              position={[0, 0, -3]}
                                                              rotation={[0, 0, 0]}>
  
                                                                    <ViroText text={this.state.arNode[4].name}
                                                                    width={3}
                                                                    height={1}
                                                                    style={styles.helloWorldTextStyle}/>
  
                                                </ViroFlexView>
  
                                                <ViroFlexView style={styles.starStyle}
                                                              width={3}
                                                              height={1}
                                                              position={[0, 0, -3]}
                                                              rotation={[0, 0, 0]}>
                                                                  <ViroImage
                                                                    height={0.5}
                                                                    width={2}
                                                                    placeholderSource={require("../../images/5.png")}
                                                                    source={{uri:this.state.arNode[4].rating}}
                                                                              />
                                                                     <ViroText text={this.state.arNode[4].review_count+" Stares from"}
                                                                    width={0.5}
                                                                    height={0.1}
    
                                                                    style={styles.starTextStyle}/>
                                                </ViroFlexView>
                              </ViroFlexView>
                </ViroFlexView>          
            </ViroNode>

            <ViroNode
                          position={[-10, 3, -0]}
                          rotation={[0, 0, 0]}
                          scale={[1.0, 1.0, 1.0]}
                      >
  
              <ViroFlexView style={this.state.isAvailable ? styles.containerAvail : styles.containerNotAvail}
                            width={5}
                            height={2}
                            position={[0, 0, -5]}
                            rotation={[0, 0, 0]}>  
                          <ViroFlexView style={styles.imageIcone}
                                        width={2}
                                        height={2}
                                        position={[-2, 0, -3]}
                                        rotation={[0, 0, 0]}>
  
                                  <ViroImage
                                    height={1}
                                    width={1}
                                    placeholderSource={require("../../images/sjsj.png")}
                                    source={{uri:this.state.arNode[5].icon}}
                                              />
                          
                              </ViroFlexView> 
                              <ViroFlexView style={styles.ratingStyle}
                                            width={3}
                                            height={2}
                                            position={[0, 0, -3]}
                                            rotation={[0, 0, 0]}>
  
  
                                                <ViroFlexView style={styles.nameStyle}
                                                              width={3}
                                                              height={1}
                                                              position={[0, 0, -3]}
                                                              rotation={[0, 0, 0]}>
  
                                                                    <ViroText text={this.state.arNode[5].name}
                                                                    width={3}
                                                                    height={1}
                                                                    style={styles.helloWorldTextStyle}/>
  
                                                </ViroFlexView>
  
                                                <ViroFlexView style={styles.starStyle}
                                                              width={3}
                                                              height={1}
                                                              position={[0, 0, -3]}
                                                              rotation={[0, 0, 0]}>
                                                                  <ViroImage
                                                                    height={0.5}
                                                                    width={2}
                                                                    placeholderSource={require("../../images/5.png")}
                                                                    source={{uri:this.state.arNode[5].rating}}
                                                                              />
                                                                     <ViroText text={this.state.arNode[5].review_count+" Stares from"}
                                                                    width={0.5}
                                                                    height={0.1}
    
                                                                    style={styles.starTextStyle}/>
                                                </ViroFlexView>
                              </ViroFlexView>
                </ViroFlexView>          
            </ViroNode>







            <ViroNode
                          position={[-10, 3, -10]}
                          rotation={[0, 0, 0]}
                          scale={[1.0, 1.0, 1.0]}
                      >
  
              <ViroFlexView style={this.state.isAvailable ? styles.containerAvail : styles.containerNotAvail}
                            width={5}
                            height={2}
                            position={[0, 0, -5]}
                            rotation={[0, 0, 0]}>  
                          <ViroFlexView style={styles.imageIcone}
                                        width={2}
                                        height={2}
                                        position={[-2, 0, -3]}
                                        rotation={[0, 0, 0]}>
  
                                  <ViroImage
                                    height={1}
                                    width={1}
                                    placeholderSource={require("../../images/sjsj.png")}
                                    source={{uri:this.state.arNode[6].icon}}
                                              />
                          
                              </ViroFlexView> 
                              <ViroFlexView style={styles.ratingStyle}
                                            width={3}
                                            height={2}
                                            position={[0, 0, -3]}
                                            rotation={[0, 0, 0]}>
  
  
                                                <ViroFlexView style={styles.nameStyle}
                                                              width={3}
                                                              height={1}
                                                              position={[0, 0, -3]}
                                                              rotation={[0, 0, 0]}>
  
                                                                    <ViroText text={this.state.arNode[6].name}
                                                                    width={3}
                                                                    height={1}
                                                                    style={styles.helloWorldTextStyle}/>
  
                                                </ViroFlexView>
  
                                                <ViroFlexView style={styles.starStyle}
                                                              width={3}
                                                              height={1}
                                                              position={[0, 0, -3]}
                                                              rotation={[0, 0, 0]}>
                                                                  <ViroImage
                                                                    height={0.5}
                                                                    width={2}
                                                                    placeholderSource={require("../../images/5.png")}
                                                                    source={{uri:this.state.arNode[6].rating}}
                                                                              />
                                                                     <ViroText text={this.state.arNode[6].review_count+" Stares from"}
                                                                    width={0.5}
                                                                    height={0.1}
    
                                                                    style={styles.starTextStyle}/>
                                                </ViroFlexView>
                              </ViroFlexView>
                </ViroFlexView>          
            </ViroNode>





            <ViroNode
                          position={[-10, 3, -20]}
                          rotation={[0, 0, 0]}
                          scale={[1.0, 1.0, 1.0]}
                      >
  
              <ViroFlexView style={this.state.isAvailable ? styles.containerAvail : styles.containerNotAvail}
                            width={5}
                            height={2}
                            position={[0, 0, -5]}
                            rotation={[0, 0, 0]}>  
                          <ViroFlexView style={styles.imageIcone}
                                        width={2}
                                        height={2}
                                        position={[-2, 0, -3]}
                                        rotation={[0, 0, 0]}>
  
                                  <ViroImage
                                    height={1}
                                    width={1}
                                    placeholderSource={require("../../images/sjsj.png")}
                                    source={{uri:this.state.arNode[7].icon}}
                                              />
                          
                              </ViroFlexView> 
                              <ViroFlexView style={styles.ratingStyle}
                                            width={3}
                                            height={2}
                                            position={[0, 0, -3]}
                                            rotation={[0, 0, 0]}>
  
  
                                                <ViroFlexView style={styles.nameStyle}
                                                              width={3}
                                                              height={1}
                                                              position={[0, 0, -3]}
                                                              rotation={[0, 0, 0]}>
  
                                                                    <ViroText text={this.state.arNode[7].name}
                                                                    width={3}
                                                                    height={1}
                                                                    style={styles.helloWorldTextStyle}/>
  
                                                </ViroFlexView>
  
                                                <ViroFlexView style={styles.starStyle}
                                                              width={3}
                                                              height={1}
                                                              position={[0, 0, -3]}
                                                              rotation={[0, 0, 0]}>
                                                                  <ViroImage
                                                                    height={0.5}
                                                                    width={2}
                                                                    placeholderSource={require("../../images/5.png")}
                                                                    source={{uri:this.state.arNode[7].rating}}
                                                                              />
                                                                     <ViroText text={this.state.arNode[7].review_count+" Stares from"}
                                                                    width={0.5}
                                                                    height={0.1}
    
                                                                    style={styles.starTextStyle}/>
                                                </ViroFlexView>
                              </ViroFlexView>
                </ViroFlexView>          
            </ViroNode>

            <ViroNode
                          position={[-10, 3, -30]}
                          rotation={[0, 0, 0]}
                          scale={[1.0, 1.0, 1.0]}
                      >
  
              <ViroFlexView style={this.state.isAvailable ? styles.containerAvail : styles.containerNotAvail}
                            width={5}
                            height={2}
                            position={[0, 0, -5]}
                            rotation={[0, 0, 0]}>  
                          <ViroFlexView style={styles.imageIcone}
                                        width={2}
                                        height={2}
                                        position={[-2, 0, -3]}
                                        rotation={[0, 0, 0]}>
  
                                  <ViroImage
                                    height={1}
                                    width={1}
                                    placeholderSource={require("../../images/sjsj.png")}
                                    source={{uri:this.state.arNode[8].icon}}
                                              />
                          
                              </ViroFlexView> 
                              <ViroFlexView style={styles.ratingStyle}
                                            width={3}
                                            height={2}
                                            position={[0, 0, -3]}
                                            rotation={[0, 0, 0]}>
  
  
                                                <ViroFlexView style={styles.nameStyle}
                                                              width={3}
                                                              height={1}
                                                              position={[0, 0, -3]}
                                                              rotation={[0, 0, 0]}>
  
                                                                    <ViroText text={this.state.arNode[8].name}
                                                                    width={3}
                                                                    height={1}
                                                                    style={styles.helloWorldTextStyle}/>
  
                                                </ViroFlexView>
  
                                                <ViroFlexView style={styles.starStyle}
                                                              width={3}
                                                              height={1}
                                                              position={[0, 0, -3]}
                                                              rotation={[0, 0, 0]}>
                                                                  <ViroImage
                                                                    height={0.5}
                                                                    width={2}
                                                                    placeholderSource={require("../../images/5.png")}
                                                                    source={{uri:this.state.arNode[8].rating}}
                                                                              />
                                                                     <ViroText text={this.state.arNode[8].review_count+" Stares from"}
                                                                    width={0.5}
                                                                    height={0.1}
    
                                                                    style={styles.starTextStyle}/>
                                                </ViroFlexView>
                              </ViroFlexView>
                </ViroFlexView>          
            </ViroNode>

        </ViroARScene>
      );
      
    }

  }

  _onInitialized(state, reason) {
    if (state == ViroConstants.TRACKING_NORMAL) {
      this.setState({
        text : "loading..."
      });
    } else if (state == ViroConstants.TRACKING_NONE) {
    }
  }
}

var styles = StyleSheet.create({
  helloWorldTextStyle: {
    fontFamily: 'Arial',
    fontSize: 30,
    color: '#ffffff',
    textAlignVertical: 'center',
    textAlign: 'center', 
   
  },
  starTextStyle: {
    fontFamily: 'Arial',
    fontSize: 10,
    color: '#ffffff',
    textAlignVertical: 'center',
    textAlign: 'center', 
   
    paddingTop:0.5
  },

    nextMeeting: {
      fontFamily: 'Arial',
      fontSize: 32,
      flex: .5,
      color: '#FFFFFF'
  },
  containerAvail: {
      flexDirection: 'row',
      backgroundColor: "#00ff7f",
 
 
  },
  containerNotAvail: {
      flexDirection: 'row',
      backgroundColor: "#e91530",
 
  },
  imageIcone:{
    backgroundColor: "#002366",
    paddingTop:0.5,
    paddingLeft:0.5
 
  },
  ratingStyle:{
    flexDirection: 'column',
    backgroundColor: "#3b3b3b",
   
  
  },
  nameStyle:{
    backgroundColor: "#3b3b3b",

  },
  starStyle:{
    flexDirection: 'row',
    backgroundColor: "#3b3b3b",
   
  
  },
});

module.exports = StreetViewAR;
