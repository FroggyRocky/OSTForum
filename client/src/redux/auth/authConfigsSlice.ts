import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IConfigs} from "./authConfigsTypes";

const initialState = {
isAuth:false as boolean,
    loginErr:'' as string,
    token:'' as string, // ????necessity???
    configs:{} as IConfigs,
    isInitialized:false as boolean,
    commonError:'' as string
 }


export const authConfigsSlice = createSlice({
    name: 'authConfigs',
    initialState,
    reducers: {
        setAuthState(state, action: PayloadAction<boolean>) {
            state.isAuth = action.payload
        },
        setLoginErr(state, action: PayloadAction<string>) {
            state.loginErr = action.payload
        },
        setConfigs(state,action:PayloadAction<IConfigs>) {
            state.configs.categories = action.payload.categories
            state.configs.keys = action.payload.keys
        },
        setInitializerState(state,action:PayloadAction<boolean>) {
            state.isInitialized = action.payload
        },
        setCommonErr(state,action:PayloadAction<string>) {
            state.commonError = action.payload
        }
    }
})

export const {setAuthState, setCommonErr} = authConfigsSlice.actions