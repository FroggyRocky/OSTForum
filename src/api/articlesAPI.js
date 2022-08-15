import axios from 'axios'
import {serverURL} from "./URL";


const articlesAPI = {
    async getArticles() {
        return await axios.get(`${serverURL}/get-articles`)
    },
    async getArticle(id) {
        return await axios.post(`${serverURL}/get-article`, {id})
    },
    async uploadImage(image) {
        const token = window.localStorage.getItem('MyClickToken')
        return axios.post(`${serverURL}/s3-upload`, image, {
            headers: {
                'xxx-auth-token':`Bearer ${token}`,
                'Content-Type':'multipart/form-data'
            }
        })
    },
    async createArticle(data) {
        const token = window.localStorage.getItem('MyClickToken')
        return axios.post(`${serverURL}/create-article`, data, {
            headers: {
                'xxx-auth-token':`Bearer ${token}`,
                'Content-Type':'multipart/form-data'
            }
        })
    }
}

export default articlesAPI