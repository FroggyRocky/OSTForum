import axios from 'axios'
import {serverURL} from "./URL";


const articlesAPI = {
    async getArticles() {
        return await axios.get(`${serverURL}/get-articles`)
    },
    async getArticle(id) {
        return await axios.post(`${serverURL}/get-article`, {id})
    }
}

export default articlesAPI