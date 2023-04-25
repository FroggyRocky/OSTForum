import {useAppDispatch, useAppSelector} from "../../../../../redux/storeHooks/storeHooks";
import {useEffect, useState} from "react";
import {CardWithRegistration} from "../../../../../UIKit/Cards/CardsWithKeys/CardWithRegistration";
import {CreateCardButton} from "../../../../../UIKit/Form/CreateCardForm/CreateCardButton/CreateCardButton";
import {FormikValues} from "formik";
import articlesAPI from "../../../../../api/articlesAPI";
import {CreateCardForm} from "../../../../../UIKit/Form/CreateCardForm/CreateCardForm";
import {Layout} from "../../../../../UIKit/GeneralLayout/Layout";
import {StyledContent, StyledH1, StyledWrapper} from "../../../../../UIKit/BasicStyledComponents/basicStyledComponents";
import {AddButton} from "../../../../../UIKit/Form/AddButton/AddButton";
import {getServices, deleteService, createService, updateService} from "../../../../../redux/services/servicesThunks";
import './createService.scss'
type Props = {

};

export function CreateService(props: Props) {
    const services = useAppSelector(state => state.services.services)
    const keys = useAppSelector(state => state.authConfigs.configs.keys.service)
    const [toBePublished, setComponentsToBePublished] = useState<Array<number | {id:number}>>([])
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(getServices())
    }, [])
    function deletePublishedCard(id:number) {
        dispatch(deleteService(id))
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
    const affiliatesComponents = services.map(el => {
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
            await dispatch(updateService({id:publishedCardId, data:data}))
            handleDeleteEditingCard(index)
        } else {
            await dispatch(createService(data))
            handleDeleteEditingCard(index)
        }
    }
    function handleDeleteEditingCard(index: number | {id:number}) {
        console.log(index)
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
            const found = services.find(element => element.id === el.id)
            return <div key={el.id + 'published'} className={'createService__createCardForm__item'}>
                <CreateCardForm handleDelete={handleDeleteEditingCard} publishCard={publishAffiliate} publishedCardData={found}
                                publishedCardId={el?.id && el?.id} cardIndex={el}
                                isPublished={false} keys={keys}/>
            </div>
        } else {
            return <div key={el} className={'createService__createCardForm__item'}>
                <CreateCardForm handleDelete={handleDeleteEditingCard} cardIndex={el}
                                isPublished={false} keys={keys} publishCard={publishAffiliate}/>
            </div>
        }
    })

    return <Layout>
        <StyledWrapper>
            <div className={'createService'}>
                <div className={'createService__container'}>
                    <StyledContent>
                        <StyledH1>Add Service</StyledH1>
                        <div className={'createService__content'}>
                            <div className={'createService__toBeCreated__container'}>
                                {createCardComponents}
                            </div>
                            <div className={'createService__addBtn'} onClick={handleAddClick}>
                                <AddButton targetedContent={'Service Network'} formikIsValid={true}/>
                            </div>
                            <div className={'createService__published__container'}>
                                {affiliatesComponents}
                            </div>
                        </div>
                    </StyledContent>
                </div>
            </div>
        </StyledWrapper>
    </Layout>
};