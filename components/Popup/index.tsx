import React from "react";
import { View, Text, Modal, StyleSheet, AsyncStorage, TouchableHighlight, Image, ActivityIndicator } from "react-native";
import { NavigationStackProp } from 'react-navigation-stack';
import { IProductItem } from "../../screens/InventoryScreen";
import axios from "axios";

type IModalProps = {
    navigation?: NavigationStackProp;
    modalVisible: boolean,
    OnofModal: Function,
    item: IProductItem,
    onchange: Function
};
interface IState {
    processing: boolean
}

export class Modals extends React.Component<IModalProps, IState> {
    constructor(props) {
        super(props)
        this.state = {
            processing: false
        }
    }

    private Submit = () => {
        const { OnofModal, onchange } = this.props
        this.setState({ processing: true }, async () => {
            const { item } = this.props, { id } = item, percent = 20
            const url = `http://163.47.9.196:8000/api/data/variants/${id}/${percent}`
            const token = await AsyncStorage.getItem("login_token")
            let rsp = await axios.post(url, null, {
                headers: { "Authorization": token }
            }), { status } = rsp
            if (status === 200) {
                this.setState({ processing: false }, () => {
                    OnofModal(false)
                    onchange(true)

                })
            }
        })
    }

    private OffPromotion = (id: number) => {
        const { OnofModal, onchange } = this.props
        this.setState({ processing: true }, async () => {
            const url = `http://163.47.9.196:8000/api/data/variants/offpromote/${id}`
            const token = await AsyncStorage.getItem("login_token")
            let rsp = await axios.post(url, null, {
                headers: { "Authorization": token }
            }), { status } = rsp
            console.log(rsp)
            if (status === 200) {
                this.setState({ processing: false }, () => {
                    OnofModal(false)
                    onchange(true)
                })
            }
        })
    }

    render() {
        const { item } = this.props
        const { processing } = this.state
        return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={this.props.modalVisible}
                presentationStyle="overFullScreen">
                <View style={style.container} >
                    <View style={style.body}>
                        <View style={{ flex: 0.1, borderBottomWidth: 1, borderBottomColor: "#555", alignItems: "center" }}>
                            <Text style={{ fontSize: 20, fontWeight: "bold" }}>Chương trình khuyến mãi</Text>
                        </View>
                        <View style={{ flex: 0.6, justifyContent: "center" }}>
                            <Text>{item.product_title}</Text>
                            <Text>Khuyễn mãi {item.promote_percent} %</Text>
                            <Image source={{ uri: item.image.src }} />
                            <Text>{item.price}</Text>
                            <View >
                                <Text>Thông tin chi tiết</Text>
                                <Text>Giá gốc: {item.base_price}</Text>
                                <Text>Giá bán sau khi khuyến mai: {item.price}</Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: "row", flex: 0.2, alignItems: "center", justifyContent:"space-between" }}>
                            <TouchableHighlight
                                style={{ backgroundColor: "#aaa", paddingHorizontal: 20, paddingVertical: 10, borderRadius: 5 }}
                                onPress={() => this.props.OnofModal(false)}>
                                <Text>Huỷ</Text>
                            </TouchableHighlight>
                            {item.is_promoting === 0
                                ? <TouchableHighlight
                                    style={{ backgroundColor: "rgb(127,	162,244	)", paddingHorizontal: 20, paddingVertical: 10, borderRadius: 5, marginLeft: 20 }}
                                    onPress={this.Submit}>
                                    {processing === false
                                        ? <Text>Đồng ý</Text>
                                        : <ActivityIndicator size="small" color="#00ff00" />}
                                </TouchableHighlight>
                                : <TouchableHighlight
                                style={{ backgroundColor: "rgb(127,	162,244	)", paddingHorizontal: 20, paddingVertical: 10, borderRadius: 5, marginLeft: 20 }}
                                    onPress={() => this.OffPromotion(item.id)}>
                                    {processing === false
                                        ? <Text>Tắt</Text>
                                        : <ActivityIndicator size="small" color="#00ff00" />}
                                </TouchableHighlight>}
                        </View>
                    </View>
                </View>
            </Modal>
        );
    }
}
const style = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, .8)"
    },
    body: {
        flex: 0.3,
        justifyContent: "center",
        alignItems: "center",
        width: "70%",
        color: "#fff",
        opacity: 1,
        backgroundColor: "#fff",
        borderRadius: 30

    }

})