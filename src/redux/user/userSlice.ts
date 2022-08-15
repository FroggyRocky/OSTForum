import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {UserType} from "./userType";
import {ArticlesPreviewType} from "../articles/articleTypes";

const initialState = {
    user: {} as UserType,
    articles:[] as ArticlesPreviewType[]
}


export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<UserType>) {
            state.user = action.payload
        }
    }
})


export default userSlice.reducer