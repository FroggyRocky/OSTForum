import axios from "axios";
import {serverURL} from "./URL";

const instance = axios.create({
    baseURL: serverURL,
    withCredentials: true

})

const searchAPI = {
    async searchArticles(query:string, page:number) {
        return await instance.get(`/search/articles?q=${query}&page=${page}`)
    }
}


export {searchAPI}