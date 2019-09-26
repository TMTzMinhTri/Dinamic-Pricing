import React from "react";
import { View, Image, Text, TouchableOpacity, StyleSheet } from "react-native";
import { NavigationStackProp } from 'react-navigation-stack';


type IProductItemProps = {
    navigation?: NavigationStackProp;
};

export class ProductItem extends React.Component<IProductItemProps, {}> {
    render() {
        return (
            <View style={styles.container}>
                <Image source={{ uri: 'https://facebook.github.io/react/logo-og.png' }}
                    style={{ width: 168, height: 168 }} />
                <View style={styles.content}>
                    <Text style={styles.title}>Tên sản phẩm</Text>
                    <Text style={styles.item}>Tồn kho: 1000</Text>
                    <Text style={styles.item}>Ngày nhập: 12-9-2018</Text>
                    <Text style={styles.item}>Chưa phát sinh giao dịch</Text>
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonLabel}>Bật khuyến mãi</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginVertical: 20
    },
    content: {
        padding: 10
    },
    title: {
        fontSize: 24,
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
        borderRadius:20
    },
    buttonLabel: {
        color: "#fff",
        textAlign: "center",
        fontSize: 16
    }
})