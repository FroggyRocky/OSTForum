import {ModalWindow} from "../UIKit/Modals/ModalWindow";
import {ComponentType, ReactElement} from "react";
import {useAppDispatch, useAppSelector} from "../redux/storeHooks/storeHooks";
import {setCommonErr} from "../redux/auth/authConfigsSlice";

type Props = {};

export function WithError<P extends object>(Component: ComponentType<P>) {
    const ComponentWithErr = (props: P): ReactElement => {
        const err = useAppSelector(state => state.authConfigs.commonError)
        const dispatch = useAppDispatch()

        function handleClose() {
            dispatch(setCommonErr(''))
        }

        return <>
            {err ? <ModalWindow closeModal={handleClose} smallModal={false} header={`Something went wrong`}
                                text={`${err}`}/>
                : <Component {...props}  />
            }
        </>
    }
    return ComponentWithErr
};