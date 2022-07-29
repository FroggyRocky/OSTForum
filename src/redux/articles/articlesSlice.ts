import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {ArticlesPreviewType, ArticleType} from "./articleTypes";


const initialState = {
    articles: [] as Array<ArticlesPreviewType>,
    currentArticle: null as ArticleType | null,

}

export const articleSlice = createSlice({
    name: 'articles',
    initialState,
    reducers: {
        setArticles(state, action: PayloadAction<ArticleType[]>) {
            state.articles = action.payload
        },
        setCurrentArticle(state, action:PayloadAction<ArticleType>) {
            state.currentArticle = action.payload
        }
    }
})

export default articleSlice.reducer