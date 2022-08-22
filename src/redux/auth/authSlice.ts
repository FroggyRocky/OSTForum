import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IConfigs} from "./authTypes";

const initialState = {
isAuth:false as boolean,
    loginErr:'' as string,
    token:'' as string, // ????necessity???
    configs:{} as IConfigs,
    isInitialized:false as boolean
}


export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuthState(state, action: PayloadAction<boolean>) {
            state.isAuth = action.payload
        },
        setLoginErr(state, action: PayloadAction<string>) {
            state.loginErr = action.payload
        },
        setConfigs(state,action:PayloadAction<IConfigs>) {
            state.configs = action.payload
        },
        setInitializerState(state,action:PayloadAction<boolean>) {
            state.isInitialized = action.payload
        }
    }
})

export const {setAuthState} = authSlice.actions