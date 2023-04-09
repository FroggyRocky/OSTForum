import './vacancies.scss'
import {CardWithLinkAndPrice} from "../../../UIKit/Cards/CardsWithKeys/CardWithLinkAndPrice";
import {useAppSelector} from "../../../redux/hooks/hooks";
import {useEffect, useState} from "react";
import {getVacancies} from "../../../redux/vacancies/vacanciesThunks";
import {useAppDispatch} from "../../../redux/hooks/hooks";
import {KeysFilter} from "../../../UIKit/KeysFilter/KeysFilter";
import {PageWithCardsFilterLayout} from "../../../UIKit/PageWithCardsFilterLayout/PageWithCardsFilterLayout";
import {CardWithRegistration} from "../../../UIKit/Cards/CardsWithKeys/CardWithRegistration";

type Props = {};

export function Vacancies(props: Props) {
    const dispatch = useAppDispatch()
    const vacancies = useAppSelector(state => state.vacancies.vacancies)
    const keys = useAppSelector(state => state.authConfigs.configs.keys.vacancy)
    const [currentFilter, setCurrentFilter] = useState<{id:number, name:string} | undefined>(undefined)
    const [currentFilterName, setCurrentFilterName] = useState('')

    const vacanciesComponents = vacancies.filter(el => {
        if (!currentFilter?.id) return true
        else if (currentFilter.id) {
            return el.keyIds.includes(currentFilter.id)
        }
    }).map(el => {
        return <div className={'services__card'}>
            <CardWithRegistration key={el.id}
                                  keys={keys.filter(key => el.keyIds.includes(key.id))} cover={el.cover}
                                  header={el.header} link={el.link} description={el.description}/>
        </div>
    })

    useEffect(() => {
        dispatch(getVacancies())
    }, [])
    return <div className={'vacancies'}>
            <p className={'vacancies__chosenFilter'}>{currentFilterName}</p>
            {vacanciesComponents}
        </div>
};