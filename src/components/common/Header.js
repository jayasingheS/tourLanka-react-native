// Import libraries for making a component
import React from 'react';
import {Text, View,TouchableOpacity} from 'react-native';
import Icon3 from 'react-native-vector-icons/Ionicons';
// Make a component
const Header = (props) => {
  const {textStyle, viewStyle,textStyleIcons} = styles;

  return (
    <View style={viewStyle}>
      <Text style={textStyle}>{props.headerText}</Text>
      <View style={textStyleIcons}>
            <TouchableOpacity
            onPress ={()=>props.navigationProp.navigate('SearchOne')}>
                          <Icon3
                           name='search'
                            size={25}
                            color='#000000'
                            /> 
            </TouchableOpacity>
            <TouchableOpacity
            onPress ={()=>props.navigationProp.navigate('AddEditeScreen')}>
                          <Icon3
                            name='add'
                            size={25}
                            color='#000000'
                            /> 
            </TouchableOpacity>
          </View>
    </View>
  );
};

const styles = {
  viewStyle: {
    flexDirection:'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 60,
    paddingTop: 15,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    elevation: 2,
    position: 'relative',
    width: "95%",


  },
  textStyle: {
    fontSize: 20,
    marginLeft:'2.5%',

  },
  textStyleIcons:{
    flexDirection:'row',
    justifyContent: 'space-around',
    width:90,
    paddingTop: 15,
   // borderColor: '#00aeef',
   // borderWidth: 2,  
    height: 60,
    paddingTop: 15,
    marginRight:'2.5%',
  }
};

// Make the component available to other parts of the app
export {Header};
