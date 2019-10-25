import { Dispatch } from "redux"
import { register } from '../../Api/Repository'
import { IPostRegister } from "../../Modals/dataPost";

export const Register = (dataPost: IPostRegister) => {

    return async (dispatch: Dispatch<any>) => {
        let data = await register(dataPost)
        console.log(data)
    }
}