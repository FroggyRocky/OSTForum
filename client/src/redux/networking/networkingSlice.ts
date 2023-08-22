import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {INetwork} from "./networkingTypes";

const initialState = {
    networks:[] as INetwork[]
}


export const networkingSlice = createSlice({
    name: 'networking',
    initialState,
    reducers: {
        setNetworks(state, action: PayloadAction<INetwork[]>) {
            state.networks = action.payload
        }
    }
})

export const {setNetworks} = networkingSlice.actions