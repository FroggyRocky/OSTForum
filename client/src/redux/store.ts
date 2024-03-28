import {combineReducers, configureStore} from '@reduxjs/toolkit'
import {articleSlice} from './articles/articlesSlice'
import {userSlice} from './user/userSlice'
import {currentCreatedArticle} from "./currentEditedArticle/currentEditedArticleSlice";
import {authConfigsSlice} from "./auth/authConfigsSlice";
import {commentsAPI} from "../api/commentsAPI";
import {tapLinksSlice} from "./taplink/tapLinkSlice";
import {affiliatesSlice} from "./affiliates/affiliatesSlice";
import {networkingSlice} from "./networking/networkingSlice";
import {vacanciesSlice} from "./vacancies/vacanciesSlice";
import {casesSlice} from "./cases/casesSlice";
import {servicesSlice} from "./services/servicesSlice";

const rootReducer = combineReducers({
    articles: articleSlice.reducer,
    user:userSlice.reducer,
    currentEditedArticle:currentCreatedArticle.reducer,
    authConfigs:authConfigsSlice.reducer,
    tapLinks:tapLinksSlice.reducer,
    affiliates:affiliatesSlice.reducer,
    networking:networkingSlice.reducer,
    vacancies:vacanciesSlice.reducer,
    cases:casesSlice.reducer,
    services:servicesSlice.reducer,
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