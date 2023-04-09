import './services.scss'
import {CardWithRegistration} from "../../../UIKit/Cards/CardsWithKeys/CardWithRegistration";
import {useAppSelector} from "../../../redux/hooks/hooks";
import {useEffect, useState} from "react";
import {getServices} from "../../../redux/services/servicesThunks";
import {useAppDispatch} from "../../../redux/hooks/hooks";
import {KeysFilter} from "../../../UIKit/KeysFilter/KeysFilter";
import {PageWithCardsFilterLayout} from "../../../UIKit/PageWithCardsFilterLayout/PageWithCardsFilterLayout";

type Props = {};

export function Services(props: Props) {
    const dispatch = useAppDispatch()
    const services = useAppSelector(state => state.services.services)
    const keys = useAppSelector(state => state.authConfigs.configs.keys.service)
    const [currentFilter, setCurrentFilter] = useState<{id:number, name:string} | undefined>(undefined)
    const [currentFilterName, setCurrentFilterName] = useState('')

    const servicesComponents = services.filter(el => {
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
        dispatch(getServices())
    }, [])
    return <div className={'services'}>
            <p className={'services__chosenFilter'}>{currentFilterName}</p>
            {servicesComponents}
        </div>
};