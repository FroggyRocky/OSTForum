import './networking.scss'
import {CardWithRegistration} from "../../../UIKit/Cards/CardsWithKeys/CardWithRegistration";
import {useAppSelector} from "../../../redux/storeHooks/storeHooks";
import {useEffect, useState} from "react";
import {getNetworks} from "../../../redux/networking/networkingThunks";
import {useAppDispatch} from "../../../redux/storeHooks/storeHooks";
import {KeysFilter} from "../../../UIKit/KeysFilter/KeysFilter";
import {PageWithCardsFilterLayout} from "../../../UIKit/PageWithCardsFilterLayout/PageWithCardsFilterLayout";

type Props = {};

export function Networking(props: Props) {
    const dispatch = useAppDispatch()
    const networks = useAppSelector(state => state.networking.networks)
    const keys = useAppSelector(state => state.authConfigs.configs.keys.network)
    const [currentFilter, setCurrentFilter] = useState<{id:number, name:string} | undefined>(undefined)
    const [currentFilterName, setCurrentFilterName] = useState('')

    const networksComponents = networks.filter(el => {
        if (!currentFilter?.id) return true
        else if (currentFilter.id) {
            return el.keyIds.includes(currentFilter.id)
        }
    }).map(el => {
        return <div className={'networking__card'}>
            <CardWithRegistration key={el.id}
                                  keys={keys.filter(key => el.keyIds.includes(key.id))} cover={el.cover}
                                  header={el.header} link={el.link} description={el.description}/>
        </div>
    })
    useEffect(() => {
        dispatch(getNetworks())
    }, [])
    return <div className={'networking'}>
            <p className={'networking__chosenFilter'}>{currentFilterName}</p>
            {networksComponents}
        </div>

};