import { Dispatch } from "redux"
import { RootAction } from "../../Modals"
import { getListProduct, getListOrders, createProduct } from "../../Api/Repository";
import { GET_LIST_PRODUCT, GET_LIST_ORDERS } from "../../Modals/action";



export const getProduct = (callback: Function) => {
    return async (dispatch: Dispatch<RootAction>) => {
        const rsp = await getListProduct()
        if (rsp.success === false) {

        }
        dispatch({
            type: GET_LIST_PRODUCT,
            payload: rsp.data
        })
        callback()
    }
}
export const getorder = () => {
    return async (dispatch: Dispatch<RootAction>) => {
        const rsp = await getListOrders()
        console.log(rsp.data)
        dispatch({
            type: GET_LIST_ORDERS,
            payload: rsp.data.orders
        })
    }
}

export const CreateProduct = (data) => {
    return async (dispatch: Dispatch<RootAction>) => {
        const rsp = await createProduct(data)
        console.log(rsp)
    }
}