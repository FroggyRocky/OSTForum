import {AppDispatch} from "../store";
import {articleSlice} from "./articlesSlice";
import articlesAPI from "../../api/articlesAPI";


export const fetchArticles = () => async (dispatch:AppDispatch) => {
    const res = await articlesAPI.getArticles()
    dispatch(articleSlice.actions.setArticles(res.data))
}

export const fetchCurrentArticle = (id:number) => async (dispatch:AppDispatch) => {
    const res = await articlesAPI.getArticle(id)
    console.log(res.data)
    dispatch(articleSlice.actions.setCurrentArticle(res.data))
}