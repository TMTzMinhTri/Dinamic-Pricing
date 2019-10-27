import { Api } from '..'
import { IPostRegister, IPostSignIn } from '../../Modals/dataPost'
import { IResponseStatus, IResponeSignIn } from '../../Modals/response'




export const register = (body: IPostRegister) => {
    const path = `/api/user/register`
    return Api.POST<IResponseStatus>(path, body)
}

export const signin = (body: IPostSignIn) => {
    const path = `/api/user/signin`
    return Api.POST<IResponeSignIn>(path, body)
}