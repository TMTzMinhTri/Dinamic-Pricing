import React from "react";
import { View, Text, Button, TouchableOpacity, AsyncStorage, Alert, ScrollView, ActivityIndicator, FlatList, RefreshControl } from "react-native";
import { NavigationStackProp } from 'react-navigation-stack';
import * as Component from "../../components";
import Axios from "axios";



type IInventoryScreenProps = {
    navigation: NavigationStackProp;
};
interface IInventoryScreenState {
    modalVisible: boolean,
    listProduct: IProductItem[],
    loading: boolean,
    refreshing: boolean
}
export interface IProductItem {
    compare_at_price: number,
    base_price: number,
    id: number,
    last_order: Date,
    last_updated: Date,
    price: number,
    product_name: string,
    product_title: string,
    product_type: string,
    quantity: number,
    traded_from_now: string,
    variant_title: string,
    is_promoting: number,
    promote_percent: number
    image: {
        src: string
    }
}
export class InventoryScreen extends React.Component<IInventoryScreenProps, IInventoryScreenState> {
    constructor(props) {
        super(props)
        this.state = {
            modalVisible: false,
            listProduct: [],
            loading: false,
            refreshing: false
        }
    }
    date = 14
    static navigationOptions = ({ navigation, }) => {
        return {
            headerTitle: "HaraHotdeal"
        };
    }

    componentDidMount() {
        this.setState({ loading: true }, () => {
            this.sendToken(() => {
                this.getData((data) => {
                    this.setState({ listProduct: data, loading: false })
                })
            })

        })
    }
    private sendToken = async (callback) => {
        try {
            const url = "http://163.47.9.196:8000/api/updatecode"
            const token = await AsyncStorage.getItem("login_token")
            const code = await AsyncStorage.getItem("code")
            const shop = await AsyncStorage.getItem("shop")
            let rsp = await Axios.post(url, {
                code,
                shop_name: shop
            }, {
                headers: { "Authorization": token }
            })
            console.log(rsp.data)
        } catch (error) {
            console.log(error)
        }
        callback()
    }
    private getData = async (callback: Function) => {
        const token = await AsyncStorage.getItem("login_token")
        const url = "http://163.47.9.196:8000/api/getdata/products"
        const rsp = await Axios.get(url, {
            headers: { "Authorization": token }
        })
        callback(rsp.data)
    }
    private handlePromotionStatus = (value) => {
        this.setState({ loading: value }, () => {
            this.getData((data) => {
                this.setState({ listProduct: data, loading: false })
            })
        })
    }
    __OnoffModal = (visible: boolean) => {
        this.setState({ modalVisible: visible })
    }
    private onRefresh = () => {
        this.setState({ refreshing: true }, () => {
            this.getData((data) => {
                this.setState({ listProduct: data, refreshing: false })
            })
        })
    }
    onTouchImage = (data) => {
        this.props.navigation.navigate("Details", {
            data
        })
    }

    render() {
        console.log(this.state)
        const { listProduct, loading, refreshing } = this.state
        return (<View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>

            {/* {loading === false
                ? < View style={{ flexDirection: "row", alignItems: "stretch", padding: 10 }}>
                    <FlatList
                        data={listProduct}
                        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={this.onRefresh} />}
                        renderItem={({ item }) => <Component.ProductItem
                            data={item}
                            onTouchImage={this.onTouchImage}
                            onChange={this.handlePromotionStatus}
                            screen="inventory" />}
                        keyExtractor={({ id }) => id.toString()} />
                </View> */}
                <ActivityIndicator size="large" color="#00ff00" />
            }
        </View>

        );
    }
}
