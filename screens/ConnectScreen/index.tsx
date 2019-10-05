import React from "react";
import { View, StyleSheet, KeyboardAvoidingView, AsyncStorage } from "react-native";
import { Input, Button } from 'react-native-elements';
import { NavigationStackProp } from 'react-navigation-stack';
import { AuthSession } from 'expo';
import axios from "axios";

interface ILoginScreenState {
    shopName: string
}
type IPropsConnectScreen = {
    navigation: NavigationStackProp;
};
export class ConnectScreen extends React.Component<IPropsConnectScreen, ILoginScreenState> {
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
    componentDidMount() {
        const { navigation } = this.props;
        (AsyncStorage.getItem("code").then(res => {
            if (res) {
                navigation.navigate("Main");
            }
        }))
    }
    _handlePressAsync = async () => {
        // const { shopName } = this.state
        const { navigation } = this.props;
        let redirectUrl = AuthSession.getRedirectUrl();
        let shopName = "harend"
        const apikey = "36d2d4d477b02bde8cd716af0c0272dd"
        let result: any = await AuthSession.startAsync({
            authUrl:
                `https://${shopName}.myharavan.com/admin/api/auth/?api_key=${apikey}&redirect_uri=${encodeURIComponent(redirectUrl)}`,
        });
        const { type } = result;
        console.log(result)

        if (type === 'success') {
            await AsyncStorage.setItem("code", result.params.code)
            await AsyncStorage.setItem("shop", result.params.shop)
            navigation.navigate("Main");

            // try {
            //     const url = "http://163.47.9.196:8000/api/updatecode "
            //     const token = await AsyncStorage.getItem("login_token")
            //     let rsp = await axios.post(url, {
            //         code: result.params.code,
            //         shop_name: result.params.shop
            //     }, {
            //         headers: { "Authorization": token }
            //     })
            //     console.log(rsp.data)
            // } catch (error) {

            // }


        }
    }

    private sendToken = async (result) => {
        try {
            const url = "http://163.47.9.196:8000/api/updatecode"
            const token = await AsyncStorage.getItem("login_token")
            let rsp = await axios.post(url, {
                code: result.params.code,
                shop_name: result.params.shop
            }, {
                headers: { "Authorization": token }
            })
            console.log(rsp.data)
        } catch (error) {

        }
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
