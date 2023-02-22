import {AppDispatch} from "../store";
import {authConfigsSlice} from "./authConfigsSlice";
import {fetchAccountData} from "../user/userThunks";
import {IUserLogin} from './authConfigsTypes'
import {authAPI} from "../../api/authAPI";
import {AxiosError} from "axios";
import {fetchArticles} from "../articles/articlesThunks";

export const loginUser = (data: IUserLogin) => async (dispatch: AppDispatch) => {
    const res = await authAPI.login(data)
    if (res.status === 200 && res.data.token) {
        window.localStorage.setItem('MyClickToken', res.data.token)
        dispatch(fetchAccountData())
        dispatch(authConfigsSlice.actions.setAuthState(true))
    } else {
        dispatch(authConfigsSlice.actions.setLoginErr(``))
        dispatch(authConfigsSlice.actions.setAuthState(false))
    }
}
export const fetchConfigs = () => async (dispatch: AppDispatch) => {
    const configs = await authAPI.fetchConfigs()
    dispatch(authConfigsSlice.actions.setConfigs(configs))
}

export const auth = () => async (dispatch: AppDispatch) => {
    try {
        const token = window.localStorage.getItem('MyClickToken')
        if (token) {
            await dispatch(fetchAccountData())
        }
        await dispatch(fetchConfigs())
        await dispatch(fetchArticles())
        dispatch(authConfigsSlice.actions.setInitializerState(true))
    } catch (e) {
        const err = e as AxiosError
        if (err.response?.status === 401 || err.response?.status === 403) {
            window.localStorage.removeItem('MyClickToken');
            await dispatch(fetchConfigs())
        }
    }
}