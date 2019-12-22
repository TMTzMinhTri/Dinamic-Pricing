import { Api, IResponse } from '..'
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

export const sendEmail = (email: string) => {
    const path = `/api/user/access_email?email=${email}`
    return Api.Get<any>(path)
}
export const verifyEmail = (code: string, session_id: string) => {
    const path = `/api/user/verify?verify_code=${code}&session_id=${session_id}`
    return Api.Get<any>(path)
}

export const checkStep = (email: string) => {
    const path = `/api/user/check-step?email=${email}`
    return Api.Get(path)
}

export const updateStep = (id) => {
    const path = `/api/user/updateStep?id=${id}`
    return Api.Get(path)
}

export const getListOrders = () => {
    const path = `/api/product/orders`
    return Api.Get<any>(path)
}

export const createProduct = (body) => {
    const path = `/api/product`
    return Api.POST_MULTIPART<IResponeListProduct>(path, body)
}