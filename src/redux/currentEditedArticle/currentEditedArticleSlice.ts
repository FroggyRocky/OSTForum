import {createSlice, PayloadAction} from '@reduxjs/toolkit'


///This slice is for editting already existed article (!important) and creation of an article///

const initialState = {
    header: '' as string,
    description: '' as string,
    mainImg: '' as string,
    isArticleCreated: false as boolean,
    articleCreationErr: '' as string
}

export const currentCreatedArticle = createSlice({
    name: 'currentEditedArticle',
    initialState,
    reducers: {
        setMainImg(state, action: PayloadAction<string>) {
            state.mainImg = action.payload
        },
        setArticleCreationState(state, action: PayloadAction<boolean>) {
            state.isArticleCreated = action.payload
        },
        setArticleCreationErr(state, action: PayloadAction<string>) {
            state.articleCreationErr = action.payload
        }

    }
})


export const {setMainImg} = currentCreatedArticle.actions