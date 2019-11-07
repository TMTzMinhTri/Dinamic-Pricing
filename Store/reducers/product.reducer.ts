import { IResponeListProduct } from "../../Modals/response";
import { RootAction } from "../../Modals";
import { GET_LIST_PRODUCT } from "../../Modals/action";

interface IproductReducer {
    listProduct: IResponeListProduct[]
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
        default:
            return {
                ...state
            }
    }
}