import React,{useState,useReducer} from 'react';
import createDataContext from './createDataContext';
import tourApi from '../Api/tourDB';
import AsyncStorage from '@react-native-community/async-storage';
import {navigate} from '../navigationRef';
const reducer = (state, action)=> {
    switch (action.type) {
      case 'ADDPOST':
        return [...state, {state:action.payload}];
      case 'ERRORMASSAGE':
       return{...state,errorMassage:action.payload};
      case 'SIGNUP':
       return{errorMassage:"",token:action.payload}
      default:
        return state;
    }
  }

 
const addBolgPost= dispatch =>{
  return()=>{
    dispatch({type: 'ADDPOST'});
  };
 };
 const  signUp = dispatch =>{
  return async ({email,password})=>{
    try {
      const response = await tourApi.post("/signup",{email,password});
      await AsyncStorage.setItem('token',response.data.token);
      dispatch({type: 'SIGNUP',payload:response.data.token});
      navigate('mainFlow');
    } catch (error) {
      dispatch({type: 'ERRORMASSAGE',payload:"something went wrong please try again"});
    }

  };
 };
 const signIn= dispatch =>{
  return async ({email,password})=>{
    try {
      const response = await tourApi.post("/signin",{email,password});
      await AsyncStorage.setItem('token',response.data.token);
      dispatch({type: 'SIGNUP',payload:response.data.token});
      navigate('mainFlow');
    } catch (error) {
      dispatch({type: 'ERRORMASSAGE',payload:"something went wrong please try again"});
    }

  };
 };
 const currentPost= dispatch =>{
  return async ()=>{
    try {
      const response = await tourApi.get("/posts");
      dispatch({type: 'ADDPOST',payload:response.data});
    } catch (error) {
      dispatch({type: 'ERRORMASSAGE',payload:"something went wrong please try again"});
    }

  };
 };
 const signOut= dispatch =>{
  return()=>{

  };
 };

export const {Context,Provider} = createDataContext(reducer,{currentPost,addBolgPost,signUp,signIn,signOut},{token:null,errorMassage:""});