import './cases.scss'
import {CardWithStatistics} from "../../../../UIKit/Cards/CardsWithKeys/CardWithStatistics";
import {useAppSelector} from "../../../../redux/hooks/hooks";
import {useEffect, useState} from "react";
import {getCases} from "../../../../redux/cases/casesThunks";
import {useAppDispatch} from "../../../../redux/hooks/hooks";
import {KeysFilter} from "../../../../UIKit/KeysFilter/KeysFilter";
import {SubPagesLayout} from "../SubPagesLayout";

type Props = {};

export function Cases(props: Props) {
    const dispatch = useAppDispatch()
    const cases = useAppSelector(state => state.cases.cases)
    const keys = useAppSelector(state => state.authConfigs.configs.keys)
    const [currentFilter, setCurrentFilter] = useState([])
    const [currentFilterName, setCurrentFilterName] = useState('')
    const casesComponents = cases.map(el => {
        if (currentFilter.length === 0) {
            return <div className={'cases__card'}>
                <CardWithStatistics link={el.link} createdAt={el.createdAt} key={el.id}
                                    keys={keys.filter(key => el.keyIds.includes(key.id))} cover={el.cover}
                                    header={el.header} description={el.description}/>
            </div>
        } else if (currentFilter.some(element => el.keyIds.includes(element))) {
            return <div className={'cases__card'}>
                <CardWithStatistics link={el.link} createdAt={el.createdAt} key={el.id}
                                       keys={keys.filter(key => el.keyIds.includes(key.id))} cover={el.cover}
                                       header={el.header} description={el.description}/>
            </div>
        }
    })
    useEffect(() => {
        dispatch(getCases())
    }, [])
    return <SubPagesLayout page={'Cases'}>
        <div className={'cases'}>
            <KeysFilter setCurrentFilterName={setCurrentFilterName} selectedKeys={currentFilter}
                        setFilterValue={setCurrentFilter}/>
            <p className={'cases__chosenFilter'}>{currentFilterName}</p>
            {casesComponents}
        </div>
    </SubPagesLayout>
};