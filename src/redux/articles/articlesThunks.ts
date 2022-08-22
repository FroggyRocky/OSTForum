import {AppDispatch} from "../store";
import {articleSlice, setArticleCreatedState, setArticleCreatingState} from "./articlesSlice";
import articlesAPI from "../../api/articlesAPI";
import {ICreatedArticle} from "./articleTypes";

export const fetchArticles = () => async (dispatch: AppDispatch) => {
    const res = await articlesAPI.getArticles()
    dispatch(articleSlice.actions.setArticles(res.data))
}

export const fetchCurrentArticle = (id: number) => async (dispatch: AppDispatch) => {
    const res = await articlesAPI.getArticle(id)
    dispatch(articleSlice.actions.setCurrentArticle(res.data))
}

export const createArticle = (data: ICreatedArticle) => async (dispatch: AppDispatch) => {
    const res = await articlesAPI.createArticle(data)
    if (res.status === 200) {
        dispatch(setArticleCreatedState(true))
        dispatch(setArticleCreatingState(false))
    } else {
        dispatch(setArticleCreatingState(false))
        dispatch(setArticleCreatedState(false))
    }
}