import {useAppSelector} from "../../redux/storeHooks/storeHooks";
import './keysFilter.scss';
import {IKey} from "../../redux/auth/authConfigsTypes";
import { BsChevronDown } from "react-icons/bs";
import {useState} from "react";

type Props = {
    setFilterValue: (e: any) => void
    selectedKey: {id:number, name:string} | undefined,
    keys:IKey[]
};

export function KeysFilter(props: Props) {
    const [isDropDownOpen, setDropDownState] = useState(true)
    const keyComponents = props.keys.map(el => {
        return <div key={el.id} className={'keysFilter__list__itemContainer'} onClick={() => props.setFilterValue(el)}>
            <p className={`keysFilter__list__item ${props.selectedKey?.id === el.id && "keysFilter__list__item_active"}`}>
                {el.name}
            </p>
        </div>
    })
    return <>
    <div className={'keysFilter'}>
        <div className={'keysFilter__header'}>
        <div className={'keysFilter__clickField_mob'} onClick={() => setDropDownState(prev => !prev)}></div>
            Section
        <BsChevronDown className={'keysFilter__arrow'} />
    </div>
        <div className={`keysFilter__content ${isDropDownOpen && 'keysFilter__content_active'}`}>
            <hr className={'keysFilter__borderLine'}/>
            <div className={'keysFilter__list'}>
                {keyComponents}
            </div>
        </div>
    </div>

    </>
};