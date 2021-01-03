import React from 'react';
import {View,Text,StyleSheet,Image,TouchableOpacity}from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Icon2 from 'react-native-vector-icons/Fontisto';
import Icon3 from 'react-native-vector-icons/Ionicons';
const TourPost = props =>{
    return <View style = {Styles.mainCantiner}>
              <View style = {Styles.upCantiner}>
                  <View style = {Styles.upCantinerLeft}>
                      <View >
                        <Image
                            style={Styles.circleMaskImage}
                            source={{
                                uri: 'https://www.yourdictionary.com/images/definitions/lg/10750.person.jpg',
                            }}
                        />
                      </View>
                      <View style = {Styles.upCantinerLeftLocationName}>
                          <View>
                              <Text>{props.PostValueName}</Text>
                          </View>

                          <View style = {Styles.upCantinerLeftLocation}>
                              <Text>{props.PostValueLocation}</Text>
                              <View style = {Styles.upCantinerLeftLocationWorld}>
                              <Icon2
                                name='world-o'
                                size={12}
                                color='#00aeef'
                                />
                              </View>
                          </View>
                      </View>
                  </View>
                  <TouchableOpacity onPress={()=>{console.log()}}
                  style = {Styles.upCantinerRight}>
                        <Icon
                            name='ellipsis-v'
                            size={20}
                            color='#00aeef'
                            />
                  </TouchableOpacity>
              </View>
              <View style = {Styles.midCantiner}>
                  <View>
                      <Text>{props.PostValuedescription}</Text>
                  </View>
                  <View>
                  <Image
                            style={Styles.mainImage}
                            source={{
                                uri: props.image,
                            }}
                        />
                  </View>
              </View>
              <View style = {Styles.botomCantiner}>
                  <View style={Styles.botomIconCantinerOne}>
                      <View><Text>{props.PostValueIcones}</Text></View>
                      <View><Text>{props.PostValueComments}</Text></View>
                  </View >
                  <View style={Styles.botomIconCantinerTwo}>
                        <Icon2
                            name='like'
                            size={25}
                            color='#00aeef'
                            />
                         <Icon3
                            name='location-sharp'
                            size={25}
                            color='#00aeef'
                            /> 
                         <Icon
                            name='comments'
                            size={25}
                            color='#00aeef'
                            />  
                         <Icon
                            name='share-alt'
                            size={25}
                            color='#00aeef'
                            /> 
                  </View>
              </View>
           </View>
};

const Styles = StyleSheet.create ({
   mainCantiner:{
    marginTop:20,
    borderRadius:5,
    height:300,
    width:'95%',
    shadowColor: '#00aeef',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,  
    elevation: 1,
    backgroundColor:'#f5fffa',
    marginLeft:'2.5%',
   },
   upCantiner:{
    flex: 1,
    height:500,
    width:'95%',
    flexDirection:'row',
    justifyContent:'center',
    marginBottom:5,
    marginRight:10,
    marginTop:10,
    marginLeft:10, 
   },
   upCantinerRight:{
    justifyContent:'center',
    marginRight:10
   },
   upCantinerLeft:{
    flex: 1,
    width:'95%',
    flexDirection:'row',
    justifyContent:'center',

    
   },
   upCantinerLeftLocationName:{
    flex: 1,
    height:500,
    width:'95%',
    flexDirection:'column',
    marginLeft:10,
   },
   upCantinerLeftLocation:{
    width:'95%',
    flexDirection:'row',
    
   },
   upCantinerLeftLocationWorld:{
    justifyContent:'center',
    marginLeft:4,
    marginTop:1
   },
   midCantiner:{
    flex: 6,
    flexDirection:'column',
    margin:5,
    overflow: "hidden",
   },
   botomCantiner:{
    flex: 2,
    flexDirection:'column',
   },
   botomIconCantinerOne:{
    flexDirection: 'row',
    justifyContent:'space-between',
    marginLeft:10,
    marginRight:10,
   },
   botomIconCantinerTwo:{
    flex: 1,
    flexDirection: 'row',
    justifyContent:'space-around',

   },
   circleMaskImage : {
    borderColor: '#00aeef',
    borderWidth: 2,   
    width: 40,
    height: 40,
    borderRadius: 50 / 2,
    overflow: "hidden",
 
   },
   mainImage : {
    width: '100%',
    height: '100%',

   }
   
});

export default TourPost;