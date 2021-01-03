import React from 'react';
import {View,Text,StyleSheet,Image}from 'react-native';

const ResultFlatList = ({result}) =>{
  c = 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference='+result.photos[0].photo_reference+'&key=AIzaSyAkAQ543Uwj8tX22YOKkU2xaaWwqvsXmzk'
return <View style={Style.container}>
         <Image style ={Style.imageStyle} source={{uri:c}}/>
         <Text style ={Style.name}>{result.name}</Text>
        <Text>{result.rating} Stares from {result.user_ratings_total}</Text>
       </View>

};

const Style = StyleSheet.create ({
 container:{
   marginLeft:10
 },
 imageStyle:{
   width:240,
   borderRadius:5,
   height:120
 },
 name:{
   fontWeight:"bold"
 }
});

export default ResultFlatList;