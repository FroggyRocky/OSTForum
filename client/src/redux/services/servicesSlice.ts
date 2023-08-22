import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IService} from "./servicesTypes";

const initialState = {
    services:[] as IService[]
}


export const servicesSlice = createSlice({
    name: 'services',
    initialState,
    reducers: {
        setServices(state, action: PayloadAction<IService[]>) {
            state.services = action.payload
        }
    }
})

export const {setServices} = servicesSlice.actions