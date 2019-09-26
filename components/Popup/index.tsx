import React from "react";
import { View, Text, Modal, StyleSheet, AsyncStorage, TouchableHighlight, Alert } from "react-native";
import { NavigationStackProp } from 'react-navigation-stack';


type IModalProps = {
    navigation: NavigationStackProp;
    modalVisible: boolean,
    OnofModal: Function
};

export class Modals extends React.Component<IModalProps> {
    render() {
        return (
            <Modal
                animationType="slide"
                transparent={false}
                visible={this.props.modalVisible}
                presentationStyle="pageSheet"
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                }}>
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
        flex: 0.5,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "red"
    },
    body: {
        justifyContent: "center",
        alignItems: "center",
        width: "50%",
        height: "50%"
    }

})