import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {IArticle, IArticlesPreview, IComments, ICreatedArticle} from "./articleTypes";



const initialState = {
    articles: [] as Array<IArticlesPreview>,
    currentArticle: null as IArticle | null,
    createdArticle: {},
    isArticleCreating: false,
    isArticleCreated: false as boolean,
    isCommentPublishing:false as boolean,
    commonError:'' as string
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
        setArticleCreatedState(state, action: PayloadAction<boolean>) {
            state.isArticleCreated = action.payload
        },
        setCommonErr(state, action: PayloadAction<string>) {
            state.commonError = action.payload
        },
        setCreatedArticle(state, action: PayloadAction<ICreatedArticle>) {
            state.createdArticle = action.payload
        },
        updateArticleComments(state,action:PayloadAction<Array<IComments>>) {
            if(!state.currentArticle) return
                state.currentArticle.comments = action.payload
        }
    }
})

export const {setArticleCreatedState, setArticleCreatingState, setCommonErr, updateArticleComments} = articleSlice.actions