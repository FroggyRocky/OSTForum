import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IAffiliate} from "./affiliatesTypes";

const initialState = {
    affiliates:[] as IAffiliate[],
    total:0 as number,
    isLoading:false as boolean,
    currentFilterKey:null as {id:number, name:string} | null
}


export const affiliatesSlice = createSlice({
    name: 'affiliates',
    initialState,
    reducers: {
        setAffiliates(state, action: PayloadAction<{affiliates:IAffiliate[], total:number}>) {
            const filtered = action.payload.affiliates.filter(el => !state.affiliates.some(elem => elem.id === el.id))
            state.affiliates = [...state.affiliates, ...filtered]
            state.total = action.payload.total
        },
        setCurrentFilterKey(state, action: PayloadAction<{id:number,name:string}>) {
            state.currentFilterKey = action.payload
            state.affiliates = []
        },
    }
})

export const {setAffiliates, setCurrentFilterKey} = affiliatesSlice.actions