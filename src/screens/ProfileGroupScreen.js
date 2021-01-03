import React from 'react';
import {View,Text,StyleSheet,FlatList,StatusBar,TouchableOpacity,SafeAreaView, Image, ScrollView }from 'react-native';
import {Header} from '../components/common/Header';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/Ionicons';
import Ionicons from 'react-native-vector-icons/Ionicons';

const ProfileGroup = ({navigation}) =>{
    return <>
       <View style ={styles.mainCantiner}>  
        <LinearGradient colors={['#be93c5',  '#7bc6cc']}  style={styles.linearGradient}>
            <Header headerText = "Profile" navigationProp = {navigation}></Header>
            <StatusBar translucent={true} backgroundColor={'transparent'} />
        </LinearGradient>
       </View>
    </>
};
ProfileGroup.navigationOptions = () =>{
    return{
      headerShown: false,
    };
  };

const styles = StyleSheet.create ({
    mainCantiner:{
        flex:1,
        flexDirection:'column',
        justifyContent:'center',
        
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
});

export default ProfileGroup;