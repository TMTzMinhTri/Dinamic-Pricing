import React from "react";
import { View, Text, Button, AsyncStorage } from "react-native";
import { NavigationScreenProps } from "react-navigation";

interface IHomeScreenProps extends NavigationScreenProps {

}

export class SignInScreen extends React.Component<IHomeScreenProps, {}> {
    static navigationOptions = {
        title: 'Please sign in',
    };
    _signInAsync = async () => {
        await AsyncStorage.setItem('userToken', 'abc');
        this.props.navigation.navigate('Main');
    };
    render() {
        return (
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                <Text>SignIn</Text>
                <Button
                    title="SignIn"
                    onPress={() => this._signInAsync()}
                />
            </View>
        );
    }
}

