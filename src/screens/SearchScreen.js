'use strict';
import React ,{Component}from 'react';
import {View,Text,StyleSheet,ScrollView,ActivityIndicator,StatusBar}from 'react-native';
import {ArHeder} from '../components/common/arHeder';
import { withNavigation } from 'react-navigation';
import googleApi from '../Api/googlePlaces';
import Geolocation from 'react-native-geolocation-service';
import {PermissionsAndroid} from 'react-native';
import proj4 from "proj4";
import LinearGradient from 'react-native-linear-gradient';
import SearchBar from '../components/SearchBar';
import ResultList from '../components/ResultList';

class SearchScreen extends Component{
    constructor() {
        super();
        this.state = {
          text : "Initializing AR...",
          isLoading:true,
          resultPlace:[],
          longitude:0,
          latitude:0,
          error:null,
          errorMessage:null,
          results:[],
          restaurantResult:[],
          restaurantImages:[],
          touristAttraction:[],
          touristAttractionImage:[],
          cafe:[],
          cafeImage:[],
          supermarket:[],
          supermarketImages:[],
          room:[],
          roomImage:[]
        };
        this.forceUpdateHandler = this.forceUpdateHandler.bind(this);
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
                    //console.log("My current location", JSON.stringify(position));
                    //console.log(this.state.text)
                    await this.setState({longitude: position.coords.latitude.toString(),latitude:position.coords.longitude.toString()})
                    //console.log(this.state.latitude+this.state.longitude+"dsawsd")
                    this.setState({touristAttraction:await this.SearchApi(position.coords.latitude,position.coords.longitude,"tourist_attraction")})
                    await this.SearchApiImage(this.state.touristAttraction,this.state.touristAttractionImage)

                    this.setState({restaurantResult:await this.SearchApi(position.coords.latitude,position.coords.longitude,"restaurant")})
                    await this.SearchApiImage(this.state.restaurantResult,this.state.restaurantImages)

                    this.setState({cafe:await this.SearchApi(position.coords.latitude,position.coords.longitude,"cafe")})
                    await this.SearchApiImage(this.state.cafe,this.state.cafeImage)

                    this.setState({supermarket:await this.SearchApi(position.coords.latitude,position.coords.longitude,"supermarket")})
                    await this.SearchApiImage(this.state.supermarket,this.state.supermarketImages)
                    this.setState({room:await this.SearchApi(position.coords.latitude,position.coords.longitude,"hospital")})
                    await this.SearchApiImage(this.state.room,this.state.roomImage).then(()=>this.state.isLoading = false)
                    await this.forceUpdateHandler();
                    // proj4.defs("EPSG:27700", "+proj=tmerc +lat_0=49 +lon_0=-2 +k=0.9996012717 +x_0=400000 +y_0=-100000 +ellps=airy +datum=OSGB36 +units=m +no_defs");
                    // [ x, y]= proj4('EPSG:27700','EPSG:4326').inverse( [ parseInt(this.state.longitude), parseInt(this.state.latitude) ] ); // lon, lat !!! 
                    // console.log(x)
                    // console.log(y)
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
        //this.SearchApi()
        
    }
    componentWillUnmoun (){
        Geolocation.clearWatch(this.watchID)
       
      }
    
    
      async SearchApi(La,Lo,type) {  
          console.log(this.state.latitude+this.state.longitude+"ttt")
        try {
            const response = await googleApi.get('nearbysearch/json?location='+La+','+Lo,{
                params:{
                  radius:10000,
                  type:type,
                  key:'AIzaSyAkAQ543Uwj8tX22YOKkU2xaaWwqvsXmzk'
                }
            });
            //this.setState({results:response.data.results});
            console.log(response.data.results)
                return response.data.results;
           
            //console.log(response)
        } catch (error) {
            //this.setState({errorMessage:'error'});
            console.log(error)
            return error
            
        }
        
     }

     async SearchApiImage(imageObject,NewPushObject) {  
            for (var  j = 0;j <imageObject.length;j++){
                console.log(j)
                if(!imageObject[j].photos){
                    console.log(imageObject[j]+"un")
                }else{
                        // console.log(this.state.results[j].photos[0].photo_reference+"gkgkgk")
                        //     try {
                        //         const responseImage = await googleApi.get('photo?maxwidth=400',{
                        //             params:{
                        //             photoreference:this.state.results[j].photos[0].photo_reference,
                        //             key:'AIzaSyAkAQ543Uwj8tX22YOKkU2xaaWwqvsXmzk'
                        //             }
                        //         });
                        //         this.setState({images:responseImage});
                        //         console.log(responseImage+"Image")
                        //         //console.log(response)
                        //     } catch (error) {
                        //         console.log(error)
                        //     }
                        console.log(imageObject[j]+"undddss")
                        NewPushObject.push(imageObject[j])
         
                }
                
              }  
              console.log(NewPushObject.length+"Imagjkkkkkkkkkkkkkkke")               
     }

     resultPeice(price){
        return this.state.results.filter(result=>{
           return result.price === price;
        })
        
        
    }
    forceUpdateHandler(){
        this.forceUpdate();
      };

    render(){
         if(this.state.isLoading){
             return<View style= {{flex:1,justifyContent: 'center'}}>
                 {this.state.isLoading? <ActivityIndicator size="large" color="#00aeef" />:null}  
             </View>  
         }
         if(!this.state.isLoading){
        return <View style= {{flex:1}}>
                    <LinearGradient colors={['#be93c5',  '#7bc6cc']}  style={Styles.linearGradient}>
                    <ArHeder headerText = {"Place Search"} navigationProp ={this.props.navigation}/>
                    <StatusBar translucent={true} backgroundColor={'transparent'} />  
                    <SearchBar
                    term={this.state.term}
                    ontermChange ={newTerm => this.setState({term:newTerm})}
                    onTermSubmit = {()=> this.SearchApi(this.state.term)}
                    />
                    <Text>{this.state.resultsGoogle}</Text>
                {this.state.errorMessage?<Text>{this.state.errorMessage}</Text>:null}
                <ScrollView>
                        <ResultList title = {"Tourist Attraction Place"} result = {this.state.touristAttractionImage}/>
                        <ResultList title = {"Hotels"} result = {this.state.restaurantImages}/>
                        <ResultList title = {"Cafe"} result = {this.state.cafeImage}/>
                        <ResultList title = {"Supermarket"} result = {this.state.supermarketImages}/>
                        <ResultList title = {"Hospital"} result = {this.state.roomImage}/>
               
                </ScrollView>
                </LinearGradient>
            </View>
         }
    }
};
SearchScreen.navigationOptions = () =>{
    return{
      headerShown: false,
    };
  };
const Styles = StyleSheet.create ({
    linearGradient: {
        paddingTop:"5%",
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        borderRadius: 5,
        height: "100%",
        width: "100%",
      },
});

export default withNavigation(SearchScreen);