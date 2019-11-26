import React from "react";
import { View, FlatList, Button, TouchableOpacity, AsyncStorage, ActivityIndicator, StyleSheet, Text, RefreshControl } from "react-native";
import { NavigationStackProp } from 'react-navigation-stack';

import { connect } from "react-redux";
import { RootState } from "../../Store";
import { ThunkDispatch } from "redux-thunk";
import { RootAction } from "../../Modals";
import { IResponeListOrders } from "../../Modals/response";
import { bindActionCreators } from "redux";
import { getorder } from "../../Store/actions/product.action";


type IInventoryScreenProps = {
    navigation: NavigationStackProp;
} & IState & IAction
interface IHomeScreenState {
    loading: boolean,
    // ListProduct: IProductItem[]
    refreshing: boolean

}
class homeScreen extends React.Component<IInventoryScreenProps, IHomeScreenState> {
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
        this.props.getOrders()
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
interface IState {
    listOrders: IResponeListOrders[]
}
interface IAction {
    getOrders: VoidFunction
}


const mapStateToProps = (state: RootState): IState => ({
    listOrders: state.productinfo.listOrders
})


const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, RootAction>): IAction => ({
    getOrders: bindActionCreators(getorder, dispatch)
})
export const HomeScreen = connect(mapStateToProps, mapDispatchToProps)(homeScreen)

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
