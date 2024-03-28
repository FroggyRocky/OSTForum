import {Layout} from "../../../../../UIKit/GeneralLayout/Layout";
import {StyledH1, StyledWrapper, StyledContent} from "../../../../../UIKit/BasicStyledComponents/basicStyledComponents";
import {AddButton} from "../../../../../UIKit/Form/AddButton/AddButton";
import {CardWithRegistration} from "../../../../../UIKit/Cards/CardsWithKeys/CardWithRegistration";
import {useEffect, useState} from "react";
import {useAppSelector, useAppDispatch} from "../../../../../redux/hooks/hooks";
import {
    getAffiliates,
    createAffiliate,
    deleteAffiliate,
    updateAffiliate
} from "../../../../../redux/affiliates/affiliatesThunks";
import {CreateCardForm} from "../../../../../UIKit/Form/CreateCardForm/CreateCardForm";
import './createAffiliate.scss'
import {FormikValues} from "formik";
import articlesAPI from "../../../../../api/articlesAPI";
import {CreateCardButton} from "../../../../../UIKit/Form/CreateCardForm/CreateCardButton/CreateCardButton";

export function CreateAffiliate() {
    const affiliates = useAppSelector(state => state.affiliates.affiliates)
    const keys = useAppSelector(state => state.authConfigs.configs.keys.affiliate)
    const [toBePublished, setComponentsToBePublished] = useState<Array<number | {id:number}>>([])
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(getAffiliates())
    }, [])
    function deletePublishedCard(id:number) {
        dispatch(deleteAffiliate(id))
    }
    function toEditPublishedCard(id:number) {
        const found = toBePublished.find(el => {
            if(typeof el !== 'number') {
                return el.id === id
            }
        })
        if(found) return;
        setComponentsToBePublished(prev => [...prev, {id:id}])
    }
    const affiliatesComponents = affiliates.map(el => {
        return <div key={el.id} className={'createAffiliate__published__item'}>
            <CardWithRegistration keys={keys.filter(key => el.keyIds.includes(key.id))} link={el.link}
                                  description={el.description} header={el.header} cover={el.cover} score={el.score}/>
            <div className={'createAffiliate__published__itemBtn'}>
            <CreateCardButton handleEdit={() => toEditPublishedCard(el.id)} handleDelete={() => deletePublishedCard(el.id)} isPublished={true} handleSubmit={() => {}} />
            </div>
            </div>
    }).reverse()

    function handleAddClick() {
        if (toBePublished.length === 0) {
            setComponentsToBePublished([1])
        } else {
            const last = toBePublished[toBePublished.length - 1]
            setComponentsToBePublished(prev => [...prev, +last! + 1])
        }
    }

    async function publishAffiliate(formikData: FormikValues, index:number | {id:number}) {
        const {header, description, coverImg, keyIds, link, score, publishedCardId} = formikData
        const keys = keyIds.flatMap((el: [string, number]) => el[0]).filter((el: number, index: number, array: number[]) => array.indexOf(el) === index)
        const data = {
            header,
            description,
            cover: '',
            link,
            keyIds: keys,
            score,
        }
        if(coverImg.file) {
            const fd = new FormData()
            await fd.append('file', coverImg.file)
            const s3 = await articlesAPI.uploadImage(fd)
            data.cover = s3.data
        } else if(!coverImg.file && coverImg.src) { // if we're editing published card
            data.cover = coverImg.src
        }
        if(publishedCardId) {
            await dispatch(updateAffiliate({id:publishedCardId, data:data}))
            handleDeleteEditingCard(index)
        } else {
            await dispatch(createAffiliate(data))
            handleDeleteEditingCard(index)
        }
    }
    function handleDeleteEditingCard(index: number | {id:number}) {
        let updated;
        if(typeof index !== 'number') {
            updated = [...toBePublished].filter(el => {
                if(typeof el !== 'number') {
                    return el.id !== index.id
                } else {
                    return true
                }
            })
        } else {
            updated = [...toBePublished].filter(el => el !== index)
        }
        setComponentsToBePublished(updated)
    }
    const createCardComponents = toBePublished.map((el, index) => {
        if (typeof el !== 'number') {
            const found = affiliates.find(element => element.id === el.id)
            return <div key={el.id + 'published'} className={'createAffiliate__createCardForm__item'}>
                <CreateCardForm handleDelete={handleDeleteEditingCard} publishCard={publishAffiliate} publishedCardData={found}
                                publishedCardId={el?.id && el?.id} cardIndex={el}
                                isPublished={false} keys={keys}/>
            </div>
        } else {
            return <div key={el} className={'createAffiliate__createCardForm__item'}>
                <CreateCardForm handleDelete={handleDeleteEditingCard} cardIndex={el}
                                isPublished={false} keys={keys} publishCard={publishAffiliate}/>
            </div>
        }
    })

    return <Layout>
        <StyledWrapper>
            <div className={'createAffiliate'}>
                <div className={'createAffiliate__container'}>
                    <StyledContent>
                        <StyledH1>Add Affiliate Networks</StyledH1>
                        <div className={'createAffiliate__content'}>
                            <div className={'createAffiliate__toBeCreated__container'}>
                                {createCardComponents}
                            </div>
                            <div className={'createAffiliate__addBtn'} onClick={handleAddClick}>
                                <AddButton targetedContent={'Affiliate Network'} formikIsValid={true}/>
                            </div>
                            <div className={'createAffiliate__published__container'}>
                                {affiliatesComponents}
                            </div>
                        </div>
                    </StyledContent>
                </div>
            </div>
        </StyledWrapper>
    </Layout>
};