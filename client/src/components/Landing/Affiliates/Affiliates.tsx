import './affiliates.scss'
import {CardWithRegistration} from "../../../UIKit/Cards/CardsWithKeys/CardWithRegistration";
import {useAppSelector} from "../../../redux/hooks/hooks";
import {useEffect, useState} from "react";
import {getAffiliates} from "../../../redux/affiliates/affiliatesThunks";
import {useAppDispatch} from "../../../redux/hooks/hooks";
import {PageWithCardsFilterLayout} from "../../../UIKit/PageWithCardsFilterLayout/PageWithCardsFilterLayout";

const CARD_PER_PAGE = 5

type Props = {};

export function Affiliates(props: Props) {
    const dispatch = useAppDispatch()
    const affiliates = useAppSelector(state => state.affiliates.affiliates)
    const keys = useAppSelector(state => state.authConfigs.configs.keys.affiliate)
    const [currentKey, setCurrentKey] = useState<{id:number, name:string}>(keys[0])

    const affiliatesComponents = affiliates.filter(el => {
        if (!currentKey?.id) return true
        else if (currentKey.id) {
            return el.keyIds.includes(currentKey.id)
        }
    }).map(el => {
        return <div key={el.id} className={'affiliates__card'}>
            <CardWithRegistration  score={el.score}
                                  keys={keys.filter(key => el.keyIds.includes(key.id))} cover={el.cover}
                                  header={el.header} link={el.link} description={el.description}/>
        </div>
    })

    useEffect(() => {
        dispatch(getAffiliates())
    }, [])
    return <PageWithCardsFilterLayout currentKey={currentKey} setCurrentKey={setCurrentKey} keys={keys} page={'affiliates'}>
        <div className={'affiliates'}>
            {currentKey?.name &&   <p className={'affiliates__chosenFilter'}>{currentKey?.name}</p>}
               {affiliatesComponents}
        </div>
    </PageWithCardsFilterLayout>
};