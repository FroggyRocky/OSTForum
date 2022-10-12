import axios from 'axios'
import {serverURL} from "./URL";
import {ICreatedArticle} from "../redux/articles/articleTypes";

const instance = axios.create({
    baseURL: serverURL,
    withCredentials:true

})
const withAuthInstance = axios.create({
    baseURL: serverURL,
    withCredentials:true,
    headers: {
        'xxx-auth-token': `Bearer ${window.localStorage.getItem('MyClickToken')}`,
    }
})

const articlesAPI = {
    async getArticles() {
        return await instance.get(`/get-articles`)
    },
    async getArticle(header:string) {
        return await instance.get(`/get-article/${header}`)
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
}

export default articlesAPI