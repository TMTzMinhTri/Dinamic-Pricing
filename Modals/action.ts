import { IResponeSignIn, IResponeListProduct } from "./response"

export const REGISTER_ERROR = "REGISTER_ERROR"
export const RESETSTATE = "RESETSTATE"
export const SIGNIN_SUCCESS = "SIGNIN_SUCCESS"
export const GET_LIST_PRODUCT = "GET_LIST_PRODUCT"


export interface IActionRegister {
    type: typeof REGISTER_ERROR,
    message: string
}
export interface ResetState {
    type: typeof RESETSTATE
}
export interface IActionSigninSuccess {
    type: typeof SIGNIN_SUCCESS,
    payload: IResponeSignIn
}
export interface DispatchFunction {
    type: typeof GET_LIST_PRODUCT,
    payload: IResponeListProduct[]
}
export type AuthActionType = IActionRegister | ResetState | IActionSigninSuccess | DispatchFunction