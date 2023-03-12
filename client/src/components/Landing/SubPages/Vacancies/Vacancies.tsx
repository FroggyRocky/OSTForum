import './vacancies.scss'
import {CardWithLinkAndPrice} from "../../../../UIKit/Cards/CardsWithKeys/CardWithLinkAndPrice";
import {useAppSelector} from "../../../../redux/hooks/hooks";
import {useEffect, useState} from "react";
import {getVacancies} from "../../../../redux/vacancies/vacanciesThunks";
import {useAppDispatch} from "../../../../redux/hooks/hooks";
import {KeysFilter} from "../../../../UIKit/KeysFilter/KeysFilter";
import {SubPagesLayout} from "../SubPagesLayout";

type Props = {};

export function Vacancies(props: Props) {
    const dispatch = useAppDispatch()
    const vacancies = useAppSelector(state => state.vacancies.vacancies)
    const keys = useAppSelector(state => state.authConfigs.configs.keys)
    const [currentFilter, setCurrentFilter] = useState([])
    const [currentFilterName, setCurrentFilterName] = useState('')
    const vacanciesComponents = vacancies.map(el => {
        if(currentFilter.length === 0) {
            return <div  className={'vacancies__card'}>
            <CardWithLinkAndPrice price={el.price} key={el.id}
                                       keys={keys.filter(key => el.keyIds.includes(key.id))} cover={el.cover}
                                       header={el.header} link={el.link} description={el.description}/>
            </div>
        } else if (currentFilter.some(element => el.keyIds.includes(element))) {
            return <div className={'vacancies__card'}>
            <CardWithLinkAndPrice price={el.price}  key={el.id}
                                       keys={keys.filter(key => el.keyIds.includes(key.id))} cover={el.cover}
                                       header={el.header} link={el.link} description={el.description}/>
            </div>
        }
    })
    useEffect(() => {
        dispatch(getVacancies())
    }, [])
    return <SubPagesLayout page={'Vacancies'}>
        <div className={'vacancies'}>
            <KeysFilter setCurrentFilterName={setCurrentFilterName} selectedKeys={currentFilter} setFilterValue={setCurrentFilter} />
            <p className={'vacancies__chosenFilter'}>{currentFilterName}</p>
            {vacanciesComponents}
        </div>
    </SubPagesLayout>
};