import axios from "axios";
import {serverURL} from "./URL";

const instance = axios.create({
    baseURL:serverURL,
    withCredentials:true,
    headers: {
        'Authorization': `Bearer ${window.localStorage.getItem('MyClickToken')}`,
    }
})

export const userAPI = {
    async fetchUserData() {
        window.localStorage.getItem('MyClickToken')
        return await axios.get(`${serverURL}/get-account-data`, {
            withCredentials:true,
            headers: {
                'Authorization': `Bearer ${window.localStorage.getItem('MyClickToken')}`
            }
        })
    }
}