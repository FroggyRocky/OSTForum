import {combineReducers, configureStore} from '@reduxjs/toolkit'
import articles from './articles/articlesSlice'
import user from './user/userSlice'
import {currentCreatedArticle} from "./currentEditedArticle/currentEditedArticleSlice";
const rootReducer = combineReducers({
    articles: articles,
    user:user,
    currentEditedArticle:currentCreatedArticle.reducer
})

export const store = configureStore({
    reducer: rootReducer
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch


// @ts-ignore
window.store = store