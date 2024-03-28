import axios from 'axios'
import {serverURL} from "./URL";
import {ICreatedArticle, IEditingArticle, IUpdateArticle} from "../redux/articles/articleTypes";

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

const articlesAPI = {
    async getArticles(page:number) {
        return await instance.get(`/get-articles?page=${page}`)
    },
    async getArticle(id:number) {
        return await instance.get(`/get-article/${id}`)
    },
    async uploadImage(image: FormData) {
        return withAuthInstance.post(`/s3-upload`, image, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    },
    async createArticle(data: ICreatedArticle) {
        return withAuthInstance.post(`/create-article`, data)
    },
    async updateArticle(data:IUpdateArticle) {
        return withAuthInstance.put(`/update-article`, data)
    }
}

export default articlesAPI