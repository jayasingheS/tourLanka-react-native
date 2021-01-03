
import React, { Component } from 'react';
import {StyleSheet} from 'react-native';


import {
  ViroARScene,
  ViroText,
  ViroNode,

  ViroFlexView,
  ViroImage,

} from 'react-viro';


const Arnode = (props) =>{
    return (
        <ViroARScene onTrackingUpdated={this._onInitialized} >
                    <ViroNode
                          position={[0, 0, -5]}
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
                                    source={{uri:this.state.arNode[j].icon}}
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
  
                                                                    <ViroText text={this.state.arNode[j].name}
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
                                                                    source={{uri:"../../images/5.png"}}
                                                                              />
                                                                     <ViroText text={this.state.arNode[j].review_count+" Stares from"}
                                                                    width={0.5}
                                                                    height={0.1}
    
                                                                    style={styles.starTextStyle}/>
                                                </ViroFlexView>
                              </ViroFlexView>
                </ViroFlexView>          
            </ViroNode>
        </ViroARScene>
      );

};

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


export default Arnode;