import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {TapLinkType} from "./tapLinkType";
import {IUser} from "../user/userType";

const initialState = {
    tapLinks: [] as TapLinkType[]
}


export const tapLinksSlice = createSlice({
    name: 'tapLinks',
    initialState,
    reducers: {
        setTapLinks(state, actions: PayloadAction<TapLinkType[]>) {
            state.tapLinks = actions.payload
        }
    }
})

export const {setTapLinks} = tapLinksSlice.actions

