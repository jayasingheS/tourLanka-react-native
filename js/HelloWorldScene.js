'use strict';

import React, { Component } from 'react';

import {StyleSheet} from 'react-native';

import {
  ViroScene,
  ViroText,
  Viro360Image,
  Viro3DObject,
  ViroAmbientLight,
  ViroSpotLight,
} from 'react-viro';

export default class HelloWorldScene extends Component {

  constructor() {
    super();

    this.state = {} // Set initial state here
  }

  render() {
    return (
      <ViroScene>
        <ViroAmbientLight color={"#aaaaaa"} />
                <ViroSpotLight innerAngle={5} outerAngle={90} direction={[0,-1,-.2]}
                  position={[0, 3, 1]} color="#ffffff" castsShadow={true} />
                <Viro3DObject
                    source={require('./res/emoji_smile/emoji_smile.vrx')}
                    resources={[require('./res/emoji_smile/emoji_smile_diffuse.png'),
                        require('./res/emoji_smile/emoji_smile_normal.png'),
                        require('./res/emoji_smile/emoji_smile_specular.png')]}
                    position={[-.5, .5, -1]}
                    scale={[.2, .2, .2]}
                    type="VRX" />
      </ViroScene>
    );
  }

}

var styles = StyleSheet.create({
  helloWorldTextStyle: {
    fontFamily: 'Arial',
    fontSize: 60,
    color: '#ffffff',
    textAlignVertical: 'center',
    textAlign: 'center',  
  },
});

module.exports = HelloWorldScene;
