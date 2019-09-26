import React from "react";
import { View, Text, Button, TouchableOpacity, AsyncStorage } from "react-native";
import { NavigationScreenProps } from "react-navigation";

import * as Component from "../../components";

interface IHomeScreenProps extends NavigationScreenProps {

}

export class HomeScreen extends React.Component<IHomeScreenProps, {}> {
    _clearToken = async () => {
        await AsyncStorage.clear();
        this.props.navigation.navigate('Auth');
    };

    render() {
        return (
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                <Text>Home Screen</Text>
                <Component.IconAntDesign
                    focused={false}
                    name="appstore1"
                />
                <Button
                    title="Go to Details"
                    onPress={() => this.props.navigation.navigate('Details')}
                />
                <TouchableOpacity>
                    <Button
                        color="red"
                        title="Đăng xuất"
                        onPress={() => this._clearToken()}
                    />
                </TouchableOpacity>
            </View>
        );
    }
}

