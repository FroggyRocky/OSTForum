import {useEffect, useState} from "react";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import './DropDownField.scss'
type Props = {
options:Array<{id:number, name:string}>
setOption:(option:{id:number,name:string}) => void
    currentOption:{id:number, name:string} | undefined
};

export function DropDownField(props: Props) {
    const [isDropDownOpen, setDropDownState] = useState(false)

    const optionsComponents = props.options.map(el => {
        return <div key={el.id} onClick={() => {setDropDownState(false);props.setOption(el)}} className={`dropDownField__dropdown__optionContainer ${props.currentOption?.id === el.id && 'dropDownField__dropdown__optionContainer_active' }`}>
            <p className={'dropDownField__dropdown__optionContent'}>{el.name}</p>
        </div>
    })
    return <div className={'dropDownField'}>
    <div className={'dropDownField__container'} onClick={() => setDropDownState(prev => !prev)}>
        <main className={'dropDownField__content'}>
<p className={'dropDownField__placeholder'}>{props.currentOption ? props.currentOption.name : 'Choose Type Of Content'}</p>
            <MdOutlineArrowForwardIos className={`dropDownField__arrow ${isDropDownOpen && 'dropDownField__arrow_active'}`} />
        </main>

    </div>
        {isDropDownOpen &&  <div className={'dropDownField__dropdown'}>
            <main className={'dropDownField__dropdown__content'}>
                {optionsComponents}
            </main>
        </div>}
    </div>
};