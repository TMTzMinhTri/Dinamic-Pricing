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
        }
        callback({ status: data.success })
    }
}

export const GetAccessToken = (code: string, navigate: Function) => {
    return async (dispatch: Dispatch<RootAction>) => {
        let rsp = await getAccessToken(code)
        if (rsp.success === true)
        navigate("Home")
    }
}



export const SignIn = (dataSignin: IPostSignIn, callback: Function = () => { }) => {
    return async (dispatch: Dispatch<RootAction>) => {
        let rsp = await signin(dataSignin)
        if (rsp.success === true) {
            dispatch({
                type: SIGNIN_SUCCESS,
                payload: rsp.data
            })
            callback(rsp.data)
        }
        else
            dispatch({
                type: REGISTER_ERROR,
                message: rsp.error.message
            })
    }
}