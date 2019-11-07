import { Api } from '..'
import { IPostRegister, IPostSignIn } from '../../Modals/dataPost'
import { IResponseStatus, IResponeSignIn, IResponeListProduct } from '../../Modals/response'




export const register = (body: IPostRegister) => {
    const path = `/api/user/register`
    return Api.POST<IResponseStatus>(path, body)
}

export const signin = (body: IPostSignIn) => {
    const path = `/api/user/signin`
    return Api.POST<IResponeSignIn>(path, body)
}

export const getAccessToken = (code: string) => {
    const path = `/auth?code=${code}`
    return Api.Get<IResponseStatus>(path)
}

export const getListProduct = () => {
    const path = `/api/product`
    return Api.Get<IResponeListProduct[]>(path)
}