import {AppDispatch} from "../store";
import {setVacancies} from "./vacanciesSlice";
import {vacanciesAPI} from "../../api/vacanciesAPI";
import {ICreatedService} from "../services/servicesTypes";
import {servicesAPI} from "../../api/servicesAPI";
import {getServices} from "../services/servicesThunks";
import {ICreatedVacancy} from "./vacanciesTypes";
import {setArticleCreatedState, setArticleCreatingState} from "../articles/articlesSlice";

export const getVacancies = () => async (dispatch: AppDispatch) => {
    const vacancies = await vacanciesAPI.getAffiliates()
    dispatch(setVacancies(vacancies))
}
export const createVacancy = (vacancy: ICreatedVacancy) => async (dispatch: AppDispatch) => {
    const res = await vacanciesAPI.createVacancy(vacancy)
    if(res.status === 200) {
        dispatch(setArticleCreatedState(true))
        dispatch(setArticleCreatingState(false))
    }
    dispatch(getVacancies())
}