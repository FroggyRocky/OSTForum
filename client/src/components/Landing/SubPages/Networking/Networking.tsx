import './networking.scss'
import {CardWithRegistration} from "../../../../UIKit/Cards/CardsWithKeys/CardWithRegistration";
import {useAppSelector} from "../../../../redux/hooks/hooks";
import {useEffect, useState} from "react";
import {getNetworks} from "../../../../redux/networking/networkingThunks";
import {useAppDispatch} from "../../../../redux/hooks/hooks";
import {KeysFilter} from "../../../../UIKit/KeysFilter/KeysFilter";
import {SubPagesLayout} from "../SubPagesLayout";

type Props = {};

export function Networking(props: Props) {
    const dispatch = useAppDispatch()
    const networks = useAppSelector(state => state.networking.networks)
    const keys = useAppSelector(state => state.authConfigs.configs.keys)
    const [currentFilter, setCurrentFilter] = useState([])
    const [currentFilterName, setCurrentFilterName] = useState('')
    const networksComponents = networks.map(el => {
        if (currentFilter.length === 0) {
            return <div className={'networking__card'}>
                <CardWithRegistration key={el.id}
                                         keys={keys.filter(key => el.keyIds.includes(key.id))} cover={el.cover}
                                         header={el.header} link={el.link} description={el.description}/>
            </div>
        } else if (currentFilter.some(element => el.keyIds.includes(element))) {
            return <div className={'networking__card'}>
            <CardWithRegistration key={el.id}
                                         keys={keys.filter(key => el.keyIds.includes(key.id))} cover={el.cover}
                                         header={el.header} link={el.link} description={el.description}/>
            </div>
        }
    })
    useEffect(() => {
        dispatch(getNetworks())
    }, [])
    return <SubPagesLayout page={'Networking'}>
        <div className={'networking'}>
            <KeysFilter setCurrentFilterName={setCurrentFilterName} selectedKeys={currentFilter}
                        setFilterValue={setCurrentFilter}/>
            <p className={'networking__chosenFilter'}>{currentFilterName}</p>
            {networksComponents}
        </div>
    </SubPagesLayout>
};