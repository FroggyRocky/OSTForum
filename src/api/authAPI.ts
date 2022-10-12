import axios from "axios";
import {serverURL} from "./URL";
import {IUserLogin, IConfigs} from '../redux/auth/authTypes'

const instance = axios.create({
    baseURL:serverURL,
     withCredentials:true
})


export const authAPI = {
    async login(data:IUserLogin) {
       return await instance.post('/login', data)
    },
async fetchConfigs() {
      const {data} = await instance.get<IConfigs>('/configs')
    return data
},
}