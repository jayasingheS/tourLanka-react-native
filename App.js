import React from 'react';
import {Provider as AuthProvider} from './src/context/BlogContext';
import {
    createDrawerNavigator,
    createAppContainer,
    createSwitchNavigator,
} from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import Account from './src/screens/AccountScreen';
import NewsFeed from './src/screens/NewsFeedScreen';
import ProfileGroup from './src/screens/ProfileGroupScreen';
import SearchScreen from './src/screens/SearchScreen';
import SignIn from './src/screens/SignInScreen';
import SignUp from './src/screens/SignUpScreen';
import AddEdite from './src/screens/addEditScreen';
import {setNavigation} from './src/navigationRef';
import ViroSample from './src/ArSpace/viroArNavigation/vironavigation';
import Ionicons from 'react-native-vector-icons/Ionicons';
const switchNavigator = createSwitchNavigator({
      loginFlow : createStackNavigator({
          SignInScreen : SignIn,
          SignUpScreen : SignUp,
          
      }),
      mainFlow :createBottomTabNavigator({
        NewsFeedScreen:createStackNavigator({
            NewsFeedScreenOne : NewsFeed,
            AddEditeScreen : AddEdite,
            
        }),
          AccountScreen : createStackNavigator({
            AccountScreenOne : Account,
            AddEditeScreen : AddEdite,
            
        }),
          ProfileGroupScreen:createStackNavigator({
            ProfileGroupScreenOne : ProfileGroup,
            AddEditeScreen : AddEdite,
            
        }),
          Search:createStackNavigator({
            SearchOne : SearchScreen,
            ScreenStreetViewAR : ViroSample,
            
        }),
  
      },
      {
        defaultNavigationOptions: ({navigation}) =>({
        tabBarIcon: ({focused, horizontal,tintColor }) => {
          const {routeName} = navigation.state
          let IconComponent = Ionicons
          let iconName
          if (routeName === 'NewsFeedScreen'){
              iconName = focused ? 'home-outline' : 'home-outline';
          }else if (routeName === 'AccountScreen'){
              iconName = focused ? 'person-outline' : 'person-outline'
          }else if (routeName === 'ProfileGroupScreen'){
            iconName = focused ? 'newspaper-outline' : 'newspaper-outline'
          }else if (routeName === 'Search'){
          iconName = focused ? 'search' : 'search'
           }
        
          return <IconComponent name = {iconName} size = {25} color = {tintColor}></IconComponent>
        }
        }),
        
        tabBarOptions:{
          activeTintColor: '#000000',
          activeBackgroundColor: '#ffffff',
          showLabel: false,
        
          keyboardHidesTabBar: false,
          tabStyle: {
              backgroundColor: '#7bc6cc'
          },
        
          labelStyle: {
             
              fontSize: 12,
          }
        }
        }),

});


const App = createAppContainer(switchNavigator);

export default  () =>{
    return<AuthProvider>
        <App ref ={(navigation) =>{setNavigation(navigation)}}/>
        </AuthProvider>
};

