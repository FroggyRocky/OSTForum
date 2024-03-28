import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {IArticle, IArticlesPreview, IComments, ICreatedArticle, IEditingArticle} from "./articleTypes";



const initialState = {
    articles: [] as Array<IArticlesPreview>,
    totalCountOfArticles:null as number | null,
    currentArticleFilter:'' as string,
    editingArticle:{} as IEditingArticle,
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
        setTotalCountOfArticles(state, action: PayloadAction<number>) {
            state.totalCountOfArticles = action.payload
        },
        setCurrentArticle(state, action: PayloadAction<IArticle | null>) {
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
        },
        setEditingArticle(state,action:PayloadAction<IEditingArticle>) {
            state.editingArticle = action.payload
        }
    }
})

export const {setArticleCreatedState, setArticleCreatingState, setCommonErr, updateArticleComments, setEditingArticle, setCurrentArticle} = articleSlice.actions