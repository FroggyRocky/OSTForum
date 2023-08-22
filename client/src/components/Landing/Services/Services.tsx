import './services.scss'
import {CardWithRegistration} from "../../../UIKit/Cards/CardsWithKeys/CardWithRegistration";
import {useAppSelector} from "../../../redux/storeHooks/storeHooks";
import {useEffect, useState} from "react";
import {useAppDispatch} from "../../../redux/storeHooks/storeHooks";
import {PageWithCardsFilterLayout} from "../../../UIKit/PageWithCardsFilterLayout/PageWithCardsFilterLayout";
import {getAffiliates} from "../../../redux/affiliates/affiliatesThunks";
import {getServices} from "../../../redux/services/servicesThunks";

type Props = {};

export function Services(props: Props) {
    const dispatch = useAppDispatch()
    const services = useAppSelector(state => state.services.services)
    const keys = useAppSelector(state => state.authConfigs.configs.keys.service)
    const [currentKey, setCurrentKey] = useState<{id:number, name:string}>(keys[0])
    const serviceComponents = services.filter(el => {
        if (!currentKey?.id) return true
        else if (currentKey.id) {
            return el.keyIds.includes(currentKey.id)
        }
    }).map(el => {
        return <div key={el.id} className={'services__card'}>
            <CardWithRegistration  score={el.score}
                                   keys={keys.filter(key => el.keyIds.includes(key.id))} cover={el.cover}
                                   header={el.header} link={el.link} description={el.description}/>
        </div>
    })

    useEffect(() => {
        dispatch(getServices())
    }, [])
    return <PageWithCardsFilterLayout currentKey={currentKey} setCurrentKey={setCurrentKey} keys={keys} page={'services'}>
        <div className={'services'}>
            {currentKey?.name &&   <p className={'services__chosenFilter'}>{currentKey?.name}</p>}
            {serviceComponents}
        </div>
    </PageWithCardsFilterLayout>
};