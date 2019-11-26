import { IResponeListProduct, IResponeListOrders } from "../../Modals/response";
import { RootAction } from "../../Modals";
import { GET_LIST_PRODUCT, GET_LIST_ORDERS } from "../../Modals/action";

interface IproductReducer {
    listProduct: IResponeListProduct[],
    listOrders: IResponeListOrders[]
}

const initialState = {
    listProduct: []

} as IproductReducer


export default function (state = initialState, action: RootAction): IproductReducer {
    switch (action.type) {
        case GET_LIST_PRODUCT:
            return {
                ...state,
                listProduct: action.payload
            }
        case GET_LIST_ORDERS:
            return {
                ...state,
                listOrders: action.payload
            }
        default:
            return {
                ...state
            }
    }
}