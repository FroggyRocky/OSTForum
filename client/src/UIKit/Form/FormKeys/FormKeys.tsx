import {IKey} from "../../../redux/auth/authConfigsTypes";
import { AiOutlineCloseSquare } from "react-icons/ai";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import './formKeys.scss'
import {useState} from "react";
type Props = {
keys:IKey[]
    chosenKeys:IKey[]
    setChosenKeys: (key:IKey) => void
    deleteChosenKey:(key:IKey) => void
};

export function FormKeys(props: Props) {
    const [isDropDownOpen, setDropDownState] = useState(false)
    function handleFiledClick(e:any, el:IKey) {
        e.stopPropagation()
            props.deleteChosenKey(el)
    }

    const keysComponents = props.keys.filter(el => !props.chosenKeys.some(key => key.id === el.id)).map(el => {
        return <div key={el.id} onClick={() => props.setChosenKeys(el)}  className={"formKeys__dropdown__keyContainer"}>
            <div className={"formKeys__dropdown__key"}>
                {el.name}
            </div>
        </div>
    })
    const chosenKeysComponents = props.chosenKeys.map(el => {
        return <div key={el.id} className={'formKeys__chosenKey'}>
            <p>{el.name}</p><AiOutlineCloseSquare className={'formKeys__chosenKey__deleteIcon'} style={{cursor:'pointer'}} onClick={(e) => handleFiledClick(e, el)} />,&nbsp;
        </div>
    })
    return <div className={'formKeys'}>
        <div className={'formKeys__container'} onClick={() => setDropDownState(prev => !prev)}>
        <main className={'formKeys__content'}>
            <div className={'formKeys__chosenKeys'}>
                {props.chosenKeys.length !== 0 ? chosenKeysComponents : 'Choose Suitable Keys'}
            </div>
            <MdOutlineArrowForwardIos className={`formKeys__arrow ${isDropDownOpen && 'formKeys__arrow_active'}`} />
        </main>
        </div>
        {isDropDownOpen && <div className={'formKeys__dropdown'}>
            {keysComponents}
        </div>
        }
    </div>
};