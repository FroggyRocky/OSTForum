import {AppDispatch} from "../store";
import {articleSlice, setArticleCreatedState, setArticleCreatingState, setCommonErr} from "./articlesSlice";
import articlesAPI from "../../api/articlesAPI";
import {ICreatedArticle} from "./articleTypes";

export const fetchArticles = () => async (dispatch: AppDispatch) => {
    const res = await articlesAPI.getArticles()
    dispatch(articleSlice.actions.setArticles(res.data))
}

export const fetchCurrentArticle = (header:string) => async (dispatch: AppDispatch) => {
    const res = await articlesAPI.getArticle(header)
    dispatch(articleSlice.actions.setCurrentArticle(res.data))
}

export const createArticle = (data: ICreatedArticle) => async (dispatch: AppDispatch) => {
    const res = await articlesAPI.createArticle(data)
    if (res.status === 200) {
        dispatch(setArticleCreatedState(true))
        dispatch(setArticleCreatingState(false))
    } else {
        dispatch(setArticleCreatingState(false))
        dispatch(setCommonErr('Something went wrong, try again later'))
    }
}

