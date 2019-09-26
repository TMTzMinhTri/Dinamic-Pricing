import { createBottomTabNavigator } from "react-navigation";
import { HomeStack, UserStack, RootInventoryStack } from "./stack_navigation";

const tabNavigator = createBottomTabNavigator({
    HomeStack,
    RootInventoryStack,
    UserStack
});

export default tabNavigator;