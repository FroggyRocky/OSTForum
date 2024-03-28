import * as Yup from "yup";
import {FormikValues, useFormik} from "formik";
import {KeysDropDown} from "../CreateCardForm/KeysDropDown/KeysDropDown";
import {CreateCardImg} from "../CreateCardForm/CreateCardImg/CreateCardImg";
import {CreateCardInput} from "../CreateCardForm/CreateCardInput/CreateCardInput";
import {CreateCardTextArea} from "../CreateCardForm/CreateCardTextArea/CreateCardTextArea";
import {IoIosAdd} from "react-icons/io";
import {CreateCardButton} from "../CreateCardForm/CreateCardButton/CreateCardButton";
import {IKey} from "../../../redux/auth/authConfigsTypes";
import './createVacancyCardForm.scss'
import {IVacancy} from "../../../redux/vacancies/vacanciesTypes";
import {useEffect} from "react";

type Props = {
    keys: IKey[]
    isPublished: boolean
    cardIndex: number | { id: number }
    publishCard: (value: FormikValues, index: number | { id: number }) => void
    handleDelete: (index: number | { id: number }) => void
    publishedVacancyData?: IVacancy
};

export function CreateVacancyCardForm(props: Props) {
    const contentSchema = Yup.object().shape({
        header: Yup.string()
            .min(1)
            .max(25)
            .required('Header is Required'),
        company: Yup.string()
            .min(1)
            .max(25)
            .required('Company is Required'),
        description: Yup.string()
            .min(1)
            .max(100)
            .required('Description is Required'),
        about: Yup.string()
            .min(1)
            .max(200)
            .required('about is Required'),
        hiring: Yup.string()
            .min(1)
            .max(50)
            .required('hiring is Required'),
        responsibilities: Yup.string()
            .min(1)
            .max(250)
            .required('responsibilities is Required'),
        offer: Yup.string()
            .min(1)
            .max(500)
            .required('offer is Required'),
        info: Yup.string()
            .min(1)
            .max(250)
            .required('info is Required'),
        requirements: Yup.string()
            .min(1)
            .max(500)
            .required('requirements is Required'),
    })
    const formik = useFormik({
        validateOnChange: false,
        validateOnBlur: true,
        initialValues: {
            publishedVacancyId: null as null | number,
            header: '',
            company: '',
            description: '',
            about: '',
            hiring: '',
            responsibilities: '',
            offer: '',
            info: '',
            requirements: '',
            keyIds: [] as [number | undefined, string | undefined][],
            coverImg: {
                file: '',
                src: '',
            }
        },
        validationSchema: contentSchema,
        onSubmit: async (values) => {
            console.log(values)
        }
    })
    useEffect(() => {
        if (props.publishedVacancyData) {
            const {
                id,
                data: publishedVacancyData,
                company,
                cover,
                keyIds,
                description,
                header
            } = props.publishedVacancyData
            const {offer, responsibilities, hiring, requirements, info, about} = publishedVacancyData
            const keys = props.keys.filter(el => keyIds.includes(el.id)).map(elem => [elem.id, elem.name])
            const data = {
                publishedVacancyId: id,
                header: header,
                company: company,
                description: description,
                about: about,
                hiring: hiring,
                responsibilities: responsibilities,
                offer: offer,
                info: info,
                requirements: requirements,
                keyIds: keys as [number | undefined, string | undefined][],
                coverImg: {
                    file: '',
                    src: cover,
                }
            }
            formik.setValues(data)
        }
    }, [props.publishedVacancyData])

    function setCoverImg(src: ArrayBuffer | string, file: File) {
        formik.setFieldValue('coverImg.src', src)
        formik.setFieldValue('coverImg.file', file)
    }

    function handleAddKey() {
        formik.setFieldValue('keyIds', [...formik.values.keyIds, [undefined, undefined]])
    }

    function handleChooseKey(keyData: { name: string, id: number }, index: number) {
        let arr = [...formik.values.keyIds]
        arr[index] = [keyData.id, keyData.name]
        formik.setFieldValue('keyIds', arr)
    }

    function handleDeleteKey(indexId: number) {
        let arr = [...formik.values.keyIds]
        arr = arr.filter((el, index) => index !== indexId)
        formik.setFieldValue('keyIds', arr)
    }

    const keyComponent = formik.values.keyIds.map((el, index) => {
        return <div key={index} className={'createCardForm__addKeys__key'}>
            <KeysDropDown handleDeleteKey={handleDeleteKey} handleChooseKey={handleChooseKey} index={index}
                          valueName={el[1]} keys={props.keys}/>
        </div>
    })
    return <div className={'createVacancyCard__block'}>
        <div className={'createVacancyCard__form'}>
            <main className={'createVacancyCard__mainData'}>
                <div className={'createVacancyCard__cover'}>
                    <CreateCardImg value={formik.values.coverImg.src} formikSetCoverValue={setCoverImg}/>
                </div>
                <div className={'createVacancyCard__mainData__form'}>
                    <div className={'createVacancyCard__input'}>
                        <CreateCardInput placeholder={'Header'} handleInputChange={formik.handleChange} name={'header'}
                                         inputValue={formik.values.header} MAX_CHARACTERS={25}/>
                    </div>
                    <div className={'createVacancyCard__input'}>
                        <CreateCardInput placeholder={'Company'} handleInputChange={formik.handleChange}
                                         name={'company'} inputValue={formik.values.company} MAX_CHARACTERS={25}/>
                    </div>
                    <div className={'createVacancyCard__input'}>
                        <CreateCardTextArea placeholder={'description'} name={'description'}
                                            inputValue={formik.values.description} handleChange={formik.handleChange}
                                            MAX_CHARACTERS={100}/>
                    </div>
                    <section className={'createVacancyCard__meta'}>
                        <div className={'createVacancyCard__addKeys'}>
                            {keyComponent}
                            <div className={'createVacancyCard__addKeys__btn'} onClick={handleAddKey}>
                                <IoIosAdd className={'createVacancyCard__addKeys__btn__icon'}/>
                            </div>
                        </div>
                    </section>
                </div>
            </main>
            <section className={'createVacancyCard__additionalData'}>
                <div className={'createVacancyCard__input'}>
                    <CreateCardTextArea placeholder={'about'} name={'about'} inputValue={formik.values.about}
                                        handleChange={formik.handleChange} MAX_CHARACTERS={200}/>
                </div>
                <div className={'createVacancyCard__input'}>
                    <CreateCardInput placeholder={'hiring'} handleInputChange={formik.handleChange} name={'hiring'}
                                     inputValue={formik.values.hiring} MAX_CHARACTERS={50}/>
                </div>
                <div className={'createVacancyCard__input'}>
                    <CreateCardTextArea placeholder={'responsibilities'} name={'responsibilities'}
                                        inputValue={formik.values.responsibilities} handleChange={formik.handleChange}
                                        MAX_CHARACTERS={250}/>
                </div>
                <div className={'createVacancyCard__input'}>
                    <CreateCardTextArea placeholder={'offer'} name={'offer'} inputValue={formik.values.offer}
                                        handleChange={formik.handleChange} MAX_CHARACTERS={500}/>
                </div>
                <div className={'createVacancyCard__input'}>
                    <CreateCardTextArea placeholder={'requirements'} name={'requirements'}
                                        inputValue={formik.values.requirements} handleChange={formik.handleChange}
                                        MAX_CHARACTERS={500}/>
                </div>
                <div className={'createVacancyCard__input'}>
                    <CreateCardTextArea placeholder={'additional info'} name={'info'} inputValue={formik.values.info}
                                        handleChange={formik.handleChange} MAX_CHARACTERS={250}/>
                </div>
            </section>
        </div>
        <div className={'createVacancyCard__addBtn'}>
            <CreateCardButton handleDelete={() => props.handleDelete(props.cardIndex)}
                              handleSubmit={() => props.publishCard(formik.values, props.cardIndex)}
                              isPublished={props.isPublished}/>
        </div>
    </div>
};