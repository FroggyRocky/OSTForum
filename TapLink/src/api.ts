import axios from 'axios'
import {serverURL} from "../URL";

const instance = axios.create({
    baseURL:serverURL,
})
const withAuthInstance = axios.create({
    baseURL: serverURL,
    headers: {
        'Authorization': `Bearer ${window.localStorage.getItem('myClickToken')}`,
    }
})
export {withAuthInstance, instance}