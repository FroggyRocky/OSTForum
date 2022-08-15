import axios from "axios";
import {serverURL} from "../../api/URL";
import {userSlice} from "./userSlice";
import {AppDispatch} from "../store";

export const fetchUser = (id:number) => async (dispatch:AppDispatch) => {

}

export const fetchAccountData = () => async (dispatch:AppDispatch) => {
    let token = window.localStorage.getItem('MyClickToken')
    const res = await axios.get(`${serverURL}/get-account-data`, {
        headers:{
            'xxx-auth-token':`Bearer ${token}`
        }
    })
    dispatch(userSlice.actions.setUser(res.data))
}
export const loginUser = (data:{login:string, password:string}) => async (dispatch:AppDispatch) => {
    const res = await axios.post(`${serverURL}/login`, {...data})
    window.localStorage.setItem('MyClickToken', res.data.token)
    dispatch(fetchAccountData())
}


