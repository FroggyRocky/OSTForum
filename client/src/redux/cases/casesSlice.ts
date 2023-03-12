import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ICase} from "./casesTypes";

const initialState = {
    cases:[] as ICase[]
}


export const casesSlice = createSlice({
    name: 'cases',
    initialState,
    reducers: {
        setCases(state, action: PayloadAction<ICase[]>) {
            state.cases = action.payload
        }
    }
})

export const {setCases} = casesSlice.actions