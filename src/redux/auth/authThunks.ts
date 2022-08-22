import {AppDispatch} from "../store";
import {authSlice} from "./authSlice";
import {fetchAccountData} from "../user/userThunks";
import {IUserLogin} from './authTypes'
import {authAPI} from "../../api/authAPI";

export const loginUser = (data: IUserLogin) => async (dispatch: AppDispatch) => {
    const res = await authAPI.login(data)
    if (res.status === 200 && res.data.token) {
        window.localStorage.setItem('MyClickToken', res.data.token)
        dispatch(fetchAccountData())
        dispatch(authSlice.actions.setAuthState(true))
    } else {
        console.log(res)
        dispatch(authSlice.actions.setLoginErr(``))
        dispatch(authSlice.actions.setAuthState(false))
    }
}
export const fetchConfigs = () => async (dispatch: AppDispatch) => {
    const configs = await authAPI.fetchConfigs()
    dispatch(authSlice.actions.setConfigs(configs))
}

export const auth = () => async (dispatch: AppDispatch) => {
    const token = window.localStorage.getItem('MyClickToken')
    if (token) {
        await dispatch(fetchAccountData())
    }
    await dispatch(fetchConfigs())
    dispatch(authSlice.actions.setInitializerState(true))
}