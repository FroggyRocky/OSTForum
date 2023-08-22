import {useAppDispatch, useAppSelector} from "../../../../../redux/storeHooks/storeHooks";
import {useEffect, useState} from "react";
import {FormikValues} from "formik";
import articlesAPI from "../../../../../api/articlesAPI";
import {Layout} from "../../../../../UIKit/GeneralLayout/Layout";
import {StyledContent, StyledH1, StyledWrapper} from "../../../../../UIKit/BasicStyledComponents/basicStyledComponents";
import {AddButton} from "../../../../../UIKit/Form/AddButton/AddButton";
import {VacancyCard} from "../../../../../UIKit/Cards/CardsWithKeys/VacancyCard";
import {CreateVacancyCardForm} from "../../../../../UIKit/Form/CreateVacancyCardForm/CreateVacancyCardForm";
import {createVacancy, deleteVacancy, getVacancies, updateVacancy} from "../../../../../redux/vacancies/vacanciesThunks";
import {ICreatedVacancy} from "../../../../../redux/vacancies/vacanciesTypes";
import {CreateCardButton} from "../../../../../UIKit/Form/CreateCardForm/CreateCardButton/CreateCardButton";
import './createVacancy.scss'
type Props = {};

export function CreateVacancy(props: Props) {
    const vacancies = useAppSelector(state => state.vacancies.vacancies)
    const keys = useAppSelector(state => state.authConfigs.configs.keys.vacancy)
    const [toBePublished, setComponentsToBePublished] = useState<Array<number | {id:number}>>([])
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(getVacancies())
    }, [])

    const vacancyComponents = vacancies.map(el => {
        return <div key={el.id} className={'createAffiliate__published__item'}>
            <VacancyCard keys={keys.filter(key => el.keyIds.includes(key.id))} company={el.company}
                         createdAt={el.createdAt} data={el.data}
                         description={el.description} header={el.header} cover={el.cover}/>
            <div className={'createVacancy__published__itemBtn'}>
                <CreateCardButton handleEdit={() => toEditPublishedCard(el.id)} handleSubmit={() => {}} isPublished={true} handleDelete={() => deletePublishedCard(el.id)} />
            </div>
        </div>
    }).reverse()
    function deletePublishedCard(id:number) {
        dispatch(deleteVacancy(id))
    }
    function handleAddClick() {
        if (toBePublished.length === 0) {
            setComponentsToBePublished([1])
        } else {
            const last = toBePublished[toBePublished.length - 1]
            setComponentsToBePublished(prev => [...prev, +last! + 1])
        }
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
    async function publishVacancy(formikData: FormikValues, index:number | {id:number}) {
        const {header, description, company, coverImg, keyIds, about, hiring, requirements,responsibilities, info, offer, publishedVacancyId} = formikData
        const keys = keyIds.flatMap((el: [string, number]) => el[0]).filter((el: number, index: number, array: number[]) => array.indexOf(el) === index)
        const data:ICreatedVacancy = {
            header,
            description,
            keyIds: keys,
            company,
            cover:'',
            data: {
                about,
                hiring,
                requirements,
                responsibilities,
                info,
                offer
            }
        }
        if(coverImg.file) {
            const fd = new FormData()
            await fd.append('file', coverImg.file)
            const s3 = await articlesAPI.uploadImage(fd)
            data.cover = s3.data
        } else if(!coverImg.file && coverImg.src) { // if we're editing published card
            data.cover = coverImg.src
        }
        if(publishedVacancyId) {
            await dispatch(updateVacancy({id:publishedVacancyId, data:data}))
            handleDeleteEditingCard(index)
        } else {
            await dispatch(createVacancy(data))
            handleDeleteEditingCard(index)
        }
    }


    const createCardComponents = toBePublished.map((el, index) => {
        if(typeof el !== 'number') {
            const publishedCardData = vacancies.find(elem => elem.id === el.id)
            return <div key={el.id + 'published'} className={'createAffiliate__createCardForm__item'}>
                <CreateVacancyCardForm  handleDelete={handleDeleteEditingCard} publishCard={publishVacancy}
                                       cardIndex={el}  publishedVacancyData={publishedCardData}
                                       isPublished={false} keys={keys}/>
            </div>
        } else {
            return <div key={el + 'unpublished'} className={'createAffiliate__createCardForm__item'}>
                <CreateVacancyCardForm handleDelete={handleDeleteEditingCard} publishCard={publishVacancy}
                                       cardIndex={el}
                                       isPublished={false} keys={keys}/>
            </div>
        }
    })

    return <Layout>
        <StyledWrapper>
            <div className={'createVacancy'}>
                <div className={'createVacancy__container'}>
                    <StyledContent>
                        <StyledH1>Add Job Opportunity</StyledH1>
                        <div className={'createVacancy__content'}>
                            <div className={'createVacancy__toBeCreated__container'}>
                                {createCardComponents}
                            </div>
                            <div className={'createVacancy__addBtn'} onClick={handleAddClick}>
                                <AddButton targetedContent={'Job Opportunity'} formikIsValid={true}/>
                            </div>
                            <div className={'createVacancy__published__container'}>
                                {vacancyComponents}
                            </div>
                        </div>
                    </StyledContent>
                </div>
            </div>
        </StyledWrapper>
    </Layout>
};