import { Dispatch } from "redux"
import { register, signin, getAccessToken, sendEmail, verifyEmail } from '../../Api/Repository'
import { IPostRegister, IPostSignIn } from "../../Modals/dataPost";
import { REGISTER_ERROR, RESETSTATE, SIGNIN_SUCCESS } from "../../Modals/action";
import { RootAction } from "../../Modals";
import { AsyncStorage } from "react-native";

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
        let data = await register(dataPost) as any
        console.log(data)
        if (data.success === false) {
            dispatch({
                type: REGISTER_ERROR,
                message: data.error.message
            })
        }
        await AsyncStorage.setItem('login_token', data.data.token)
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
        console.log(rsp.data.token)
        await AsyncStorage.setItem('login_token', rsp.data.token)

        if (rsp.success === true) {
            dispatch({
                type: SIGNIN_SUCCESS,
                payload: rsp.data
            })
            console.log(rsp.data)
            callback(rsp.data)
        }
        else
            dispatch({
                type: REGISTER_ERROR,
                message: rsp.error.message
            })
    }
}

export const SendEmail = (email: string, callback: Function) => {
    return async (dispatch: Dispatch<RootAction>) => {
        let rsp = await sendEmail(email)
        if (rsp.success === true) {
            callback(rsp.data)
        }
    }
}

export const VerifyEmail = (code: string, session_id: string, callback: Function) => {
    return async (dispatch: Dispatch<RootAction>) => {
        let rsp = await verifyEmail(code, session_id)
        callback(rsp.success)
    }
}
