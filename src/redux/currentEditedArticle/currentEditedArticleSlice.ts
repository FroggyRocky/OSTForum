import {createSlice, PayloadAction} from '@reduxjs/toolkit'


///This slice is for editting already existed article (!important) and creation of an article///

const initialState = {
    header:'' as string,
    description:'' as string,
    mainImg:'' as string
}

export const currentCreatedArticle  = createSlice({
    name: 'currentEditedArticle',
    initialState,
    reducers: {
setMainImg(state,action:PayloadAction<string>) {
    state.mainImg = action.payload
}
    }
})


export const {setMainImg} = currentCreatedArticle.actions