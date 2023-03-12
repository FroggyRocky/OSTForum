import {createContext, useEffect, useRef, useState} from "react";
import * as DOMPurify from 'dompurify';
import {H1} from '../../common/commonStyles/H1.styled'
import {useFormik} from "formik";
import {ArticleEditor} from "../ArticleEditor/ArticleEditor";
import {Content} from "../../common/commonStyles/Content.styled";
import {FaFileImage} from "react-icons/fa";
import {BsFileEarmarkRichtextFill, BsFillCheckCircleFill} from "react-icons/bs";
import {convertToHTML} from 'draft-convert';
import {AtomicBlockUtils, ContentState, convertToRaw, EditorState, RichUtils} from "draft-js";
import {useAppDispatch, useAppSelector} from "../../../redux/hooks/hooks";
import articlesAPI from "../../../api/articlesAPI";
import {AiOutlineClose} from "react-icons/ai";
import {ModalWindow} from "../../common/ModalWindow";
import {setArticleCreatedState, setArticleCreatingState, setCommonErr} from "../../../redux/articles/articlesSlice";
import {createAffiliate} from "../../../redux/affiliates/affiliatesThunks";
import {createCase} from "../../../redux/cases/casesThunks";
import {createNetwork} from "../../../redux/networking/networkingThunks";
import {createService} from "../../../redux/services/servicesThunks";
import {createVacancy} from "../../../redux/vacancies/vacanciesThunks";
import {
    AddArticleButton,
    AddArticleButtonContainer,
    AddImgWithOutTextBtn,
    AddImgWithTextBtn,
    ArticleEditorContainer,
    BreakingLine,
    CoversContainer,
    ErrorMessage,
    FormContent
} from '../AccountArticles/createArticle.styles'
import {CustomTextAreaWithCounter} from "../../common/Forms/CustomTextAreaWithCounter";
import {CustomInputWithCounter} from "../../common/Forms/CustomInputWithCounter";
import {RiImageAddFill} from "react-icons/ri";
import * as Yup from 'yup';
import {useNavigate} from "react-router-dom";
import {resizeImg} from "../../../services/ImgResize";
import {DropDownField} from "../../../UIKit/Form/DropDownField/DropDownField";
import {CommonInput} from "../../../UIKit/CommonInput/CommonInput";
import './createContent.scss'
import {FormKeys} from "../../../UIKit/Form/FormKeys/FormKeys";
import {IKey} from "../../../redux/auth/authConfigsTypes";

export const CreateArticlePageContext = createContext<any>('')


type Props = {};

export function CreateContent(props: Props) {
    const contentOptions = [
        {
            id: 1,
            name: 'Affiliate'
        },
        {
            id: 2,
            name: 'Vacancies'
        }, {
            id: 3,
            name: 'Networks'
        }, {
            id: 4,
            name: 'Services'
        }, {
            id: 5,
            name: 'Cases'
        },
    ]
    const [editorState, setEditorState] = useState(
        () => EditorState.createEmpty(),
    );
    const isArticleCreated = useAppSelector(state => state.articles.isArticleCreated);
    const err = useAppSelector(state => state.articles.commonError);
    const dispatch = useAppDispatch();
    const [targetedContent, setTargetedContent] = useState<{ id: number, name: string }>()
    const fileWithTextInputRef = useRef() as React.MutableRefObject<HTMLInputElement>;
    const [isImgWithTextAttaching, setImgWithTextAttachmentState] = useState(false);
    const [isImgWithOutTextAttaching, setImgWithOutTextAttachmentState] = useState(false)
    const keys = useAppSelector(state => state.authConfigs.configs.keys)
    const [chosenKeys, setChosenKeys] = useState<IKey[]>([])
    const contentSchema = Yup.object().shape({
        header: Yup.string()
            .min(1)
            .max(25)
            .required('Header is Required'),
        description: Yup.string()
            .min(1)
            .max(210)
            .required('Description is Required'),
        link:Yup.string()
            .required('link is required'),

    })
    const formik = useFormik({
        validateOnChange: false,
        validateOnBlur: true,
        initialValues: {
            header: '',
            description: '',
            price: null,
            keyIds: [],
            link: '',
            coverImg_withText: {
                file: '',
                src: '',
            },
            coverImg_withOutText: {
                file: '',
                src: '',
            },
            text: '',
        },
        validationSchema: contentSchema,
        onSubmit: async (values) => {
            await onAddArticle(values)
        }
    })


    function targetContent(content: { id: number, name: string }) {
        setTargetedContent(content)
    }

    async function onAddArticle(values: typeof formik.values) {
        try {
            dispatch(setArticleCreatingState(true))
            const {
                header,
                description,
                coverImg_withText,
                keyIds,
                link,
                price
            } = values
            if (coverImg_withText.file && coverImg_withText.src.includes('base64')) {
                const fd2 = new FormData();
                fd2.append('file', coverImg_withText.file);
                const s3 = await articlesAPI.uploadImage(fd2);
                coverImg_withText.src = s3.data
            }
            const data = {
                header,
                description,
                link,
                cover: coverImg_withText.src,
                keyIds: keyIds?.length !== 0 ? keyIds : [],
            }
            switch (targetedContent?.id) {
                case 1:
                    const affiliateData = {...data, price:price ? price : 0}
                    dispatch(createAffiliate(affiliateData))
                    break;
                case 2:
                    const vacancyData = {...data, price:price ? price : 0}
                    dispatch(createVacancy(vacancyData))
                    break;
                case 3:
                    dispatch(createNetwork(data))
                    break;
                case 4:
                    dispatch(createService(data))
                    break;
                case 5:
                    dispatch(createCase(data))
                    break;
                default:
                    break;
            }
        } catch (e) {
            console.log(e);
            dispatch(setCommonErr('Something went wrong, try again later'))
            dispatch(setArticleCreatingState(false))
        }
    }


    async function onAddImg(e: any) {
        const files = e.target.files
        const name = e.currentTarget.getAttribute('name')
        if (files) {
            const reader = new FileReader()
            reader.readAsDataURL(files[0])
            reader.onloadend = async () => {
                const src = await reader.result
                if (src) {
                    if (name === 'coverImg_withText') {
                        await formik.setFieldValue('coverImg_withText', {src: src, file: files[0]})
                    } else if (name === 'coverImg_withOutText') {
                        await formik.setFieldValue('coverImg_withOutText', {src: src, file: files[0]})
                    }
                }
            }
        }
    }

    function deleteCoverImg(e: any) {
        const id = e.currentTarget.id
        setTimeout(() => {
            if (id === 'withText') {
                formik.setFieldValue('coverImg_withText', {src: '', file: ''})
                setImgWithTextAttachmentState(false)
            } else if (id === 'withOutText') {
                formik.setFieldValue('coverImg_withOutText', {src: '', file: ''})
                setImgWithOutTextAttachmentState(false)
            }
        }, 0)

    }

    function closeModal() {
        formik.resetForm()
        dispatch(setArticleCreatedState(false))
        setEditorState(() => EditorState.createEmpty())

    }

    function closeErrModal() {
        dispatch(setCommonErr(''))
    }

    function imgDrop(e: any) {
        e.preventDefault()
        const id = e.currentTarget.id
        let imgFile = e.dataTransfer.files[0]
        if (imgFile) {
            const reader = new FileReader()
            reader.readAsDataURL(imgFile)
            reader.onload = () => {
                if (id === 'withText') {
                    formik.setFieldValue('coverImg_withText', {src: reader.result, file: imgFile})
                } else if (id === 'withOutText') {
                    formik.setFieldValue('coverImg_withOutText', {src: reader.result, file: imgFile})
                }
            }
        }
    }

    function dragLeave(e: any) {
        e.preventDefault()
        const id = e.currentTarget.id
        if (id === 'withText') {
            setImgWithTextAttachmentState(false)
        } else if (id === 'withOutText') {
            setImgWithOutTextAttachmentState(false)
        }

    }

    function dragOver(e: any) {
        e.preventDefault()
    }

    function dragEnter(e: any) {
        e.preventDefault()
        const id = e.currentTarget.id
        if (id === 'withText') {
            setImgWithTextAttachmentState(true)
        } else if (id === 'withOutText') {
            setImgWithOutTextAttachmentState(true)
        }
    }

    function handlePriceChange(e: any) {
        const value = e.target.value
        const regex = /\D/g
        formik.setFieldValue('price', value.replace(regex, ''))
    }

    function handleLinkChange(e: any) {
        const value = e.target.value
        formik.setFieldValue('link', value)
    }
function selectKey(key:IKey) {
        setChosenKeys(prev => [...prev, key])
}
function deleteChosenKey(key:IKey) {
    setChosenKeys(prev => {
        return prev.filter(el => el.id !== key.id)
    })
}
    return <form onSubmit={formik.handleSubmit}>
        {isArticleCreated === true && <ModalWindow smallModal={true} closeModal={closeModal} header={'Success'}
                                                   text={`${targetedContent?.name ? targetedContent?.name : 'Content'} successfully created`}/>}
        {err && <ModalWindow smallModal={true} closeModal={closeErrModal} header={'Failure'}
                             text={err}/>}
        <Content style={{padding: '60px 0'}}>

            <H1 style={{textAlign: 'center'}}>Add new {targetedContent?.name ? targetedContent?.name : 'Content'}</H1>
            <FormContent>
                <DropDownField options={contentOptions} currentOption={targetedContent} setOption={targetContent}/>
                {targetedContent && <>
                    {(targetedContent.id === 1 || targetedContent.id === 2) && <div className={'createContent__input'}>
                        <CommonInput value={formik.values.price} name={'price'} handleChange={handlePriceChange}
                                     inputFieldColor={'rgba(255, 255, 255, 0.3)'} phoneCode={'$'}
                                     placeholder={'Price'}/>
                    </div>
                    }
                    <FormKeys deleteChosenKey={deleteChosenKey} setChosenKeys={selectKey} keys={keys} chosenKeys={chosenKeys} />
                    <div className={'createContent__input'}>
                        <CommonInput value={formik.values.link} name={'Link'} handleChange={handleLinkChange}
                                     inputFieldColor={'rgba(255, 255, 255, 0.3)'} placeholder={'Link'}/>
                    </div>
                    <CustomInputWithCounter value={formik.values.header}
                                            currentValueLength={formik.values.header?.length || 0}
                                            error={formik.errors.header}
                                            name='header' handleChange={formik.handleChange} placeholder='Header'
                                            maxLength={25}/>
                    <CustomTextAreaWithCounter value={formik.values.description}
                                               error={formik.errors.description}
                                               currentValueLength={formik.values.description?.length || 0}
                                               name='description'
                                               handleChange={formik.handleChange}
                                               placeholder='Description' maxLength={210}/>
                    <CoversContainer>
                        <label htmlFor="uploadWithText">
                            <AddImgWithTextBtn onDragEnter={dragEnter} onDrop={imgDrop} onDragOver={dragOver}
                                               onDragLeave={dragLeave} flexDirection='column' id={'withText'}
                                               imgSrc={formik.values.coverImg_withText.src || ''}
                                               isAttaching={isImgWithTextAttaching}>
                                {!formik.values.coverImg_withText.src &&
                                    <input ref={fileWithTextInputRef} name='coverImg_withText' onChange={onAddImg}
                                           style={{display: 'none'}}
                                           type="file" accept='image/*' id={'uploadWithText'}/>
                                }
                                {formik.values.coverImg_withText.src &&
                                    <AiOutlineClose style={{position: 'absolute', left: '93%', top: '5%'}}
                                                    color='#F05050' size={30} id={'withText'}
                                                    onClick={deleteCoverImg}/>}
                                {isImgWithTextAttaching && !formik.values.coverImg_withText.src &&
                                    <RiImageAddFill color='#525252' size={120}/>}
                                {!formik.values.coverImg_withText.src && !isImgWithTextAttaching && <>
                                    <BsFileEarmarkRichtextFill color='#525252' opacity='0.5' size={120}/>
                                    <p>Add cover <b>image</b></p>
                                    <p>min. size - 1170x439</p>
                                </>
                                }
                            </AddImgWithTextBtn>
                        </label>
                    </CoversContainer>
                </>
                }
            </FormContent>
        </Content>
        <BreakingLine/>
        <Content>
            {targetedContent &&
                <AddArticleButtonContainer>
                    <AddArticleButton type={'submit'}>
                        <BsFillCheckCircleFill size={120} opacity='0.5' color='#58649C'/>
                        <p>Add {targetedContent.name}</p>
                    </AddArticleButton>
                    {!formik.isValid &&
                        <ErrorMessage style={{marginTop: '30px'}}>You haven't passed validation, check if all the fields
                            are
                            field correctly</ErrorMessage>}
                </AddArticleButtonContainer>
            }
        </Content>
    </form>
}