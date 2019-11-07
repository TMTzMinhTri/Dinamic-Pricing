import React from "react";
import { Text, ActivityIndicator, FlatList, RefreshControl, AsyncStorage } from "react-native";
import { NavigationStackProp } from 'react-navigation-stack';
import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";

import { RootState } from "../../Store";
import { RootAction } from "../../Modals";
import { getProduct } from "../../Store/actions/product.action";
import { bindActionCreators } from "redux";
import { IResponeListProduct } from "../../Modals/response";
import { Button } from "react-native-elements";


type IInventoryScreenProps = {
    navigation: NavigationStackProp;
} & IAction & IState
interface IInventoryScreenState {
    modalVisible: boolean,
    // listProduct: IProductItem[],
    loading: boolean,
    refreshing: boolean
}
// export interface IProductItem {
//     compare_at_price: number,
//     base_price: number,
//     id: number,
//     last_order: Date,
//     last_updated: Date,
//     price: number,
//     product_name: string,
//     product_title: string,
//     product_type: string,
//     quantity: number,
//     traded_from_now: string,
//     variant_title: string,
//     is_promoting: number,
//     promote_percent: number
//     image: {
//         src: string
//     }
// }
class Inventory extends React.Component<IInventoryScreenProps, IInventoryScreenState> {
    constructor(props) {
        super(props)
        this.state = {
            modalVisible: false,
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
        const { getProduct } = this.props
        this.setState({ loading: true }, () => {
            getProduct(() => {
                this.setState({ loading: false })
            })

        })
    }
    // private getData = async (callback: Function) => {
    //     const token = await AsyncStorage.getItem("login_token")
    //     const url = "http://163.47.9.196:8000/api/getdata/products"
    //     const rsp = await Axios.get(url, {
    //         headers: { "Authorization": token }
    //     })
    //     callback(rsp.data)
    // }
    // private handlePromotionStatus = (value) => {
    //     this.setState({ loading: value }, () => {
    //         this.getData((data) => {
    //             this.setState({ listProduct: data, loading: false })
    //         })
    //     })
    // }
    // __OnoffModal = (visible: boolean) => {
    //     this.setState({ modalVisible: visible })
    // }
    // private onRefresh = () => {
    //     this.setState({ refreshing: true }, () => {
    //         this.getData((data) => {
    //             this.setState({ listProduct: data, refreshing: false })
    //         })
    //     })
    // }
    onTouchImage = (data) => {
        this.props.navigation.navigate("Details", {
            data
        })
    }

    render() {
        const { loading, refreshing } = this.state
        const { listProduct } = this.props
        return loading === true
            ? <ActivityIndicator size="large" color="#00ff00" />
            // ? <Button title="reset" onPress={async () => await AsyncStorage.clear() } />
            : <FlatList
                data={listProduct}
                renderItem={({ item }) => < Text > {item.title}</ Text>}
                keyExtractor={item => item.id.toString()}
                initialNumToRender={5}
                onEndReachedThreshold={0.5}
            />
    }
}
interface IState {
    listProduct: IResponeListProduct[]
}
interface IAction {
    getProduct: (callback: Function) => void
}


const mapStateToProps = (state: RootState): IState => ({
    listProduct: state.productinfo.listProduct
})


const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, RootAction>): IAction => ({
    getProduct: bindActionCreators(getProduct, dispatch)
})

export const InventoryScreen = connect(mapStateToProps, mapDispatchToProps)(Inventory)