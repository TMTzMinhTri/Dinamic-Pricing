
import { createAppContainer, createSwitchNavigator } from "react-navigation";

import tabNavigator from "./tab_navigation";
import { AuthLoadingScreen } from "../screens/AuthScreen";
import { AuthStack } from "./stack_navigation";

export default createAppContainer(
    createSwitchNavigator({
        AuthLoading: AuthLoadingScreen,
        Main: tabNavigator,
        Auth: AuthStack,
    }, {
        initialRouteName: 'AuthLoading',
    })
);