import { createBottomTabNavigator } from 'react-navigation-tabs';
import { HomeStack, UserStack, RootInventoryStack } from "./stack_navigation";

const tabNavigator = createBottomTabNavigator({
    RootInventoryStack,
    // HomeStack,
    // UserStack
});

export default tabNavigator;