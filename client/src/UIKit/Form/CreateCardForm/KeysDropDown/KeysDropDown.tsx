import {IoChevronDownOutline} from "react-icons/io5";
import {IKey} from "../../../../redux/auth/authConfigsTypes";
import {useState} from "react";
import './keysDropDown.scss'
import { IoIosClose } from "react-icons/io";
type Props = {
    keys: IKey[]
    index: number
    valueName: string | undefined
    handleChooseKey: (key: { name: string, id: number }, index: number) => void
    handleDeleteKey:(index:number) => void
};

export function KeysDropDown(props: Props) {
    const [isDropDownOpen, setDropDownState] = useState(false)

    const keysComponents = props.keys.map(el => {
        return <div key={el.id}
                    className={`keysDropDown__key ${props.valueName === el.name && 'keysDropDown__key_active'}`}
                    onClick={() => props.handleChooseKey(el, props.index)}>
            {el.name}
        </div>
    })
    return <div className={'keysDropDown'}>
        <div className={'keysDropDown__content'}>
            <section className={'keysDropDown__currentKey'} onClick={() => setDropDownState(prev => !prev)}>
                <p>{props.valueName || 'Choose Vertical'}</p>
                <IoChevronDownOutline className={'keysDropDown__currentKey__arrow'}/>
                <IoIosClose size={20} className={'keysDropDown__currentKey__close'} onClick={() => props.handleDeleteKey(props.index)} />
            </section>
            {isDropDownOpen && <div className={'keysDropDown__dropdown'}>
                {keysComponents}
            </div>
            }
        </div>
    </div>
};