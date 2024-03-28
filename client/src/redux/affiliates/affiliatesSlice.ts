import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IAffiliate} from "./affiliatesTypes";

const initialState = {
    affiliates:[] as IAffiliate[]
}


export const affiliatesSlice = createSlice({
    name: 'affiliates',
    initialState,
    reducers: {
        setAffiliates(state, action: PayloadAction<IAffiliate[]>) {
            state.affiliates = action.payload
        }
    }
})

export const {setAffiliates} = affiliatesSlice.actions