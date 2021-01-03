import React ,{useState,useContext}from 'react';
import {StyleSheet,Image,View,StatusBar }from 'react-native';
import {Input,Text,Button}from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/Ionicons';
import {Context} from '../context/BlogContext';
import { Avatar, Accessory } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
const SignIn = ({navigation}) =>{
  const{state,signUp} = useContext(Context);
  const [email, setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [reEnterPassword,setReEnterPassword] = useState('');
    return<View style={Styles.conteinerMain}>
            <LinearGradient colors={['#be93c5',  '#7bc6cc']}  style={Styles.linearGradient}>
                <StatusBar translucent={true} backgroundColor={'transparent'} />

            <Avatar
              size="xlarge"
              rounded
              containerStyle={{Color: '#000000'}}
          source={{
            uri:
              'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
          }}
          >
          <Accessory
          overlayContainerStyle={{backgroundColor: '#000000'}}
          />
        </Avatar>
        <Input
              placeholder='Name'
              inputContainerStyle={{ 
                borderColor: '#000000',
                borderBottomWidth: 2,
                margin:5,
                color:'#000000'
              }} 
              leftIcon={
            <Icon2
              name='person'
              size={24}
              color='#000000'
            />
            }
            value={email}
            onChangeText={setEmail}
            />
        <Input
              placeholder='Email'
              inputContainerStyle={{ 
                borderColor: '#000000',
                borderBottomWidth: 2,
                margin:5,
                color:'#000000'
              }} 
              leftIcon={
            <Icon
              name='envelope'
              size={24}
              color='#000000'
            />
            }
            value={email}
            onChangeText={setEmail}
            />
        <Input
              placeholder='Password'
              inputContainerStyle={{ 
                borderColor: '#000000',
                borderBottomWidth: 2,
                margin:5,
                color:'#000000'
              }} 
              leftIcon={
            <Icon
              name='key'
              size={24}
              color='#000000'
            />
          
            }
            value={password}
            onChangeText={setPassword}
            />
        <Input
            placeholder='Reenter Password'
            inputContainerStyle={{ 
            borderColor: '#000000',
            borderBottomWidth: 2,
            margin:5,
            color:'#000000'
            }} 
            leftIcon={
          <Icon
            name='key'
            size={24}
            color='#000000'
          />
            }
            value={reEnterPassword}
            onChangeText={setReEnterPassword}
            />   
        <Button title ="Sign Up"
           onPress ={()=>signUp({email,password})}
            containerStyle={{
             width:'95%',
             margin :5,
             borderRadius:50,
             resizeMode: 'contain',
             
            }} 
            buttonStyle={{
              backgroundColor : '#000000'
            }}/>
     {state.errorMassage? <Text style={Styles.errorMassage} >{state.errorMassage}</Text>:null}    
     </LinearGradient >
        
    </View> 

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
    backgroundColor:'#ffffff',
   
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