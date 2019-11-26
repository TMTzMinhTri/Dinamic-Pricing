import * as React from "react";
import { View, Text, Image } from "react-native";
import { IResponeListProduct } from "../../../Modals/response";


interface IState {

}
interface IProps {
    product: IResponeListProduct
}
export class ProductItem extends React.Component<IProps, IState> {
    render() {
        const { product } = this.props
        return <View style={{ marginVertical: 30 }}>
            <Image
                source={{ uri: product.images.length > 0 ? product.images[0].src : null }}
                style={{ width: "100%", height: 300, borderRadius: 20 }} />
            <Text style={{ fontSize: 30, fontWeight: "bold", textTransform: "uppercase" }}>{product.title}</Text>
            <Text style={{ fontSize: 20 }}>Số lượng biến thể: {product.variants.length}</Text>
            <Text style={{ fontSize: 20 }}>Nhà cung cấp: {product.vendor}</Text>
        </View>
    }
}