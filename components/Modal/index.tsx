import React from "react";
import { View, Text, Button, TouchableOpacity, AsyncStorage } from "react-native";
import { NavigationStackProp } from 'react-navigation-stack';


type IModalProps = {
    navigation: NavigationStackProp;
};

export class Modal extends React.Component<IModalProps> {
    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: 30 }}>This is a modal!</Text>
                <Button
                    onPress={() => this.props.navigation.goBack()}
                    title="Dismiss"
                />
            </View>
        );
    }
}