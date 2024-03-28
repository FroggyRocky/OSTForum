import {AppDispatch} from "../store";
import {affiliatesAPI} from "../../api/affiliatesAPI";
import {setAffiliates} from "./affiliatesSlice";
import {ICreatedAffiliate} from "./affiliatesTypes";
import {setArticleCreatedState, setArticleCreatingState} from "../articles/articlesSlice";

export const getAffiliates = () => async (dispatch: AppDispatch) => {
    const affiliates = await affiliatesAPI.getAffiliates()
    dispatch(setAffiliates(affiliates))
}
export const createAffiliate = (createdAffiliate:ICreatedAffiliate) =>  async (dispatch: AppDispatch) => {
    const res = await affiliatesAPI.createAffiliates(createdAffiliate)
    if(res.status === 200) {
        dispatch(getAffiliates())
    }
}
export const deleteAffiliate = (id:number) =>  async (dispatch: AppDispatch) => {
    const res = await affiliatesAPI.deleteAffiliate(id)
    if(res.status === 200) {
        dispatch(getAffiliates())
    }
}
export const updateAffiliate = (data:{id:number, data:ICreatedAffiliate}) =>  async (dispatch: AppDispatch) => {
    const res = await affiliatesAPI.updatePublishedAffiliate(data)
    if(res.status === 200) {
        dispatch(getAffiliates())
    }
}