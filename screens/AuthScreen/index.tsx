import React from "react";
import { View, StyleSheet, AsyncStorage, ActivityIndicator, StatusBar, Image, Text } from "react-native";
import { NavigationStackProp } from 'react-navigation-stack';
import { checkStep } from "../../Api/Repository";



type IPropsConnectScreen = {
    navigation: NavigationStackProp;
};

export class AuthLoadingScreen extends React.Component<IPropsConnectScreen, {}> {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        setTimeout(() => {
            this._bootstrapAsync()
        }, 3000)
    }

    _bootstrapAsync = async () => {
        const { navigation } = this.props
        const token = await AsyncStorage.getItem('login_token');
        if (token) {
            navigation.navigate("Main")
        } else {
            navigation.navigate("Landing")
        }
    };

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.logo_container}>
                    <Image
                        style={{ width: 80, height: 100 }}
                        source={require('./logo.png')}
                    />
                    <Text style={{ textAlign: 'center', color: 'white', fontSize: 20 }}>Hara Hotdeal</Text>
                </View>
                <ActivityIndicator size="large" color="#fff" />
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
        backgroundColor: "#232A79"
    },
    logo_container: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20
    }
});