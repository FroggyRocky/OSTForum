import {combineReducers, configureStore} from '@reduxjs/toolkit'
import {articleSlice} from './articles/articlesSlice'
import {userSlice} from './user/userSlice'
import {currentCreatedArticle} from "./currentEditedArticle/currentEditedArticleSlice";
import {authSlice} from "./auth/authSlice";

const rootReducer = combineReducers({
    articles: articleSlice.reducer,
    user:userSlice.reducer,
    currentEditedArticle:currentCreatedArticle.reducer,
    auth:authSlice.reducer
})

export const store = configureStore({
    reducer: rootReducer
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch


// @ts-ignore
window.store = store