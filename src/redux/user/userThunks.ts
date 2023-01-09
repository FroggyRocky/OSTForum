import {userSlice} from "./userSlice";
import {AppDispatch} from "../store";
import {setAuthState} from "../auth/authConfigsSlice";
import {userAPI} from "../../api/userAPI";

export const fetchUser = (id: number) => async (dispatch: AppDispatch) => {

}

export const fetchAccountData = () => async (dispatch: AppDispatch) => {
    const res = await userAPI.fetchUserData()
    dispatch(userSlice.actions.setUser(res.data))
    dispatch(setAuthState(true))
}


