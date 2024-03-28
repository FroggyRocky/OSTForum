import './commonInput.scss'
import {useField, ErrorMessage} from "formik";

type Props = {
    name: string,
    placeholder: string,
    inputFieldColor?: string,
    handleChange: (e: any) => void,
    phoneCode?: string
    handleBlur?: () => void
    type?:string
    value:any

}

export function CommonInput(props: Props) {


    return <>
        <div className={'commonInput'}
             style={{backgroundColor: props.inputFieldColor ? props.inputFieldColor : 'transparent'}}>
            <main className={'commonInput__content'} >
                {props.phoneCode ? <div className={'commonInput__phoneContainer'}>
                        <span className={'commonInput__phoneCode'}>{props.phoneCode} -</span>
                        <input className={'commonInput__input'}
                               type={props?.type ? props.type : 'text'}
                               placeholder={props.placeholder}
                               autoComplete='off'
                               value={props.value}
                               onChange={props.handleChange}
                        />
                    </div>
                    :
                    <input className={'commonInput__input'}
                           type={props?.type ? props.type : 'text'}
                           placeholder={props.placeholder}
                           autoComplete='off'
                           onChange={props.handleChange}
                           value={props.value}
                    />
                }
            </main>

        </div>
    </>
}