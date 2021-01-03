import React,{useContext,useEffect} from 'react';
import {View,Text,StyleSheet,FlatList,StatusBar,TouchableOpacity,ScrollView}from 'react-native';
import TourPost  from '../components/tourPost';
import {Context} from '../context/BlogContext';
import {Header} from '../components/common/Header';
import LinearGradient from 'react-native-linear-gradient';
const NewsFeed = ({navigation}) =>{
  const {currentPost,post} = useContext(Context); 
  useEffect(() => {
    ()=>currentPost();
    console.log(post)
  },[]);
    return(
        <>
 <View style ={Styles.mainCantiner}>  
        <LinearGradient colors={['#be93c5',  '#7bc6cc']}  style={Styles.linearGradient}>
            <Header headerText = "Tour Lanka" navigationProp = {navigation}></Header>
            <StatusBar translucent={true} backgroundColor={'transparent'} />
        
        <ScrollView style={Styles.scrollView}>
        
        <TourPost
          PostValueName = "jayasinghe"
          PostValueLocation = "baddegama"
          PostValuedescription = "It's very common"
          PostValueIcones = "20"
          PostValueComments = "1"
          image="https://www.atlasandboots.com/wp-content/uploads/2017/03/Sigiriya-Rock-Fortress-1.jpg"/>    
         <TourPost
          PostValueName = "shehan"
          PostValueLocation = "Lanka"
          PostValuedescription = "It's very common to define navigationOptions on a screen"
          PostValueIcones = "2"
          PostValueComments = "10"
          image="https://img.traveltriangle.com/blog/wp-content/uploads/2019/08/shutterstock_599364767.jpg"/>
          <TourPost
          PostValueName = "ravidhu"
          PostValueLocation = "ratnapura"
          PostValuedescription = "It's very common to define navigationOptions on a screen"
          PostValueIcones = "2"
          PostValueComments = "20"
          image="https://miro.medium.com/max/2560/1*lLVGWVi1V9c3yiFR2fJJIg.jpeg"/>
    
        </ScrollView>
        </LinearGradient >

        </View>
        </>
    );
};
NewsFeed.navigationOptions = () =>{
    return{
      headerShown: false,
    };
  };


const Styles = StyleSheet.create ({
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
      scrollView: {
        marginTop:"-1%",
      },

});

export default NewsFeed;