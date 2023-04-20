import {AppDispatch} from "../store";
import {servicesAPI} from "../../api/servicesAPI";
import {setServices} from "./servicesSlice";
import {ICreatedService} from "./servicesTypes";
import {ICreatedAffiliate} from "../affiliates/affiliatesTypes";

export const getServices = () => async (dispatch: AppDispatch) => {
    const services = await servicesAPI.getServices()
    console.log(services)
    dispatch(setServices(services))
}
export const createService = (service:ICreatedService) =>  async (dispatch: AppDispatch) => {
    const res = await servicesAPI.createService(service)
    if(res.status === 200) {
        dispatch(getServices())
    }

}
export const updateService = (data: {id:number, data:ICreatedService}) =>  async (dispatch: AppDispatch) => {
    const res = await servicesAPI.updateService(data)
    if(res.status === 200) {
        dispatch(getServices())
    }
}
export const deleteService = (id:number) =>  async (dispatch: AppDispatch) => {
    const res = await servicesAPI.deleteService(id)
    if(res.status === 200) {
        dispatch(getServices())
    }
}