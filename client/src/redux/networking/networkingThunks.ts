import {AppDispatch} from "../store";
import {setNetworks} from "./networkingSlice";
import {networkingAPI} from "../../api/networkingAPI";
import {ICreatedNetwork} from "./networkingTypes";
import {setArticleCreatedState, setArticleCreatingState} from "../articles/articlesSlice";


export const getNetworks = () => async (dispatch: AppDispatch) => {
    const networks = await networkingAPI.getNetworks()
    dispatch(setNetworks(networks))
}
export const createNetwork = (network:ICreatedNetwork) =>  async (dispatch: AppDispatch) => {
    const res = await networkingAPI.createNetwork(network)
    if(res.status === 200) {
        dispatch(setArticleCreatedState(true))
        dispatch(setArticleCreatingState(false))
    }
    dispatch(getNetworks())
}