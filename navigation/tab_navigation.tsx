import { createBottomTabNavigator } from "react-navigation";
import { HomeStack, UserStack,InventoryStack } from "./stack_navigation";

const tabNavigator = createBottomTabNavigator({
    HomeStack,
    InventoryStack,
    UserStack
});

export default tabNavigator;