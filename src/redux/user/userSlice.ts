import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IUser} from "./userType";
import {IArticlesPreview} from "../articles/articleTypes";

const initialState = {
    user: {} as IUser,
    articles: [] as IArticlesPreview[],
    auth: false as boolean,
    loginErr: '' as string
}


export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<IUser>) {
            state.user = action.payload
        }
    }
})

export const {setUser} = userSlice.actions
