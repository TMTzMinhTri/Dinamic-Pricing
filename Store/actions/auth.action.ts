import { Dispatch } from "redux"
import { register } from '../../Api/Repository'
import { IPostRegister } from "../../Modals/dataPost";
import { REGISTER_ERROR, RESETSTATE } from "../../Modals/action";
import { RootAction } from "../../Modals";

// const resetState = (): RootAction => ({
//     type: RESETSTATE
// })

export const reset = () => {
    return (dispatch: Dispatch<RootAction>) => {
        dispatch({
            type: RESETSTATE
        })
    }
}

export const Register = (dataPost: IPostRegister, callback: Function) => {
    return async (dispatch: Dispatch<RootAction>) => {
        let data = await register(dataPost)
        console.log(data)
        if (data.success === false) {
            dispatch({
                type: REGISTER_ERROR,
                message: data.error.message
            })
        }
        else {
            data.data.status
        }
    }
}

