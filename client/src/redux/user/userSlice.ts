import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IUser} from "./userType";
import {IArticlesPreview} from "../articles/articleTypes";

const initialState = {
    userData: {} as IUser,
    articles: [] as IArticlesPreview[],
    editingArticle:{} as {ContentBlock:Array<Object>, entityMap:Array<Object>},
    auth: false as boolean,
    loginErr: '' as string
}


export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<IUser>) {
            state.userData = action.payload
        }
    }
})

export const {setUser} = userSlice.actions
