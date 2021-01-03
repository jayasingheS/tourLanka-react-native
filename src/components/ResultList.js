import React from 'react';
import {View,Text,StyleSheet,FlatList}from 'react-native';
import ResultFlatList from './resultFlatList'
const ResultList = (props) =>{
return <View>
          <Text style ={Style.titleStyle}>{props.title}</Text>
           <FlatList
           horizontal
           showsHorizontalScrollIndicator={false}
           data={props.result}
           renderItem={
               ({item})=>{
                   return <ResultFlatList result = {item}/>
                   
               }
           }
           keyExtractor={(item, index) => index.toString()}
           />
       </View>

};

const Style = StyleSheet.create ({
titleStyle:{
    fontSize:18,
    fontWeight:'bold',
    marginLeft:10
}
});

export default ResultList;