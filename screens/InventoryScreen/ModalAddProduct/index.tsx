import React, { Component } from 'react';
import { Modal, Text, Image, View, Alert } from 'react-native';
import { Input, Button } from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { RootAction } from '../../../Modals';
import { bindActionCreators } from 'redux';
import { CreateProduct } from '../../../Store/actions/product.action';

interface IProps {
    modalVisible: boolean,
    closeModal: Function
}
type IPRops = IProps & IActionProps
interface IState {
    image: string,
    title: string,
    product_type: string,
    vendor: string,
    file: any
}
class modalAddProduct extends Component<IPRops, IState> {
    constructor(props) {
        super(props)
        this.state = {
            image: null,
            product_type: "",
            title: "",
            vendor: "",
            file: null
        }
    }
    componentDidMount() {
        this.getPermissionAsync();
    }

    createProduct = () => {
        const { image, vendor, product_type, title, file } = this.state
        const { createProduct, closeModal } = this.props
        let formdata = new FormData();
        formdata.append("title", title)
        formdata.append("vendor", vendor)
        formdata.append("product_type", product_type)
        formdata.append("image", file)
        createProduct(formdata, () => {
        })
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


        if (!result.cancelled) {
            let localUri = result.uri;
            let filename = localUri.split('/').pop();
            let match = /\.(\w+)$/.exec(filename);
            let type = match ? `image/${match[1]}` : `image`;
            this.setState({ image: result.uri, file: { uri: localUri, name: filename, type } });
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
                            <Button title="Submit" onPress={this.createProduct} />
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
    createProduct: (data, callback) => void
}
const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, RootAction>): IActionProps => ({
    createProduct: bindActionCreators(CreateProduct, dispatch)
})

export const ModalAddProduct = connect(null, mapDispatchToProps)(modalAddProduct)