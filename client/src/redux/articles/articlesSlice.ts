import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {IArticle, IArticlesPreview, IComments, ICreatedArticle, IEditingArticle} from "./articleTypes";
import {bool} from "yup";


const initialState = {
    articles: [] as Array<IArticlesPreview>,
    popularArticles: [] as IArticlesPreview[],
    searchResult: {total: 0, foundArticles: []} as { total: number, foundArticles: IArticlesPreview[] },
    searchValue:'' as string,
    isSearching: false as boolean,
    totalCountOfArticles: null as number | null,
    currentArticleFilter: '' as string,
    editingArticle: {} as IEditingArticle,
    currentArticle: null as IArticle | null,
    createdArticle: {},
    isArticleCreating: false,
    isArticleCreated: false as boolean,
    isCommentPublishing: false as boolean,
    articleCreationErr: '' as string,
    isCommonLoading: false as boolean
}

export const articleSlice = createSlice({
    name: 'article',
    initialState,
    reducers: {
        setArticles(state, action: PayloadAction<IArticle[]>) {
            state.articles = action.payload
        },
        setPopularArticles(state, action: PayloadAction<IArticle[]>) {
            state.popularArticles = action.payload
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
        setArticleCreationErr(state, action: PayloadAction<string>) {
            state.articleCreationErr = action.payload
        },
        setCreatedArticle(state, action: PayloadAction<ICreatedArticle>) {
            state.createdArticle = action.payload
        },
        updateArticleComments(state, action: PayloadAction<Array<IComments>>) {
            if (!state.currentArticle) return
            state.currentArticle.comments = action.payload
        },
        setEditingArticle(state, action: PayloadAction<IEditingArticle>) {
            state.editingArticle = action.payload
        },
        setSearchResult(state, action: PayloadAction<{ total: number, foundArticles: IArticlesPreview[] }>) {
            state.searchResult = action.payload
        },
        setSearchingState(state, action: PayloadAction<boolean>) {
            state.isSearching = action.payload
        },
        setSearchValue(state, action: PayloadAction<string>) {
            state.searchValue = action.payload
        },
    }
})

export const {
    setArticleCreatedState,
    setArticleCreatingState,
    setArticleCreationErr,
    updateArticleComments,
    setEditingArticle,
    setCurrentArticle,
    setSearchingState,
    setSearchValue
} = articleSlice.actions