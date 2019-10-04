import React from "react";
import { View, Text, Modal, StyleSheet, AsyncStorage, TouchableHighlight, Alert } from "react-native";
import { NavigationStackProp } from 'react-navigation-stack';


type IModalProps = {
    navigation?: NavigationStackProp;
    modalVisible: boolean,
    OnofModal: Function
};

export class Modals extends React.Component<IModalProps> {
    render() {
        return (
            <Modal
                animationType="fade"
                transparent={true}
                visible={this.props.modalVisible}
                presentationStyle="overFullScreen">
                <View style={style.container} >
                    <View style={style.body}>
                        <Text>Hello World!</Text>

                        <TouchableHighlight
                            onPress={() => this.props.OnofModal(false)}>
                            <Text>Hide Modal</Text>
                        </TouchableHighlight>
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
        flex: 0.4,
        justifyContent: "center",
        alignItems: "center",
        width: "70%",
        color: "#fff",
        opacity:1,
        backgroundColor: "#fff"

    }

})