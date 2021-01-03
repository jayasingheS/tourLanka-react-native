/**
 * Copyright (c) 2017-present, Viro, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */
import LinearGradient from 'react-native-linear-gradient';
import React, { Component } from 'react';

import {
  AppRegistry,
  Text,
  StatusBar,
  Image,
  View,
  StyleSheet,
  PixelRatio,
  TouchableHighlight,
  ScrollView
} from 'react-native';

import {
  ViroVRSceneNavigator,
  ViroARSceneNavigator
} from 'react-viro';

/*
 TODO: Insert your API key below
 */
var sharedProps = {
  apiKey:"API_KEY_HERE",
}
var sharedPropsTwo = {
  apiKey:"API_KEY_HERE",
}

// Sets the default scene you want for AR and VR
var InitialARScene = require('../arStreetView/arStreetView');
//var InitialARScene = require('../../../js/HelloWorldSceneAR');
//var InitialARSceneTwo = require('../../../js/HelloWorldSceneAR');


var UNSET = "UNSET";
var VR_NAVIGATOR_TYPE = "VR";
var AR_NAVIGATOR_TYPE = "AR";
var AR_NAVIGATOR_TYPETWO = "AR";
// This determines which type of experience to launch in, or UNSET, if the user should
// be presented with a choice of AR or VR. By default, we offer the user a choice.
var defaultNavigatorType = UNSET;




export default class ViroSample extends Component {
  constructor() {
    super();

    this.state = {
      navigatorType : defaultNavigatorType,
      sharedProps : sharedProps,
      sharedPropsTwo : sharedPropsTwo
    }
    this._getExperienceSelector = this._getExperienceSelector.bind(this);
    this._getARNavigator = this._getARNavigator.bind(this);
    this._getARNavigatorTwo = this._getARNavigatorTwo.bind(this);
    this._getVRNavigator = this._getVRNavigator.bind(this);
    this._getExperienceButtonOnPress = this._getExperienceButtonOnPress.bind(this);
    this._exitViro = this._exitViro.bind(this);
  }
  static navigationOptions = {
    headerShown: false
}

  // Replace this function with the contents of _getVRNavigator() or _getARNavigator()
  // if you are building a specific type of experience.
  render() {
    if (this.state.navigatorType == UNSET) {
      return this._getExperienceSelector();
    } else if (this.state.navigatorType == VR_NAVIGATOR_TYPE) {
      return this._getVRNavigator();
    } else if (this.state.navigatorType == AR_NAVIGATOR_TYPE) {
      return this._getARNavigator();
    } else if (this.state.navigatorType == AR_NAVIGATOR_TYPETWO) {
      return this._getARNavigatorTwo();
    }
  }

  // Presents the user with a choice of an AR or VR experience
  _getExperienceSelector() {
    return (
      <LinearGradient colors={['#be93c5',  '#7bc6cc']}  style={localStyles.linearGradient}>
      <StatusBar translucent={true} backgroundColor={'transparent'} />  
        <View style={localStyles.inner}>
       <ScrollView  style={localStyles.scrollView}>
       <View style={localStyles.container}>
            <View style={localStyles.shadow} >
            <View style={localStyles.ElavationOne}>
              <Image source={require('../../images/Ar.png')}
                style={{
                  aspectRatio: 1,
                  width:350,
                  height: 380,
                  resizeMode: 'contain',
                  flexDirection: 'row',
                  justifyContent:'center',
                  }}/>
            </View>
            <View style={localStyles.ElavationTwo}>
              <TouchableHighlight style={localStyles.buttons}
                onPress={this._getExperienceButtonOnPress(AR_NAVIGATOR_TYPE)}
                underlayColor={'#68a0ff'} >
                <Text style={localStyles.buttonText}>Start</Text>     
              </TouchableHighlight>
            </View>
            </View> 
          </View>  

           <View style={localStyles.container}>
            <View style={localStyles.shadow} >
            <View style={localStyles.ElavationOne}>
              <Image source={require('../../images/ArRobot.png')}
                style={{
                  aspectRatio: 1,
                  width:410,
                  height: 440,
                  resizeMode: 'contain',
                  marginTop:-100
                  }}/>
            </View>
            <View style={localStyles.ElavationTwo}>
              <TouchableHighlight style={localStyles.buttons}
                onPress={this._getExperienceButtonOnPress(AR_NAVIGATOR_TYPETWO)}
                underlayColor={'#68a0ff'} >
                <Text style={localStyles.buttonText}>AR</Text>     
              </TouchableHighlight>
            </View>
            </View> 
          </View>      
          <View style={localStyles.container}>
            <View style={localStyles.shadow} >
            <View style={localStyles.ElavationOne}>
              <Image source={require('../../images/Ar.png')}
                style={{
                  aspectRatio: 1,
                  width:350,
                  height: 380,
                  resizeMode: 'contain',
                  flexDirection: 'row',
                  justifyContent:'center',
                  }}/>
            </View>
            <View style={localStyles.ElavationTwo}>
              <TouchableHighlight style={localStyles.buttons}
                onPress={this._getExperienceButtonOnPress(AR_NAVIGATOR_TYPETWO)}
                underlayColor={'#68a0ff'} >
                <Text style={localStyles.buttonText}>AR</Text>     
              </TouchableHighlight>
            </View>
            </View> 
          </View>          
          </ScrollView>        
            </View>
 </LinearGradient>
    );
  }

  // Returns the ViroARSceneNavigator which will start the AR experience
  _getARNavigator() {
    return (
      <ViroARSceneNavigator {...this.state.sharedProps}
        initialScene={{scene: InitialARScene}} />
    );
  }
  _getARNavigatorTwo() {
    return (
      <ViroARSceneNavigator {...this.state.sharedPropsTwo}
        initialScene={{scene: InitialARSceneTwo}} />
    );
  }
  // Returns the ViroSceneNavigator which will start the VR experience
  _getVRNavigator() {
    return (
      <ViroVRSceneNavigator {...this.state.sharedProps}
        initialScene={{scene: InitialVRScene}} onExitViro={this._exitViro}/>
    );
  }

  // This function returns an anonymous/lambda function to be used
  // by the experience selector buttons
  _getExperienceButtonOnPress(navigatorType) {
    return () => {
      this.setState({
        navigatorType : navigatorType
      })
    }
  }

  // This function "exits" Viro by setting the navigatorType to UNSET.
  _exitViro() {
    this.setState({
      navigatorType : UNSET
    })
  }
}

var localStyles = StyleSheet.create({
  inner: {
    flex : 1,
    flexDirection: 'column',
    alignItems:'center',
 
 
  },
  linearGradient: {
    paddingTop:"5%",
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    borderRadius: 5,
    height: "100%",
    width: "100%",
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems:'center',
  },
  titleText: {
    paddingTop: 30,
    paddingBottom: 20,
    color:'#fff',
    textAlign:'center',
    fontSize : 25
  },
  buttonText: {
    color:'#fff',
    textAlign:'center',
    fontSize : 20
  },
  buttons : {
    height: 60,
    width: 150,
    paddingTop:15,
    paddingBottom:20,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor:'#4169e1',
    borderRadius: 10,

  },
  exitButton : {
    height: 50,
    width: 100,
    paddingTop:10,
    paddingBottom:10,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor:'#68a0cf',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff',
  },
 
  shadow: {  
   width:'92%',
   borderColor:'#000',
   overflow:'hidden',
   borderRadius:5,
   backgroundColor:'#ffffff',
   height:300,
   marginTop:10,
   marginBottom:10,
   shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 5,
},
  ElavationOne:{
 
  },
  ElavationTwo:{
    margin: '50%',
    marginLeft:'55%',
    position: "absolute",
    top: 0,
    left: 0,
 
  },
scrollView: {
 
  marginHorizontal: 20,
  width:'100%',
  height:'100%',
 
},
});

module.exports = ViroSample
