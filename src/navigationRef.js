import {NavigationActions} from 'react-navigation';

let navigator;

export const setNavigation=(Nav)=>{
    navigator = Nav 
};

export const navigate =(routeName,params)=>{
    navigator.dispatch(
        NavigationActions.navigate({
            routeName,
            params
        })
    )
}