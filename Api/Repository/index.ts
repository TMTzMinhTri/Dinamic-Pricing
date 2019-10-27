import { Api } from '..'
import { IPostRegister } from '../../Modals/dataPost'

interface IResponse {
    status: boolean
}

export const register = (body: IPostRegister) => {
    const path = `/api/user/register`
    return Api.POST<IResponse>(path, body)
}