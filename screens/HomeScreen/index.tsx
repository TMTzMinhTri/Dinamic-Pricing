import React from "react";
import { View, FlatList, Button, TouchableOpacity, AsyncStorage, ActivityIndicator, StyleSheet, Text, RefreshControl } from "react-native";
import { NavigationStackProp } from 'react-navigation-stack';


import axios from "axios";

// import * as Component from "../../components";
// import { IProductItem } from "../InventoryScreen";

type IInventoryScreenProps = {
    navigation: NavigationStackProp;
}
interface IHomeScreenState {
    loading: boolean,
    // ListProduct: IProductItem[]
    refreshing: boolean

}
export class HomeScreen extends React.Component<IInventoryScreenProps, IHomeScreenState> {
    constructor(props) {
        super(props)
        this.state = {
            loading: false,
            // ListProduct: [],
            refreshing: false

        }
    }
    static navigationOptions = ({ navigation, }) => {
        return {
            headerTitle: "HaraHotdeal"
        };
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
    componentWillUnmount() {
        console.log('aaa')
    }

    private getListProductPromoting = async () => {
        const token = await AsyncStorage.getItem("login_token")
        const url = `http://163.47.9.196:8000/api/getdata/promotingproducts`
        let rsp = await axios.get(url, {
            headers: { "Authorization": token }
        })
        this.setState({
            loading: false,
            refreshing: false
        })
    }
    // private sendToken = async (callback: Function = () => { }) => {
    //     try {
    //         const url = "http://163.47.9.196:8000/api/updatecode"
    //         const token = await AsyncStorage.getItem("login_token")
    //         const code = await AsyncStorage.getItem("code")
    //         const shop = await AsyncStorage.getItem("shop")
    //         console.log(token, code, shop)

    //         let rsp = await axios.post(url, {
    //             code,
    //             shop_name: shop
    //         }, {
    //             headers: { "Authorization": token }
    //         })
    //         console.log(rsp.data)
    //     } catch (error) {
    //         console.log(error)
    //     }
    //     callback(true)
    // }
    private handlePromotionStatus = (value) => {
        this.setState({ loading: value }, () => {
            this.getListProductPromoting()
        })
    }
    private onRefresh = () => {
        this.setState({ refreshing: true }, () => {
            this.getListProductPromoting()
        })
    }
    onTouchImage = (data) => {
        this.props.navigation.navigate("Details", {
            data
        })
    }
    render() {
        const { loading, refreshing } = this.state
        return (
            <View style={[styles.container, styles.horizontal]}>
                <ActivityIndicator size="large" color="#00ff00" />
                <Button title="reset" onPress={async () => await AsyncStorage.clear()} />

            </View>)
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
