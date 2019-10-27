import { Dispatch } from "redux"
import { register, signin, getAccessToken } from '../../Api/Repository'
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
        if (data.success === false) {
            dispatch({
                type: REGISTER_ERROR,
                message: data.error.message
            })
            callback({ status: false })
        }
        else {
            const dataSignin: IPostSignIn = {
                email: dataPost.email,
                password: dataPost.password
            }
            try {
                let rsp = await signin(dataSignin)
                dispatch({ type: SIGNIN_SUCCESS, payload: rsp.data })
                callback({
                    status: true,
                    apiKey: rsp.data.apiKey,
                    shopName: rsp.data.shopName
                })
            } catch (error) {
                console.log(error.message)
            }

        }
    }
}

export const GetAccessToken = (code: string) => {
    return async (dispatch: Dispatch<RootAction>) => {
        let rsp = await getAccessToken(code)
        console.log(rsp)
    }
}