import axios from "axios";
import {serverURL} from "../../api/URL";
import {userSlice} from "./userSlice";
import {AppDispatch} from "../store";
import {setAuthState} from "../auth/authSlice";

export const fetchUser = (id: number) => async (dispatch: AppDispatch) => {

}

export const fetchAccountData = () => async (dispatch: AppDispatch) => {
    let token = window.localStorage.getItem('MyClickToken')
    const res = await axios.get(`${serverURL}/get-account-data`, {
        headers: {
            'xxx-auth-token': `Bearer ${token}`
        }
    })
    dispatch(userSlice.actions.setUser(res.data))
    dispatch(setAuthState(true))
}


