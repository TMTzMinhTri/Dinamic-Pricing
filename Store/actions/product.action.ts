import { Dispatch } from "redux"
import { RootAction } from "../../Modals"
import { getListProduct } from "../../Api/Repository";
import { GET_LIST_PRODUCT } from "../../Modals/action";



export const getProduct = (callback: Function) => {
    return async (dispatch: Dispatch<RootAction>) => {
        const rsp = await getListProduct()
        console.log(rsp)
        if(rsp.success === false) {
            
        }
        dispatch({
            type: GET_LIST_PRODUCT,
            payload: rsp.data
        })
        callback()
    }
}