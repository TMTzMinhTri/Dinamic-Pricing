import { Dispatch } from "redux"
import { AsyncStorage } from "react-native";

import { register, signin } from '../../Api/Repository'
import { IPostRegister, IPostSignIn } from "../../Modals/dataPost";
import { REGISTER_ERROR, RESETSTATE, SIGNIN_SUCCESS } from "../../Modals/action";
import { RootAction } from "../../Modals";

// const resetState = (): RootAction => ({
//     type: RESETSTATE
// })

export const reset = () => {
    return (dispatch: Dispatch<RootAction>) => {
        dispatch({ type: RESETSTATE })
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
            const dataSignin: IPostSignIn = {
                email: dataPost.email,
                password: dataPost.password
            }
            try {
                let rsp = await signin(dataSignin)
                dispatch({ type: SIGNIN_SUCCESS, payload: rsp.data })
            } catch (error) {
                console.log(error.message)
            }

        }
        callback()
    }
}

