import React from "react";
import { View, Text, Button, TouchableOpacity, AsyncStorage, ActivityIndicator, StyleSheet, Alert } from "react-native";
import { NavigationScreenProps } from "react-navigation";
import axios from "axios";

import * as Component from "../../components";

interface IHomeScreenProps extends NavigationScreenProps {

}
interface IHomeScreenState {
    loading: boolean
}
export class HomeScreen extends React.Component<IHomeScreenProps, IHomeScreenState> {
    constructor(props) {
        super(props)
        this.state = {
            loading: false
        }
    }
    _clearToken = async () => {
        await AsyncStorage.clear();
        this.props.navigation.navigate('Auth');
    };
    componentDidMount() {
        this.setState({ loading: true }, () => {
            this.sendToken((value) => {
                this.setState({ loading: false }, () => {
                    // value === true
                    //     ? Alert.alert(
                    //         'Cảnh báo',
                    //         'Vui lòng kết nối lại',
                    //         [
                    //             { text: 'OK', onPress: () => this._clearToken() },
                    //         ]
                    //     )
                    //     : null
                })
            })
        })
    }

    private getListProductPromoting = () => {
        const url = `http://163.47.9.196:8000/api/`
    }
    private sendToken = async (callback: Function = () => { }) => {
        try {
            const url = "http://163.47.9.196:8000/api/updatecode"
            const token = await AsyncStorage.getItem("login_token")
            const code = await AsyncStorage.getItem("code")
            const shop = await AsyncStorage.getItem("shop")
            console.log(token, code, shop)

            let rsp = await axios.post(url, {
                code,
                shop_name: shop
            }, {
                headers: { "Authorization": token }
            })
            console.log(rsp.data)
        } catch (error) {
            console.log(error)
        }
        callback(true)
    }

    render() {
        const { loading } = this.state
        return loading == false
            ? <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }} >
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
                <TouchableOpacity>
                    <Button
                        color="red"
                        title="test"
                        onPress={() => this.sendToken()}
                    />
                </TouchableOpacity>
            </View >
            : <View style={[styles.container, styles.horizontal]}>
                <ActivityIndicator size="large" color="#00ff00" />
            </View>
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    },
    horizontal: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10
    }
})
