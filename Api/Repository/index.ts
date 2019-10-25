import { Api } from '..'
import { IPostRegister } from '../../Modals/dataPost'

export const register = (body: IPostRegister) => {
    const path = `/api/user`
    return Api.POST<any>(path, body)
}