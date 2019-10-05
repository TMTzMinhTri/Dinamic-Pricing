import React from "react";
import { View, FlatList, Button, TouchableOpacity, AsyncStorage, ActivityIndicator, StyleSheet, Alert } from "react-native";
import { NavigationScreenProps } from "react-navigation";
import axios from "axios";

import * as Component from "../../components";
import { IProductItem } from "../InventoryScreen";

interface IHomeScreenProps extends NavigationScreenProps {

}
interface IHomeScreenState {
    loading: boolean,
    ListProduct: IProductItem[]
}
export class HomeScreen extends React.Component<IHomeScreenProps, IHomeScreenState> {
    constructor(props) {
        super(props)
        this.state = {
            loading: false,
            ListProduct: []
        }
    }
    _clearToken = async () => {
        await AsyncStorage.clear();
        this.props.navigation.navigate('Auth');
    };
    componentDidMount() {
        this.setState({ loading: true }, () => {
            this.getListProductPromoting()
        })
    }

    private getListProductPromoting = async () => {
        const token = await AsyncStorage.getItem("login_token")
        const url = `http://163.47.9.196:8000/api/getdata/promotingproducts`
        let rsp = await axios.get(url, {
            headers: { "Authorization": token }
        })
        this.setState({
            ListProduct: rsp.data,
            loading: false
        })
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
        const { loading, ListProduct } = this.state
        return loading === false
            ? <View style={{ flex: 1 }} >
                <FlatList
                    data={ListProduct}
                    renderItem={({ item }) => <Component.ProductItem data={item} />}
                    keyExtractor={({ id }) => `product_promoting_${id}`}
                />
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
