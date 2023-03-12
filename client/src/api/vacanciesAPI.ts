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
    async getAffiliates() {
        const vacancies = await instance.get<IVacancy[]>('/get-vacancies').then(res => res.data)
        return vacancies
    },
    async createVacancy(vacancy:ICreatedService) {
        const res = await withAuthInstance.post('/create-vacancy', vacancy)
        console.log(res)
        return res
    }
}
export {vacanciesAPI}