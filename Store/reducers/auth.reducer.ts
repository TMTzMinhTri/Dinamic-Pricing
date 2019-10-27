import { RootAction } from "../../Modals"
import { REGISTER_ERROR, RESETSTATE, SIGNIN_SUCCESS } from "../../Modals/action"
import { AsyncStorage } from "react-native";

interface IauthReducer {
    errormessage: string,
    loginToken: string
    apiKey: string,
    shopName: string,
    loading: boolean
}

const initialState = {
    errormessage: null,
    apiKey: null,
    loginToken: null,
    shopName: null,
    loading: true

} as IauthReducer



export default function (state = initialState, action: RootAction): IauthReducer {
    switch (action.type) {
        case REGISTER_ERROR:
            return {
                ...state,
                errormessage: action.message
            }
        case SIGNIN_SUCCESS:
            AsyncStorage.setItem('login_token', action.payload.token)
            return {
                ...state,
                loginToken: action.payload.token,
                apiKey: action.payload.apiKey,
                shopName: action.payload.shopName,
                loading: false
            }
        case RESETSTATE:
            AsyncStorage.clear()
            return initialState
        default:
            return state
    }
}