import './services.scss'
import {CardWithRegistration} from "../../../../UIKit/Cards/CardsWithKeys/CardWithRegistration";
import {useAppSelector} from "../../../../redux/hooks/hooks";
import {useEffect, useState} from "react";
import {getServices} from "../../../../redux/services/servicesThunks";
import {useAppDispatch} from "../../../../redux/hooks/hooks";
import {KeysFilter} from "../../../../UIKit/KeysFilter/KeysFilter";
import {SubPagesLayout} from "../SubPagesLayout";

type Props = {};

export function Services(props: Props) {
    const dispatch = useAppDispatch()
    const services = useAppSelector(state => state.services.services)
    const keys = useAppSelector(state => state.authConfigs.configs.keys)
    const [currentFilter, setCurrentFilter] = useState([])
    const [currentFilterName, setCurrentFilterName] = useState('')
    const servicesComponents = services.map(el => {
        if(currentFilter.length === 0) {
            return <div className={'services__card'}>
            <CardWithRegistration key={el.id}
                                       keys={keys.filter(key => el.keyIds.includes(key.id))} cover={el.cover}
                                       header={el.header} link={el.link} description={el.description}/>
            </div>
        } else if (currentFilter.some(element => el.keyIds.includes(element))) {
            return <div className={'services__card'}>
            <CardWithRegistration key={el.id}
                                       keys={keys.filter(key => el.keyIds.includes(key.id))} cover={el.cover}
                                       header={el.header} link={el.link} description={el.description}/>
            </div>
        }
    })
    useEffect(() => {
        dispatch(getServices())
    }, [])
    return <SubPagesLayout page={'Services'}>
        <div className={'services'}>
            <KeysFilter setCurrentFilterName={setCurrentFilterName} selectedKeys={currentFilter} setFilterValue={setCurrentFilter} />
            <p className={'services__chosenFilter'}>{currentFilterName}</p>
            {servicesComponents}
        </div>
    </SubPagesLayout>
};