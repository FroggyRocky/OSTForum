import axios from 'axios'
import {serverURL} from "./URL";
import {ICreatedArticle, IEditingArticle, IUpdateArticle} from "../redux/articles/articleTypes";
import {IAffiliate, ICreatedAffiliate} from "../redux/affiliates/affiliatesTypes";

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
const affiliatesAPI = {
    async getAffiliates() {
        const affiliates = await instance.get<IAffiliate[]>('/get-affiliates').then(res => res.data)
        return affiliates
    },
    async createAffiliates(affiliate:ICreatedAffiliate) {
        const res = await withAuthInstance.post('/create-affiliate', affiliate)
        return res
    },
    async deleteAffiliate(id:number) {
        const res = await withAuthInstance.post('/delete-affiliate', {id:id})
        return res
    },
    async updatePublishedAffiliate(data:{id:number, data:ICreatedAffiliate}) {
        const res = await  withAuthInstance.post('/update-affiliate', {...data})
        return res
    }
}
export {affiliatesAPI}