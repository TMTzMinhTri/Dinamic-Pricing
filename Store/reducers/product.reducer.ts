import { IResponeListProduct, IResponeListOrders } from "../../Modals/response";
import { RootAction } from "../../Modals";
import { GET_LIST_PRODUCT, GET_LIST_ORDERS, CREATE_PRODUCT } from "../../Modals/action";

interface IproductReducer {
    listProduct: any,
    listOrders: IResponeListOrders[]
}

const initialState = {
    listProduct: [],
    listOrders: []
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
        case CREATE_PRODUCT:
            console.log(action.payload)
            return {
                ...state,
                listProduct: state.listProduct.push(action.payload)
            }
        default:
            return {
                ...state
            }
    }
}