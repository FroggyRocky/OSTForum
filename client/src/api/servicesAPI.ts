import axios from 'axios'
import {serverURL} from "./URL";
import {IService, ICreatedService} from "../redux/services/servicesTypes";
import {ICreatedNetwork} from "../redux/networking/networkingTypes";

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
const servicesAPI = {
    async getServices() {
        const services = await instance.get<IService[]>('/get-services').then(res => res.data)
        return services
    },
    async createService(service:ICreatedService) {
        const res = await withAuthInstance.post('/create-service', service)
        console.log(res)
        return res
    },
    async updateService(data:{id:number, data:ICreatedService}) {
        const res = await withAuthInstance.post('/update-service', data)
        return res
    },
     async deleteService(id:number) {
        const res = await withAuthInstance.post('/delete-service', {id:id})
         return res
     }
}
export {servicesAPI}