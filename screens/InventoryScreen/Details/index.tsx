import React from "react";
import { View, Text, Button, TouchableOpacity, AsyncStorage } from "react-native";
import { NavigationStackProp } from 'react-navigation-stack';
// import * as Component from "../../components";



type IInventoryScreenProps = {
    navigation: NavigationStackProp;
};

export class InventoryDetailsScreen extends React.Component<IInventoryScreenProps, {}> {
    _clearToken = async () => {
        await AsyncStorage.clear();
        this.props.navigation.navigate('Auth');
    };

    render() {
        return (
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                <Text>Ton kho</Text>
                
            </View>
        );
    }
}

