import React,{useContext,Component} from 'react';
import {View,Text,StyleSheet,Button,StatusBar,Dimensions, Image,TouchableOpacity}from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import DropShadow from "react-native-drop-shadow";
import { CheckBox } from 'react-native-elements'
import Icon3 from 'react-native-vector-icons/Ionicons';
import { launchImageLibrary,launchCamera } from 'react-native-image-picker';
import {Header} from '../components/common/Header';
export default class  AddEdite extends Component {
    
    constructor() {
        super();
        this.state = { 
             pickedImaged:null,
            
        };
        this.picImageHadeler = this.picImageHadeler.bind(this);
        this.CameraHadeler = this.CameraHadeler.bind(this);
      }
    static navigationOptions = {
        headerShown: false
    }

    picImageHadeler(){
         launchImageLibrary({title:"Image"}, res=> {
            if (res.didCancel) {
            console.log('User cancelled image picker');
            } else if (res.error) {
            console.log('ImagePicker Error: ', res.error);
            } else if (res.customButton) {
            console.log('User tapped custom button: ', res.customButton);
            alert(res.customButton);
            } else {
                this.setState({pickedImaged:res.uri})
                console.log('User tapped custom button: ', res.uri);
            }
            });
    }
    CameraHadeler(){
        launchCamera({title:"Image"}, res=> {
           if (res.didCancel) {
           console.log('User cancelled image picker');
           } else if (res.error) {
           console.log('ImagePicker Error: ', res.error);
           } else if (res.customButton) {
           console.log('User tapped custom button: ', res.customButton);
           alert(res.customButton);
           } else {
               this.setState({pickedImaged:res.uri})
               console.log('User tapped custom button: ', res.uri);
           }
           });
   }
    render(){
         return(
            <View style={styles.container}>
                <LinearGradient colors={['#be93c5',  '#7bc6cc']}  style={styles.linearGradient}>
                    <StatusBar translucent={true} backgroundColor={'transparent'} />
                    <Header headerText = "post submit" navigationProp = {this.navigation}></Header>
                </LinearGradient >
 
                <DropShadow
                    style={{
                        shadowColor: "#000",
                        shadowOffset: {
                        width: 0,
                        height: 0,
                        },
                        shadowOpacity: 0.4,
                        shadowRadius: 5,
                    }}
                    >
                     <View style={styles.Box}>
                        <Text>Mine</Text> 
                     </View>
                 </DropShadow>

                 <TouchableOpacity
                           style={styles.buttonchack}
                           onPress={this.CameraHadeler}
                        >
                <DropShadow
                    style={{
                        shadowColor: "#000",
                        shadowOffset: {
                        width: 0,
                        height: 0,
                        },
                        shadowOpacity: 0.4,
                        shadowRadius: 5,
                    }}
                    >
                     <View style={styles.chackBox}>
                        <Text>Location</Text> 
                     </View>
                 </DropShadow>
  
                    </TouchableOpacity>
            <View style={styles.imageBox}>
            <DropShadow
                    style={{
                        shadowColor: "#000",
                        shadowOffset: {
                        width: 0,
                        height: 0,
                        },
                        shadowOpacity: 0.3,
                        shadowRadius: 5,
                    }}>
                     <TouchableOpacity
                           style={styles.button}
                           onPress={this.CameraHadeler}
                        >
                     <View style={styles.selectedIconBox}>
                     <Icon3
                            name='camera-outline'
                            size={50}
                            color='#00aeef'
                            /> 
                     </View>
                     </TouchableOpacity>
                      </DropShadow>
                      
                      <DropShadow
                    style={{
                        shadowColor: "#000",
                        shadowOffset: {
                        width: 0,
                        height: 0,
                        },
                        shadowOpacity: 0.3,
                        shadowRadius: 5,
                    }}>
                     <TouchableOpacity
                           style={styles.button}
                           onPress={this.picImageHadeler}
                        >
                     <View style={styles.selectedIconBox}>
                     <Icon3
                            name='add'
                            size={50}
                            color='#00aeef'
                            /> 
                     </View>
                     </TouchableOpacity>
                      </DropShadow>
                      <DropShadow
                            style={{
                                shadowColor: "#000",
                                shadowOffset: {
                                width: 0,
                                height: 0,
                                },
                                shadowOpacity: 0.3,
                                shadowRadius: 5,
                            }}>
                            <View style={styles.selectedImageBox}>
                            <Image source={{uri: this.state.pickedImaged}}
                                                    style={{
                                                    aspectRatio: 1,
                                                    height: 100,
                                                    width: 100,
                                                    resizeMode: 'contain',
                                                    flexDirection: 'column',
                                                    justifyContent:'center',
 
                                                    }}/>
                            </View>
                      </DropShadow>

             </View>


             <TouchableOpacity
                           style={styles.buttonchackTag}
                           onPress={this.CameraHadeler}
                        >
                <DropShadow
                    style={{
                        shadowColor: "#000",
                        shadowOffset: {
                        width: 0,
                        height: 0,
                        },
                        shadowOpacity: 0.4,
                        shadowRadius: 5,
                    }}
                    >
                     <View style={styles.chackBoxTag}>
                        <Text> Add Tag </Text> 
                        <Text> food ,historical places,adventure places</Text> 
                     </View>
                 </DropShadow>
  
                    </TouchableOpacity>
          </View>
         )
         

    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#ffffff',
      flexDirection:'column',
      alignItems: 'center',
      paddingBottom:10
    },
    linearGradient: {
      alignItems: 'center',
      borderRadius: 5,
      height: "35%",
      width: "100%",
    },
 
    Box:{
        backgroundColor: '#ffffff',
        borderColor:'#000000',
        width: 375,
        height: 300,
        marginTop:"-45%"
    },
    imageBox:{
        backgroundColor: '#ffffff',
        flex: 1,
        flexDirection:'row',
        width: "100%",
        height: "30%",
        justifyContent: 'center',
        alignItems: 'center',
        marginTop:"5%"
    },
    selectedImageBox:{
        backgroundColor: '#ffffff',
        borderColor:'#000000',
        width: "100%",
        height: "30%",
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

    },
    selectedIconBox:{
        backgroundColor: '#ffffff',
        borderColor:'#000000',
        width: 120,
        height: "100%",
        flex: 1,
        flexDirection:'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        alignItems: "center",
        backgroundColor: "#ffffff",
        width: 120,
        height: "100%",
        padding: 10
      },
      chackBox:{
        backgroundColor: '#ffffff',
        borderColor:'#000000',
        width: 375,
        height: 50,
        marginTop:"5%",
        marginBottom:"5%"
    },
    buttonchack:{
        alignItems: "center",
        backgroundColor: "#ffffff",
        width: 120,
        height: 50,
        padding: 10
    },
    buttonchackTag:{
        alignItems: "center",
        backgroundColor: "#ffffff",
        width: 120,
        height: 50,
        marginBottom:20
    },
    chackBoxTag:{
        backgroundColor: '#ffffff',
        borderColor:'#000000',
        width: 375,
        height: 70,
        marginTop:"5%",
        marginBottom:"5%",
 
        flexDirection:'column',
    },
  })