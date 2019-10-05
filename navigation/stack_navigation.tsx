import React from "react";
import { createStackNavigator } from "react-navigation";
import { IconIonicons, IconMaterialIcons, IconAntDesign } from '../components/TabBarIcon'
import * as Components from "../components";

import { HomeScreen } from "../screens/HomeScreen";

import { LandingScreen } from "../screens/LandingPage";
import { RegisterScreen } from "../screens/LandingPage/RegisterScreen"
import { LoginScreen } from "../screens/LandingPage/LoginScreen"

import { DetailsScreen } from "../screens/DetailScreen";
import { ConnectScreen } from "../screens/ConnectScreen";

import { InventoryScreen } from "../screens/InventoryScreen";
import { InventoryDetailsScreen } from "../screens/InventoryScreen/Details";

export const HomeStack = createStackNavigator({
    Home: HomeScreen,
    Details: DetailsScreen
}, {
    initialRouteName: 'Home',
    defaultNavigationOptions: {
        headerTintColor: '#162B97',
        headerTitleStyle: {
            fontWeight: 'bold',
        },
    },
});

HomeStack.navigationOptions = {
    tabBarLabel: "Đang khuyến mãi",
    tabBarIcon: ({ focused }) => {
        return <IconIonicons
            focused={focused}
            name="ios-information-circle"
        />
    }
}


const InventoryStack = createStackNavigator(
    {
        Home: {
            screen: InventoryScreen,
        },
        Details: {
            screen: InventoryDetailsScreen,
        },
    },
    {
        initialRouteName: 'Home',
        defaultNavigationOptions: {
            headerTintColor: '#162B97',
            headerTitleStyle: {
                fontWeight: 'bold',
            },
        },
    }
);
export const RootInventoryStack = createStackNavigator({
    Home: InventoryStack,
    Modal: Components.Modal
}, {
    mode: 'modal',
    headerMode: 'none',
})

RootInventoryStack.navigationOptions = {
    tabBarLabel: "Tồn kho",
    tabBarIcon: ({ focused }) => {
        return <IconMaterialIcons
            focused={focused}
            name="store"
        />
    }
}


export const UserStack = createStackNavigator({
    Home: HomeScreen,
    Details: DetailsScreen
})

UserStack.navigationOptions = {
    tabBarLabel: "Tài khoản",
    tabBarIcon: ({ focused }) => {
        return <IconAntDesign
            focused={focused}
            name="user"
        />
    }
}



export const AuthStack = createStackNavigator({
    Landing: LandingScreen,
    Connect: ConnectScreen,
    Login: LoginScreen,
    Register: RegisterScreen
});