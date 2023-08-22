import './cases.scss'
import {CardWithStatistics} from "../../../UIKit/Cards/CardsWithKeys/CardWithStatistics";
import {useAppSelector} from "../../../redux/storeHooks/storeHooks";
import {useEffect, useState} from "react";
import {getCases} from "../../../redux/cases/casesThunks";
import {useAppDispatch} from "../../../redux/storeHooks/storeHooks";
import {KeysFilter} from "../../../UIKit/KeysFilter/KeysFilter";
import {PageWithCardsFilterLayout} from "../../../UIKit/PageWithCardsFilterLayout/PageWithCardsFilterLayout";
import {CardWithLinkAndPrice} from "../../../UIKit/Cards/CardsWithKeys/CardWithLinkAndPrice";

type Props = {};

export function Cases(props: Props) {
    const dispatch = useAppDispatch()
    const cases = useAppSelector(state => state.cases.cases)
    const keys = useAppSelector(state => state.authConfigs.configs.keys.case)
    const [currentFilter, setCurrentFilter] = useState<{id:number, name:string} | undefined>(undefined)
    const [currentFilterName, setCurrentFilterName] = useState('')
    const casesComponents = cases.filter(el => {
        if (!currentFilter?.id) return true
        else if (currentFilter.id) {
            return el.keyIds.includes(currentFilter.id)
        }
    }).map(el => {
        return <div className={'cases__card'}>
            <CardWithStatistics key={el.id} createdAt={el.createdAt}
                                  keys={keys.filter(key => el.keyIds.includes(key.id))} cover={el.cover}
                                  header={el.header} link={el.link} description={el.description}/>
        </div>
    })
    useEffect(() => {
        dispatch(getCases())
    }, [])
    return <div className={'cases'}>
            <p className={'cases__chosenFilter'}>{currentFilterName}</p>
            {casesComponents}
        </div>

};