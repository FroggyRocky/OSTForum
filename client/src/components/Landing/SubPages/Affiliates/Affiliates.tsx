import './affiliates.scss'
import {CardWithLinkAndPrice} from "../../../../UIKit/Cards/CardsWithKeys/CardWithLinkAndPrice";
import {useAppSelector} from "../../../../redux/hooks/hooks";
import {useEffect, useState} from "react";
import {getAffiliates} from "../../../../redux/affiliates/affiliatesThunks";
import {useAppDispatch} from "../../../../redux/hooks/hooks";
import {KeysFilter} from "../../../../UIKit/KeysFilter/KeysFilter";
import {SubPagesLayout} from "../SubPagesLayout";

type Props = {};

export function Affiliates(props: Props) {
    const dispatch = useAppDispatch()
    const affiliates = useAppSelector(state => state.affiliates.affiliates)
    const keys = useAppSelector(state => state.authConfigs.configs.keys)
    const [currentFilter, setCurrentFilter] = useState([])
    const [currentFilterName, setCurrentFilterName] = useState('')
    const affiliatesComponents = affiliates.map(el => {
        if(currentFilter.length === 0) {
            return <div className={'affiliates__card'}>
                <CardWithLinkAndPrice price={el.price} key={el.id}
                                       keys={keys.filter(key => el.keyIds.includes(key.id))} cover={el.cover}
                                       header={el.header} link={el.link} description={el.description}/>
            </div>
        } else if (currentFilter.some(element => el.keyIds.includes(element))) {
            return <div className={'affiliates__card'}> <CardWithLinkAndPrice price={el.price} key={el.id}
                                       keys={keys.filter(key => el.keyIds.includes(key.id))} cover={el.cover}
                                       header={el.header} link={el.link} description={el.description}/>
            </div>
        }
    })
    useEffect(() => {
        dispatch(getAffiliates())
    }, [])
    return <SubPagesLayout page={'Affiliates'}>
        <div className={'affiliates'}>
            <KeysFilter setCurrentFilterName={setCurrentFilterName} selectedKeys={currentFilter} setFilterValue={setCurrentFilter} />
            <p className={'affiliates__chosenFilter'}>{currentFilterName}</p>
            {affiliatesComponents}
        </div>
    </SubPagesLayout>
};