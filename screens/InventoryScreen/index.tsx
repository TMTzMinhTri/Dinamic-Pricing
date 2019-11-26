import React from "react";
import { Text, ActivityIndicator, FlatList, RefreshControl, AsyncStorage, View, Image } from "react-native";
import { NavigationStackProp } from 'react-navigation-stack';
import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";

import { RootState } from "../../Store";
import { RootAction } from "../../Modals";
import { getProduct } from "../../Store/actions/product.action";
import { } from "../../Store/actions/auth.action";
import { bindActionCreators } from "redux";
import { IResponeListProduct } from "../../Modals/response";
import { checkStep, updateStep } from "../../Api/Repository";
import { ProductItem } from "./ProductItem";

type IInventoryScreenProps = {
    navigation: NavigationStackProp;
} & IAction & IState
interface IInventoryScreenState {
    modalVisible: boolean,
    // listProduct: IProductItem[],
    loading: boolean,
    refreshing: boolean
}

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
                contentContainerStyle={{ padding: 20 }}
                renderItem={({ item }) => <ProductItem product={item} />}
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