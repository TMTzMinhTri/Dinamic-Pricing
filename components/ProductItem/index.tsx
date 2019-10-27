import React from "react";
import { View, Image, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from "react-native";
import { NavigationStackProp } from 'react-navigation-stack';
import { IProductItem } from "../../screens/InventoryScreen";
import { Modals } from "../../components/Popup";

type IProductItemProps = {
    navigation?: NavigationStackProp;
    data: IProductItem
    onChange: Function,
    screen: "inventory" | "home",
    onTouchImage: Function
};

interface IStateProductItem {
    modalVisible: boolean,
}
export class ProductItem extends React.Component<IProductItemProps, IStateProductItem> {
    constructor(props) {
        super(props)
        this.state = {
            modalVisible: false,
        }
    }
    __OnoffModal = (visible: boolean) => {
        this.setState({ modalVisible: visible })
    }

    render() {
        const { modalVisible } = this.state
        const { data, onChange, screen, onTouchImage } = this.props
        const getdate = new Date(data.last_updated)
        const date = getdate.getDate();
        const month = getdate.getMonth();
        const year = getdate.getFullYear()
        return (
            < View style={styles.container} >
                <View style={{ flex: 0.4 }} onTouchStart={() => onTouchImage(data)}>
                    <Image source={{ uri: data.image.src }}
                        style={{ width: 150, height: 150 }} />
                </View>
                <View style={styles.content} >
                    <Text style={styles.title}>{data.product_title}</Text>
                    <Text style={styles.item}>Tồn kho: {data.quantity}</Text>
                    <Text style={styles.item}>Ngày nhập: {date}-{month}-{year}</Text>
                    <Text style={styles.item}>Giá hiện tại: {data.price}</Text>
                    {data.is_promoting === 0
                        ? <View style={{ alignItems: "center" }}>
                            <TouchableOpacity style={styles.button} onPress={() => this.__OnoffModal(true)}>
                                <Text style={styles.buttonLabel}>Bật khuyến mãi</Text>
                            </TouchableOpacity>
                        </View>
                        : screen === "home"
                            ? <View style={{ alignItems: "center" }}>
                                <TouchableOpacity style={styles.button} onPress={() => this.__OnoffModal(true)}>
                                    <Text style={styles.buttonLabel}>Đã bật Khuyến mãi</Text>
                                </TouchableOpacity>
                            </View>
                            : <View style={{ alignItems: "center" }}>
                                <View style={styles.butondisable}>
                                    <Text style={{ color: "#fff" }}>Đã bật khuyến mãi</Text>
                                </View>
                            </View>}
                </View>
                <Modals modalVisible={modalVisible} OnofModal={this.__OnoffModal} item={data} onchange={onChange} />
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
        marginLeft: 30,
        flex: 0.6,

    },
    title: {
        fontSize: 16,
        fontWeight: "bold"
    },
    item: {
        lineHeight: 20
    },
    button: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: "rgb(0, 132, 255);",
        borderRadius: 5,
        width: "90%"

    },
    buttonLabel: {
        color: "#fff",
        textAlign: "center",
    },
    butondisable: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: "rgb(127,	162,	244	)",
        borderRadius: 5,
        width: "90%"
    }
})
