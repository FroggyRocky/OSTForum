import axios from 'axios'
import {serverURL} from "./URL";
import {IVacancy, ICreatedVacancy} from "../redux/vacancies/vacanciesTypes";
import {ICreatedService} from "../redux/services/servicesTypes";


const instance = axios.create({
    baseURL: serverURL,
    withCredentials:true

})
const withAuthInstance = axios.create({
    baseURL: serverURL,
    withCredentials:true,
    headers: {
        'Authorization': `Bearer ${window.localStorage.getItem('MyClickToken')}`,
    }
})
const vacanciesAPI = {
    async getVacancies() {
        const vacancies = await instance.get<IVacancy[]>('/get-vacancies').then(res => res.data)
        return vacancies
    },
    async createVacancy(vacancy:ICreatedVacancy) {
        const res = await withAuthInstance.post('/create-vacancy', vacancy)
        return res
    },
    async deleteVacancy(id:number) {
        const res = await withAuthInstance.post('/delete-vacancy', {id:id})
        return res
    },
    async updateVacancy(data:{id:number, data:ICreatedVacancy}) {
        const res = await withAuthInstance.post('/update-vacancy', data)
        return res
    },
}
export {vacanciesAPI}