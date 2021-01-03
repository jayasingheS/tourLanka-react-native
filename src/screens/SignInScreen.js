import React ,{useState,useContext}from 'react';
import {StyleSheet,Image,View,StatusBar }from 'react-native';
import {Input,Text,Button}from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Context} from '../context/BlogContext';
import LinearGradient from 'react-native-linear-gradient'; 
const SignIn = ({navigation}) =>{
  const{state,signIn} = useContext(Context);
 const [email, setEmail] = useState('');
 const [password,setPassword] = useState('');
    return <>
    <View style={Styles.conteinerMain}>
    <LinearGradient colors={['#be93c5',  '#7bc6cc']}  style={Styles.linearGradient}>
                <StatusBar translucent={true} backgroundColor={'transparent'} />
    
 
    <Image source={require('../images/sjsj.png')}
            style={{
              aspectRatio: 0.4,
              resizeMode: 'contain',
              flexDirection: 'row',
              justifyContent:'center',
              marginTop:-100,
              marginBottom:-40  }}/>

        <Input
              placeholder='Email'
              inputContainerStyle={{ 
                borderColor: '#000000',
                borderBottomWidth: 2,
                margin:5
              }} 
              leftIcon={
            <Icon
              name='envelope'
              size={24}
              color='#000000'
            />
            
            }

            Value = {email}
            onChangeText = {(newEmaill)=>{setEmail(newEmaill);}}
            autoCapitalize='none'
            autoCorrect ={false}
            />
        <Input
              placeholder='Password'
              inputContainerStyle={{ 
                borderColor: '#000000',
                borderBottomWidth: 2,
                margin:5
              }} 
              leftIcon={
            <Icon
              name='key'
              size={24}
              color='#000000'
            />
            }
            Value = {password}
            onChangeText = {(newPassword)=>{setPassword(newPassword);}}
            autoCapitalize='none'
            autoCorrect ={false}
            secureTextEntry = {true}
            />
            
        <Button title ="Sign Up"
            onPress ={()=>navigation.navigate('SignUpScreen')}
            containerStyle={{
             width:'95%',
             margin :5,
             borderRadius:50,

            }} 
            buttonStyle={{
              backgroundColor : '#000000'
            }}/>
        <Button title ="Sign In"
           // onPress ={()=>signIn({email,password})}

            onPress ={()=>navigation.navigate('mainFlow')}
            
            containerStyle={{
              width:'95%',
              margin :5,
              borderRadius:50
             }}
             buttonStyle={{
              backgroundColor : '#000000'
            }}/>
         <Text style = {Styles.link} >Already have an account? Sign in instead</Text>
         {state.errorMassage? <Text style={Styles.errorMassage} >{state.errorMassage}</Text>:null}      
         </LinearGradient>
    </View>    
    
     </>
};

SignIn.navigationOptions = () =>{
  return{
    headerShown: false,
  };
};

const Styles = StyleSheet.create ({
   conteinerMain: {
    flex: 1,
 
    flexDirection: 'column',
    alignItems: 'center',
    alignSelf:'stretch',
    backgroundColor:'#ffffff'
    
  },
  link:{
    textAlign:'center',
    color:'#000000'
  },
  errorMassage:{
    fontSize:15,
    color: 'red'
  },
  linearGradient: {
    paddingTop:"30%",
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    borderRadius: 5,
    height: "100%",
    width: "100%",
  },

});

export default SignIn;