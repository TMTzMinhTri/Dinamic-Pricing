export const REGISTER_ERROR = "REGISTER_ERROR"
export const RESETSTATE = "RESETSTATE"


export interface IActionRegister {
    type: typeof REGISTER_ERROR,
    message: string
}
export interface ResetState {
    type: typeof RESETSTATE
}

export interface DispatchFunction {
    
}
export type AuthActionType = IActionRegister | ResetState