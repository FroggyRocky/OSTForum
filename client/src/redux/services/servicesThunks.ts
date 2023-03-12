import {AppDispatch} from "../store";
import {servicesAPI} from "../../api/servicesAPI";
import {setServices} from "./servicesSlice";
import {ICreatedService} from "./servicesTypes";
import {setArticleCreatedState, setArticleCreatingState} from "../articles/articlesSlice";

export const getServices = () => async (dispatch: AppDispatch) => {
    const services = await servicesAPI.getServices()
    console.log(services)
    dispatch(setServices(services))
}
export const createService = (service:ICreatedService) =>  async (dispatch: AppDispatch) => {
    const res = await servicesAPI.createService(service)
    if(res.status === 200) {
        dispatch(setArticleCreatedState(true))
        dispatch(setArticleCreatingState(false))
    }
    dispatch(getServices())
}