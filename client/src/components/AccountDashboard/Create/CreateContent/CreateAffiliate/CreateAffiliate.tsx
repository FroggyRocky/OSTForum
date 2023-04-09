import {Layout} from "../../../../../UIKit/GeneralLayout/Layout";
import {StyledH1, StyledWrapper, StyledContent} from "../../../../../UIKit/BasicStyledComponents/basicStyledComponents";
import {AddButton} from "../../../../../UIKit/Form/AddButton/AddButton";
import {CardWithRegistration} from "../../../../../UIKit/Cards/CardsWithKeys/CardWithRegistration";
import {useEffect, useState} from "react";
import {useAppSelector, useAppDispatch} from "../../../../../redux/hooks/hooks";
import {getAffiliates, createAffiliate} from "../../../../../redux/affiliates/affiliatesThunks";
import {CreateCardForm} from "../../../../../UIKit/Form/CreateCardForm/CreateCardForm";
import './createAffiliate.scss'
import {FormikValues} from "formik";
import articlesAPI from "../../../../../api/articlesAPI";
export function CreateAffiliate() {
    const affiliates = useAppSelector(state => state.affiliates.affiliates)
    const keys = useAppSelector(state => state.authConfigs.configs.keys.affiliate)
    const [toBePublished, setComponentsToBePublished] = useState<Array<number>>([])
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(getAffiliates())
}, [])
    const affiliatesComponents = affiliates.map(el => {
        return <div key={el.id}  className={'createAffiliate__published__item'}>
        <CardWithRegistration keys={keys.filter(key => el.keyIds.includes(key.id))} link={el.link} description={el.description} header={el.header} cover={el.cover} score={el.score} />
        </div>
        }).reverse()
    function handleAddClick() {
        if(toBePublished.length === 0) {
            setComponentsToBePublished([1])
        } else {
            const last = toBePublished[toBePublished.length - 1]
            setComponentsToBePublished(prev => [...prev, +last! + 1])
        }
    }
    async function publishAffiliate(formikData:FormikValues) {
        const {header, description, coverImg, keyIds, link, score} = formikData
        const keys = keyIds.flatMap((el:[string,number]) => el[0]).filter((el:number, index:number, array:number[]) => array.indexOf(el) === index)
        const fd = new FormData()
        await fd.append('file', coverImg.file)
        const s3 = await articlesAPI.uploadImage(fd)
        console.log(s3.data)
        const data = {
            header,
            description,
            cover:s3.data,
            link,
            keyIds:keys,
            score,
        }
        dispatch(createAffiliate(data))
    }
    const createCardComponents = toBePublished.map(el => {
        return <div className={'createAffiliate__createCardForm__item'}>
            <CreateCardForm publishCard={publishAffiliate} cardIndex={el} isPublished={false} keys={keys}/>
        </div>
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
                    <AddButton  targetedContent={'Affiliate Network'} formikIsValid={true} />
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