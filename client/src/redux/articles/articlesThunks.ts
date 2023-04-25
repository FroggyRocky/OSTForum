import {AppDispatch} from "../store";
import {
    articleSlice,
    setArticleCreatedState,
    setArticleCreatingState,
    setArticleCreationErr,
    setSearchingState
} from "./articlesSlice";
import articlesAPI from "../../api/articlesAPI";
import {ICreatedArticle, IUpdateArticle} from "./articleTypes";
import {AxiosError} from "axios";
import {searchAPI} from "../../api/searchAPI";

export const fetchArticles = (page = 1, categoryIds: number[] | [] = []) => async (dispatch: AppDispatch) => {
    const res = await articlesAPI.getArticles(page, categoryIds)
    dispatch(articleSlice.actions.setArticles(res.data.articles))
    dispatch(articleSlice.actions.setTotalCountOfArticles(res.data.total))
}
export const fetchPopularArticles = () => async (dispatch: AppDispatch) => {
    const res = await articlesAPI.getPopularArticles()
    dispatch(articleSlice.actions.setPopularArticles(res.data))
}
export const searchArticle = (query: string, page = 1) => async (dispatch: AppDispatch) => {
    dispatch(setSearchingState(true))
    if (query) {
        const res = await searchAPI.searchArticles(query, page)
        if (res.status === 200) {
            const data = {
                total: res.data.total,
                foundArticles: res.data.articles
            }
            dispatch(articleSlice.actions.setSearchResult(data))
            dispatch(setSearchingState(false))
        }
    } else if(query === '') {
        const data = {
            total: 0,
            foundArticles: []
        }
        dispatch(articleSlice.actions.setSearchResult(data))
    }
    dispatch(setSearchingState(false))
}
export const fetchCurrentArticle = (id: number) => async (dispatch: AppDispatch) => {
    const res = await articlesAPI.getArticle(id)
    await dispatch(articleSlice.actions.setCurrentArticle(res.data))
}

export const createArticle = (data: ICreatedArticle) => async (dispatch: AppDispatch) => {
    try {
        const res = await articlesAPI.createArticle(data)
        if (res.status === 200) {
            dispatch(setArticleCreatedState(true))
            dispatch(setArticleCreatingState(false))
        }
    } catch (e) {
        const err = e as AxiosError
        dispatch(setArticleCreatingState(false))
        dispatch(setArticleCreationErr(err.message))
    }
}

export const updateArticle = (data: IUpdateArticle) => async (dispatch: AppDispatch) => {
    try {
        const res = await articlesAPI.updateArticle(data)
        if (res.status === 200) {
            dispatch(setArticleCreatedState(true))
            dispatch(setArticleCreatingState(false))
        }
    } catch (e) {
        dispatch(setArticleCreatingState(false))
        dispatch(setArticleCreationErr('Something went wrong, try again later'))
    }
}

