import React from "react";
import { createStackNavigator } from "react-navigation";
import { IconIonicons, IconMaterialIcons, IconAntDesign } from '../components/TabBarIcon'

import { HomeScreen } from "../screens/HomeScreen";
import { SignInScreen } from "../screens/SignIn";
import { DetailsScreen } from "../screens/DetailScreen";

export const HomeStack = createStackNavigator({
    Home: HomeScreen,
    Details: DetailsScreen
});

HomeStack.navigationOptions = {
    tabBarLabel: "Trang chủ",
    tabBarIcon: ({ focused }) => {
        return <IconIonicons
            focused={focused}
            name="ios-information-circle"
        />
    }
}
export const InventoryStack = createStackNavigator({
    Home: HomeScreen,
    Details: DetailsScreen
})

InventoryStack.navigationOptions = {
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
    SignIn: SignInScreen
});