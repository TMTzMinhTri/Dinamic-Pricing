import React from "react";
import { View, Text, Button, TouchableOpacity, AsyncStorage, Alert, ScrollView } from "react-native";
import { NavigationStackProp } from 'react-navigation-stack';
import * as Component from "../../components";



type IInventoryScreenProps = {
    navigation: NavigationStackProp;
};
interface IInventoryScreenState {
    modalVisible: boolean
}

const listdata = [
    { name: "tri" },
    { name: "tri" },
    { name: "tri" },
    { name: "tri" },
]
export class InventoryScreen extends React.Component<IInventoryScreenProps, IInventoryScreenState> {
    constructor(props) {
        super(props)
        this.state = {
            modalVisible: false,
        }
    }
    date = 14
    static navigationOptions = ({ navigation, }) => {
        return {
            headerTitle: "HaraHotdeal"
        };
    }

    __OnoffModal = (visible: boolean) => {
        this.setState({ modalVisible: visible })
    }
    render() {
        return (
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                <View style={{ flexDirection: "row", alignItems: "stretch", padding: 10 }}>
                    <ScrollView>
                        <Component.ProductItem />
                        <Component.ProductItem />
                        <Component.ProductItem />
                        <Component.ProductItem />
                        <Component.ProductItem />
                        <Component.ProductItem />
                    </ScrollView>
                </View>
            </View>
        );
    }
}

