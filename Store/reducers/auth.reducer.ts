import { RootAction } from "../../Modals"
import { REGISTER_ERROR, RESETSTATE } from "../../Modals/action"

interface IauthReducer {
    errormessage: string
}

const initialState = {
    errormessage: null
} as IauthReducer



export default function (state = initialState, action: RootAction): IauthReducer {
    switch (action.type) {
        case REGISTER_ERROR:
            return {
                ...state,
                errormessage: action.message
            }
        case RESETSTATE:
            return initialState
        default:
            return state
    }
}