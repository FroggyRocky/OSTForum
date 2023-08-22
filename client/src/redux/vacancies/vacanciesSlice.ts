import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IVacancy} from "./vacanciesTypes";


const initialState = {
    vacancies:[] as IVacancy[]
}


export const vacanciesSlice = createSlice({
    name: 'vacancies',
    initialState,
    reducers: {
        setVacancies(state, action: PayloadAction<IVacancy[]>) {
            state.vacancies = action.payload
        }
    }
})

export const {setVacancies} = vacanciesSlice.actions