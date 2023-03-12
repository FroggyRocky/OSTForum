import {AppDispatch} from "../store";
import {casesAPI} from "../../api/casesAPI";
import {setCases} from "./casesSlice";
import {ICase, ICreatedCase} from "./casesTypes";
import {setArticleCreatedState, setArticleCreatingState} from "../articles/articlesSlice";
export const getCases = () => async (dispatch: AppDispatch) => {
    const cases = await casesAPI.getCases()
    dispatch(setCases(cases))
}
export const createCase = (caseDate:ICreatedCase) =>  async (dispatch: AppDispatch) => {
    const res = await casesAPI.createCase(caseDate)
    if(res.status === 200) {
        dispatch(setArticleCreatedState(true))
        dispatch(setArticleCreatingState(false))
    }
    dispatch(getCases())
}