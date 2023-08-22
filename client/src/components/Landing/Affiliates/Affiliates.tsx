import './affiliates.scss'
import {CardWithRegistration} from "../../../UIKit/Cards/CardsWithKeys/CardWithRegistration";
import {useAppSelector} from "../../../redux/storeHooks/storeHooks";
import {useEffect, useState, useRef, useCallback} from "react";
import {getAffiliates, setFilterKeyThunk} from "../../../redux/affiliates/affiliatesThunks";
import {useAppDispatch} from "../../../redux/storeHooks/storeHooks";
import {PageWithCardsFilterLayout} from "../../../UIKit/PageWithCardsFilterLayout/PageWithCardsFilterLayout";
import {Loader} from "../../../UIKit/Loader/Loader";



export function Affiliates() {

    const dispatch = useAppDispatch()
    const affiliates = useAppSelector(state => state.affiliates.affiliates)
    const keys = useAppSelector(state => state.authConfigs.configs.keys.affiliate)
    const currentKey = useAppSelector(state => state.affiliates.currentFilterKey)
    const total = useAppSelector(state => state.affiliates.total)
    const isLoading = useAppSelector(state => state.affiliates.isLoading)
    const [hasMore, setHasMore] = useState<boolean>(true)
    const [currentPage, setCurrentPage] = useState<number>(1)
    const observer = useRef<IntersectionObserver | null>(null)
    useEffect(() => {
        if (affiliates.length < total) {
            setHasMore(true)
        } else {
            setHasMore(false)
        }
    }, [affiliates, total])

    useEffect(() => {
        dispatch(getAffiliates(currentPage, currentKey?.id ?? keys[0].id))
    }, [currentPage])
    async function handleChangeKey(key: { id: number, name: string }) {
        await dispatch(setFilterKeyThunk(key))
        setCurrentPage(1)
        if(currentPage === 1) {
            dispatch(getAffiliates(1, key.id))
        }
    }

    const setObserver = useCallback((node: any) => {
        if (isLoading) return;
        if (observer.current) observer.current.disconnect()
        observer.current = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && hasMore) {
                setCurrentPage(prev => prev + 1)
            }
        })
        if (node) {
            observer.current.observe(node)
        }
    }, [hasMore, isLoading, ])

    const affiliatesComponents = affiliates.map((el, index) => {
        if (affiliates.length - 1 === index) {
            return <div key={el.id} className={'affiliates__card'} ref={setObserver}>
                <CardWithRegistration score={el.score}
                                      keys={keys.filter(key => el.keyIds.includes(key.id))} cover={el.cover}
                                      header={el.header} link={el.link} description={el.description}/>
            </div>
        } else {
            return <div key={el.id} className={'affiliates__card'}>
                <CardWithRegistration score={el.score}
                                      keys={keys.filter(key => el.keyIds.includes(key.id))} cover={el.cover}
                                      header={el.header} link={el.link} description={el.description}/>
            </div>
        }
    })

    return <PageWithCardsFilterLayout currentKey={currentKey ?? keys[0]} setCurrentKey={handleChangeKey} keys={keys}
                                      page={'affiliates'}>
        <div className={'affiliates'}>
            {currentKey?.name && <p className={'affiliates__chosenFilter'}>{currentKey?.name}</p>}
            {isLoading ? <div className={'affiliates__loader'}>
                <Loader/>
            </div> : affiliatesComponents}
        </div>
    </PageWithCardsFilterLayout>
};
