import React from "react";
import { View, Image, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from "react-native";
import { NavigationStackProp } from 'react-navigation-stack';
import { IProductItem } from "../../screens/InventoryScreen";

type IProductItemProps = {
    navigation?: NavigationStackProp;
    data: IProductItem
};

export class ProductItem extends React.Component<IProductItemProps, {}> {

    render() {
        const { data } = this.props
        const getdate = new Date(data.last_updated)
        const date = getdate.getDate();
        const month = getdate.getMonth();
        const year = getdate.getFullYear()
        return (
            < View style={styles.container} >
                <View style={{ flex: 0.4 }}>
                    <Image source={{ uri: data.image.src }}
                        style={{ width: 150, height: 150 }} />
                </View>
                <View style={styles.content}>
                    <Text style={styles.title}>{data.product_name}</Text>
                    <Text style={styles.item}>Tồn kho: {data.quantity}</Text>
                    <Text style={styles.item}>Ngày nhập: {date}-{month}-{year}</Text>
                    <Text style={styles.item}>Chưa phát sinh giao dịch</Text>
                    <Text style={styles.item}>{data.price}</Text>
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonLabel}>Bật khuyến mãi</Text>
                    </TouchableOpacity>
                </View>
            </View >
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        marginVertical: 20
    },
    content: {
        marginLeft: 20,
        flex: 0.6,
    },
    title: {
        fontSize: 18,
        fontWeight: "bold"
    },
    item: {
        fontSize: 18,
        lineHeight: 25
    },
    button: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: "#162B97",
        borderRadius: 20
    },
    buttonLabel: {
        color: "#fff",
        textAlign: "center",
        fontSize: 16
    }
})