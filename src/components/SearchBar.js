import React from 'react';
import {View,Text,StyleSheet,TextInput}from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { color } from 'react-native-reanimated';


const SearchBar = ({term,ontermChange,onTermSubmit}) =>{
    return <View style ={Style.bacgroungColor}>
         
         <Icon name='search'
                size={25}
                color='#000000'
                                />
       <TextInput 
       style={Style.inputStyle}
        placeholder="Search"
        value={term}
        onChangeText={ontermChange}
        onEndEditing={onTermSubmit} 
      />
    </View>
    
};

const Style = StyleSheet.create ({
  bacgroungColor:{
      height:50,
      marginHorizontal:10,
      borderRadius:5,
      flexDirection:"row",
      padding:10,
      alignItems:"center",
      marginTop:5,
 

  },
  inputStyle:{
    marginLeft:10,
    flex:1,
    height:40,
    
   
  }
});

export default SearchBar;