import * as React from "react";
import { View, Modal, StyleSheet } from "react-native";
import { NavigationStackProp } from 'react-navigation-stack';

type IModalProps = {
    navigation?: NavigationStackProp;
    modalVisible: boolean,
    OnofModal?: Function,
    onchange?: Function
};

interface IState {

}

export class Modals extends React.Component<IModalProps, IState> {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    // private Submit = () => {
    //     const { OnofModal, onchange } = this.props
    //     this.setState({ processing: true }, async () => {
    //         const { item } = this.props, { id } = item, percent = 20
    //         const url = `http://163.47.9.196:8000/api/data/variants/${id}/${percent}`
    //         const token = await AsyncStorage.getItem("login_token")
    //         let rsp = await axios.post(url, null, {
    //             headers: { "Authorization": token }
    //         }), { status } = rsp
    //         if (status === 200) {
    //             this.setState({ processing: false }, () => {
    //                 OnofModal(false)
    //                 onchange(true)

    //             })
    //         }
    //     })
    // }

    // private OffPromotion = (id: number) => {
    //     const { OnofModal, onchange } = this.props
    //     this.setState({ processing: true }, async () => {
    //         const url = `http://163.47.9.196:8000/api/data/variants/offpromote/${id}`
    //         const token = await AsyncStorage.getItem("login_token")
    //         let rsp = await axios.post(url, null, {
    //             headers: { "Authorization": token }
    //         }), { status } = rsp
    //         console.log(rsp)
    //         if (status === 200) {
    //             this.setState({ processing: false }, () => {
    //                 OnofModal(false)
    //                 onchange(true)
    //             })
    //         }
    //     })
    // }

    render() {
        const { children } = this.props
        return (
            <Modal
                animationType="fade"
                transparent={true}
                visible={this.props.modalVisible}
                presentationStyle="overFullScreen">
                <View style={style.container} >
                    <View style={style.body}>
                        {children}
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
        borderRadius: 10

    }
})