import axios from 'axios'
import {serverURL} from "./URL";
import {INetwork, ICreatedNetwork} from "../redux/networking/networkingTypes";
import {ICreatedCase} from "../redux/cases/casesTypes";

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
const networkingAPI = {
    async getNetworks() {
        const networks = await instance.get<INetwork[]>('/get-networks').then(res => res.data)
        return networks
    },
    async createNetwork(network:ICreatedNetwork) {
        const res = await withAuthInstance.post('/create-network', network)
        console.log(res)
        return res
    }
}
export {networkingAPI}