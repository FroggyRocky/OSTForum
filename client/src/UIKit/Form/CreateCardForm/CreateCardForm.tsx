import './createCardForm.scss'
import {CommonInput} from "../CommonInput/CommonInput";
import {Formik, FormikValues, useFormik} from "formik";
import * as Yup from "yup";
import {CreateCardImg} from "./CreateCardImg/CreateCardImg";
import {FaFileImage} from "react-icons/fa";
import {CreateCardInput} from "./CreateCardInput/CreateCardInput";
import {CreateCardTextArea} from "./CreateCardTextArea/CreateCardTextArea";
import {KeysDropDown} from "./KeysDropDown/KeysDropDown";
import {ScoreDropDown} from "./ScoreDropDown/ScoreDropDown";
import {IKey} from "../../../redux/auth/authConfigsTypes";
import {IoIosAdd} from "react-icons/io";
import {CreateCardButton} from "./CreateCardButton/CreateCardButton";
import {IAffiliate, ICreatedAffiliate} from "../../../redux/affiliates/affiliatesTypes";
import {useEffect} from "react";
import {IService} from "../../../redux/services/servicesTypes";

type Props = {
    keys: IKey[]
    isPublished: boolean
    cardIndex: number | { id: number }
    publishCard: (value: FormikValues, cardIndex:number | { id: number }) => void
    handleDelete: (index: number | { id: number }) => void
    publishedCardId?: number
    publishedCardData?: IAffiliate | IService

};

const MAX_CHARACTERS_HEADER = 25
const MAX_CHARACTERS_DESCRIPTION = 210

export function CreateCardForm(props: Props) {
    const contentSchema = Yup.object().shape({
        header: Yup.string()
            .min(1)
            .max(25)
            .required('Header is Required'),
        description: Yup.string()
            .min(1)
            .max(210)
            .required('Description is Required'),
        link: Yup.string()
            .required('link is required'),
    })
    const formik = useFormik({
        validateOnChange: false,
        validateOnBlur: true,
        initialValues: {
            header: '',
            description: '',
            keyIds: [] as [number | undefined, string | undefined][],
            link: '',
            score: 0,
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
        if (props.publishedCardData) {
            const {header, description, keyIds, score, link, cover, id} = props.publishedCardData
            const data = {
                publishedCardId: id,
                header: header,
                description: description,
                keyIds: [] as [number | undefined, string | undefined][],
                link: link,
                score: score || 0,
                coverImg: {
                    file: '',
                    src: cover,
                }
            }
            if (keyIds.length !== 0) {
                const keys: [number, string][] = props.keys.filter(el => keyIds.includes(+el.id)).map(el => [el.id, el.name])
                data.keyIds = [...keys]
            }
            formik.setValues(data)
        }
    }, [])

    function setCoverImg(src: ArrayBuffer | string, file: File) {
        formik.setFieldValue('coverImg.src', src)
        formik.setFieldValue('coverImg.file', file)
    }

    function setScore(num: number) {
        formik.setFieldValue('score', num)
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
    return <div className={'createCardContainer'}>
        <main className={'createCardForm'}>
            <div className={'createCardForm__cover'}>
                <CreateCardImg value={formik.values.coverImg.src} formikSetCoverValue={setCoverImg}/>
            </div>
            <div className={'createCardForm__content'}>
                <section className={'createCardForm__header'}>
                    <div className={'createCardForm__header__input'}>
                        <CreateCardInput handleInputChange={formik.handleChange} name={'header'}
                                         inputValue={formik.values.header} MAX_CHARACTERS={MAX_CHARACTERS_HEADER}/>
                    </div>
                    <div className={'createCardForm__score'}>
                        <ScoreDropDown scoreValue={formik.values.score} handleChooseScore={setScore}/>
                    </div>
                </section>
                <section className={'createCardForm__description'}>
                    <CreateCardTextArea name={'description'} inputValue={formik.values.description}
                                        handleChange={formik.handleChange} MAX_CHARACTERS={MAX_CHARACTERS_DESCRIPTION}/>
                </section>
                <section className={'createCardForm__meta'}>
                    <div className={'createCardForm__addKeys'}>
                        {keyComponent}
                        <div className={'createCardForm__addKeys__btn'} onClick={handleAddKey}>
                            <IoIosAdd className={'createCardForm__addKeys__btn__icon'}/>
                        </div>
                    </div>
                    <div className={'createCardForm__meta__link'}>
                        <input type="text" name={'link'} onChange={formik.handleChange} value={formik.values.link}
                               placeholder={'Link'}/>
                    </div>
                </section>
            </div>
        </main>
        <div className={'createCardForm__addBtn'}>
            <CreateCardButton handleDelete={() => props.handleDelete(props.cardIndex)}
                              handleSubmit={() => props.publishCard(formik.values, props.cardIndex)} isPublished={props.isPublished}/>
        </div>
    </div>
};