import {combineReducers, configureStore} from '@reduxjs/toolkit'
import articles from './articles/articlesSlice'

const rootReducer = combineReducers({
    articles: articles,
})

export const store = configureStore({
    reducer: rootReducer
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch


// @ts-ignore
window.store = store