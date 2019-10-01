import React from "react";
import { View, StyleSheet, KeyboardAvoidingView, AsyncStorage } from "react-native";
import { NavigationScreenProps } from "react-navigation";
import { Input, Button } from 'react-native-elements';
import * as WebBrowser from 'expo-web-browser';
import { AuthSession, Linking, Constants } from 'expo';
// import * as AppAuth from 'expo-app-auth';
interface ILoginScreenProps extends NavigationScreenProps {

}
interface ILoginScreenState {
    shopName: string
}

export class ConnectScreen extends React.Component<ILoginScreenProps, ILoginScreenState> {
    constructor(props) {
        super(props)
        this.state = {
            shopName: ""
        }
    }
    static navigationOptions = ({ navigation, }) => {
        return {
            headerTitle: "Kết nối"
        };
    }

    onSubmit = async () => {
        const { shopName } = this.state
        const apikey = "3fc24cce86994cac510e117c927bbda4"
        const url = `https://${shopName}.myharavan.com/admin/api/auth/?api_key=${apikey}`
        let result = await WebBrowser.openBrowserAsync(url);
        console.log(result)
    }

    _handlePressAsync = async () => {
        const { shopName } = this.state
        const { navigation } = this.props;
        let redirectUrl = AuthSession.getRedirectUrl();
        console.log("url:", redirectUrl)
        const apikey = "3fc24cce86994cac510e117c927bbda4"
        let result = await AuthSession.startAsync({
            authUrl:
                `https://${shopName}.myharavan.com/admin/api/auth/?api_key=${apikey}&redirect_uri=${encodeURIComponent(redirectUrl)}`,
        });
        console.log("url:", result)


        const { type } = result;
        // if (type === 'success') {
        //     // Just simple way to store the token in this examples
        //     await AsyncStorage.setItem('userToken', JSON.stringify(result));
        //     navigation.navigate("Main");
    }


    render() {
        return (
            <View style={styles.container}>
                <KeyboardAvoidingView
                    enabled
                    behavior="padding"
                >
                    <Input
                        onChange={(value) => this.setState({ shopName: value.nativeEvent.text })}
                        placeholder='Shop name'
                    />
                </KeyboardAvoidingView>
                <Button
                    title="Xác nhận"
                    onPress={this._handlePressAsync}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        paddingHorizontal: 10,
    },
});