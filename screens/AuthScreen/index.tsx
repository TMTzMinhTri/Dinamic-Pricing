import React from "react";
import { View, StyleSheet, AsyncStorage, ActivityIndicator, StatusBar } from "react-native";
import { NavigationScreenProps } from "react-navigation";


interface IHomeScreenProps extends NavigationScreenProps {

}

export class AuthLoadingScreen extends React.Component<IHomeScreenProps, {}> {
    constructor(props) {
        super(props)
        this._bootstrapAsync()
    }

    _bootstrapAsync = async () => {
        const userToken = await AsyncStorage.getItem('userToken');
        this.props.navigation.navigate(userToken ? 'Main' : 'Auth');
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