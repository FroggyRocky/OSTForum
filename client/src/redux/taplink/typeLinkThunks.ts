import {AppDispatch, RootState} from "../store";
import {tapLinksAPI} from "../../api/tapLinksAPI";
import {setTapLinks} from "./tapLinkSlice";
import {TapLinkType} from "./tapLinkType";

export const getTapLinks = () => async (dispatch: AppDispatch) => {
    const tapLinks = await tapLinksAPI.getTapLinks()
    dispatch(setTapLinks(tapLinks))
}
export const synchronizeTapLinks = () => async (dispatch: AppDispatch) => {
    const synchronizedTapLinks = await tapLinksAPI.synchronizeTapLinks()
    dispatch(setTapLinks(synchronizedTapLinks))
}
export const updateTapLinks = () => async (dispatch:AppDispatch, getState:() => RootState) => {
    const {tapLinks} = getState()
    await tapLinksAPI.updateTapLinks(tapLinks.tapLinks)
}
export const updateTapLinkArticle = (id:number, articleId:number) => async (dispatch:AppDispatch) => {
const updatedTapLinks = await tapLinksAPI.updateTapLinkArticle({id, articleId}).then(res => res.data)
    dispatch(setTapLinks(updatedTapLinks))
}