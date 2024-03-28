import {AppDispatch} from "../store";
import {articleSlice, setArticleCreatedState, setArticleCreatingState, setCommonErr} from "./articlesSlice";
import articlesAPI from "../../api/articlesAPI";
import {ICreatedArticle, IUpdateArticle} from "./articleTypes";

export const fetchArticles = (page = 1) => async (dispatch: AppDispatch) => {
    const res = await articlesAPI.getArticles(page)
    dispatch(articleSlice.actions.setArticles(res.data.articles))
    dispatch(articleSlice.actions.setTotalCountOfArticles(res.data.total))
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
        dispatch(setArticleCreatingState(false))
        dispatch(setCommonErr('Something went wrong, try again later'))
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
        dispatch(setCommonErr('Something went wrong, try again later'))
    }
}

