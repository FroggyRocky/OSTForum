import {combineReducers, configureStore} from '@reduxjs/toolkit'
import {articleSlice} from './articles/articlesSlice'
import {userSlice} from './user/userSlice'
import {currentCreatedArticle} from "./currentEditedArticle/currentEditedArticleSlice";
import {authConfigsSlice} from "./auth/authConfigsSlice";
import {commentsAPI} from "../api/commentsAPI";

const rootReducer = combineReducers({
    articles: articleSlice.reducer,
    user:userSlice.reducer,
    currentEditedArticle:currentCreatedArticle.reducer,
    authConfigs:authConfigsSlice.reducer,
    [commentsAPI.reducerPath]:commentsAPI.reducer
})

export const store = configureStore({
    reducer: rootReducer,
    middleware:(getDefaultMiddleware) => getDefaultMiddleware().concat(commentsAPI.middleware)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch


// @ts-ignore
window.store = store