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
        dispatch(setArticleCreatedState(true))
        dispatch(setArticleCreatingState(false))
    }
    dispatch(getAffiliates())
}