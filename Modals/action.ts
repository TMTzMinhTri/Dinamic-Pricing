import { IResponeSignIn } from "./response"

export const REGISTER_ERROR = "REGISTER_ERROR"
export const RESETSTATE = "RESETSTATE"
export const SIGNIN_SUCCESS = "SIGNIN_SUCCESS"


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

}
export type AuthActionType = IActionRegister | ResetState | IActionSigninSuccess