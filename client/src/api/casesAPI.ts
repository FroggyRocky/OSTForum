import axios from 'axios'
import {serverURL} from "./URL";
import {ICase, ICreatedCase} from "../redux/cases/casesTypes";
import {ICreatedAffiliate} from "../redux/affiliates/affiliatesTypes";

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
const casesAPI = {
    async getCases() {
        const cases = await instance.get<ICase[]>('/get-cases').then(res => res.data)
        return cases
    },
    async createCase(caseData:ICreatedCase) {
        const res = await withAuthInstance.post('/create-case', caseData)
        console.log(res)
        return res
    }
}
export {casesAPI}