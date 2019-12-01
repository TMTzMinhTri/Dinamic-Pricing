import React, { Component } from 'react';
import { Modal, Text, Image, View, Alert } from 'react-native';
import { Input, Button } from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { RootAction } from '../../../Modals';

interface IProps {
    modalVisible: boolean,
    closeModal: Function
}
interface IState {
    image: string,
    title: string,
    product_type: string,
    vendor: string
}
class modalAddProduct extends Component<IProps, IState> {
    constructor(props) {
        super(props)
        this.state = {
            image: null,
            product_type: "",
            title: "",
            vendor: ""
        }
    }
    componentDidMount() {
        this.getPermissionAsync();
    }
    getPermissionAsync = async () => {
        if (Constants.platform.ios) {
            const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
            if (status !== 'granted') {
                alert('Sorry, we need camera roll permissions to make this work!');
            }
        }
    }

    _pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1
        }) as any

        console.log(result);

        if (!result.cancelled) {
            this.setState({ image: result.uri });
        }
    };

    render() {
        const { closeModal } = this.props
        const { image } = this.state
        return (
            <View style={{ marginTop: 22 }}>
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.props.modalVisible}
                    onRequestClose={() => {
                        Alert.alert('Modal has been closed.');
                    }}>
                    <View style={{ marginTop: 22 }}>
                        <View>
                            <Text>Tạo mới sản phẩm</Text>
                            {image &&
                                <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
                            <Input
                                label="Tên sản phẩm"
                                containerStyle={{ marginBottom: 20 }}
                                textContentType="password"
                                onChange={value =>
                                    this.setState({ title: value.nativeEvent.text })
                                }
                            />
                            <Input
                                label="Phân loại"
                                containerStyle={{ marginBottom: 20 }}
                                onChange={value =>
                                    this.setState({ product_type: value.nativeEvent.text })
                                }
                            />
                            <Input
                                label="nhà cung cấp"
                                containerStyle={{ marginBottom: 20 }}
                                textContentType="password"
                                onChange={value =>
                                    this.setState({ title: value.nativeEvent.text })
                                }
                            />
                            <Button
                                title="Pick an image from camera roll"
                                onPress={this._pickImage}
                            />
                            <Button title="Cancle" onPress={() => closeModal(false)} />
                        </View>
                    </View>
                </Modal>
            </View>
        );
    }
}

interface IStateProps {

}
interface IActionProps {
    
}
const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, RootAction>): IActionProps => ({
})

export const ModalAddProduct = connect()(modalAddProduct)