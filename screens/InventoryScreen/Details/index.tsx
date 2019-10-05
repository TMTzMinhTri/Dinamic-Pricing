import React from "react";
import { View, Text, Button, TouchableOpacity, AsyncStorage, Image } from "react-native";
import { NavigationStackProp } from 'react-navigation-stack';
// import * as Component from "../../components";



type IInventoryScreenProps = {
    navigation: NavigationStackProp;
};

export class InventoryDetailsScreen extends React.Component<IInventoryScreenProps, {}> {
    _clearToken = async () => {
        await AsyncStorage.clear();
        this.props.navigation.navigate('Auth');
    };
    static navigationOptions = ({ navigation, }) => {
        return {
            headerTitle: "Chi tiết sản phẩm"
        };
    }

    render() {
        const { navigation } = this.props, { state } = navigation, { params } = state, { data } = params
        console.log(data)
        return (
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                <View style={{ flex: 0.3, marginTop: 50 }}>
                    <Image source={{ uri: data.image.src }} style={{ width: 200, height: 200 }} resizeMode="center" />
                </View>
                <View style={{ flex: 0.7, justifyContent: "center"}}>
                    <Text style={{ fontWeight: "bold", fontSize: 18 }}>{data.product_title}</Text>
                    <Text>{data.product_type}</Text>
                    <Text>{data.variant_title}</Text>
                    <Text>Số Lượng: {data.quantity}</Text>
                    <Text>Giá: {data.price} VND</Text>
                    <Text>Ngày giao dịch gần nhất: {data.traded_from_now !== "null" ? data.traded_from_now : 0} ngày</Text>
                </View>
            </View>
        );
    }
}

