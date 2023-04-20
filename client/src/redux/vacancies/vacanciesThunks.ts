import {AppDispatch} from "../store";
import {setVacancies} from "./vacanciesSlice";
import {vacanciesAPI} from "../../api/vacanciesAPI";
import {ICreatedVacancy} from "./vacanciesTypes";

export const getVacancies = () => async (dispatch: AppDispatch) => {
    const vacancies = await vacanciesAPI.getVacancies()
    dispatch(setVacancies(vacancies))
}
export const createVacancy = (vacancy: ICreatedVacancy) => async (dispatch: AppDispatch) => {
    const res = await vacanciesAPI.createVacancy(vacancy)
    if(res.status === 200) {
        dispatch(getVacancies())
    }
}
export const deleteVacancy = (id: number) => async (dispatch: AppDispatch) => {
    const res = await vacanciesAPI.deleteVacancy(id)
    if(res.status === 200) {
        dispatch(getVacancies())
    }
}
export const updateVacancy = (data: {id:number, data:ICreatedVacancy}) => async (dispatch: AppDispatch) => {
    const res = await vacanciesAPI.updateVacancy(data)
    if(res.status === 200) {
        dispatch(getVacancies())
    }
}
