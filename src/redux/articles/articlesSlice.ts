import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {IArticle, IArticlesPreview, ICreatedArticle} from "./articleTypes";


const initialState = {
    articles: [] as Array<IArticlesPreview>,
    currentArticle: null as IArticle | null,
    createdArticle: {},
    isArticleCreating: false,
    isArticleCreated: undefined as boolean | undefined
}

export const articleSlice = createSlice({
    name: 'article',
    initialState,
    reducers: {
        setArticles(state, action: PayloadAction<IArticle[]>) {
            state.articles = action.payload
        },
        setCurrentArticle(state, action: PayloadAction<IArticle>) {
            state.currentArticle = action.payload
        },
        setArticleCreatingState(state, action: PayloadAction<boolean>) {
            state.isArticleCreating = action.payload
        },
        setArticleCreatedState(state, action: PayloadAction<boolean | undefined>) {
            state.isArticleCreated = action.payload
        },
        setCreatedArticle(state, action: PayloadAction<ICreatedArticle>) {
            state.createdArticle = action.payload
        }
    }
})

export const {setArticleCreatedState, setArticleCreatingState} = articleSlice.actions