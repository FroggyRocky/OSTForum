import axios from 'axios'
import {serverURL} from "./URL";
import {ICreatedArticle} from "../redux/articles/articleTypes";

const instance = axios.create({
    baseURL: serverURL,

})
const withAuthInstance = axios.create({
    baseURL: serverURL,
    headers: {
        'xxx-auth-token': `Bearer ${window.localStorage.getItem('MyClickToken')}`,
    }
})

const articlesAPI = {
    async getArticles() {
        return await instance.get(`/get-articles`)
    },
    async getArticle(id: number) {
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
}

export default articlesAPI