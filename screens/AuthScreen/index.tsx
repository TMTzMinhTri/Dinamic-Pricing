import React from "react";
import { View, StyleSheet, AsyncStorage, ActivityIndicator, StatusBar } from "react-native";
import { NavigationStackProp } from 'react-navigation-stack';



type IPropsConnectScreen = {
    navigation: NavigationStackProp;
};

export class AuthLoadingScreen extends React.Component<IPropsConnectScreen, {}> {
    constructor(props) {
        super(props)
        this._bootstrapAsync()
    }

    _bootstrapAsync = async () => {
        const userToken = await AsyncStorage.getItem('login_token');
        this.props.navigation.navigate(userToken ? 'Home' : 'Register');
    };

    render() {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" />
                <StatusBar barStyle="light-content" />
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});