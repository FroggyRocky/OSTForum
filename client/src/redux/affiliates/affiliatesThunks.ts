import {AppDispatch, RootState} from "../store";
import {affiliatesAPI} from "../../api/affiliatesAPI";
import {setAffiliates, setCurrentFilterKey} from "./affiliatesSlice";
import {ICreatedAffiliate} from "./affiliatesTypes";

export const getAffiliates = (page= 1, keyId?:number) => async (dispatch: AppDispatch, getState:() => RootState) => {
    const {affiliates, total} = await affiliatesAPI.getAffiliates(page,keyId)
    dispatch(setAffiliates({affiliates, total}))
}
export const setFilterKeyThunk = (keyData:{id:number,name:string}) => async (dispatch: AppDispatch, getState:() => RootState) => {
    dispatch(setCurrentFilterKey(keyData))
}
export const createAffiliate = (createdAffiliate:ICreatedAffiliate) =>  async (dispatch: AppDispatch, getState:() => RootState) => {
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