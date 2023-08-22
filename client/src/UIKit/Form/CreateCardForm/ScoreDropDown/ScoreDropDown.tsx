import { IoChevronDownOutline } from "react-icons/io5";
import './scoreDropDown.scss'
import {useState} from "react";

type Props = {
    scoreValue:number
    handleChooseScore:(scoreNum:number) => void
};

export function ScoreDropDown(props: Props) {
    const [isDropDownOpen, setDropDownState] = useState(false)
const indicators = [1,2,3,4,5,6,7,8,9,10].map((el, index) => {
    return   <div key={index} className={'scoreDropDown__dropdown__range__indicatorContainer'} onClick={() => props.handleChooseScore(index)}>
    <div  className={`scoreDropDown__dropdown__range__indicator ${props.scoreValue === index && 'scoreDropDown__dropdown__range__indicator_active'}`} onClick={() => props.handleChooseScore(index)}></div>
</div>
})

    return <div className={'scoreDropDown'}>
        <div className={'scoreDropDown__value'} onClick={() => setDropDownState(prev => !prev)}>
            <p>Score: {props.scoreValue}/10</p>
            <IoChevronDownOutline  className={'scoreDropDown__arrow'} />
        </div>
        {isDropDownOpen &&  <div className={'scoreDropDown__dropdown'}>
            <main className={'scoreDropDown__dropdown__content'}>
            <div className={'scoreDropDown__dropdown__range'}>
                {indicators}
            </div>
                <div className={'scoreDropDown__dropdown__rangeValue'}>
                    {props.scoreValue}
                </div>
            </main>
        </div>
        }
    </div>
};