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
import {createArticle, updateArticle} from "../../../redux/articles/articlesThunks";
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
} from './createArticle.styles'
import {CustomTextAreaWithCounter} from "../../common/Forms/CustomTextAreaWithCounter";
import {CustomInputWithCounter} from "../../common/Forms/CustomInputWithCounter";
import {RiImageAddFill} from "react-icons/ri";
import * as Yup from 'yup';
import {useNavigate} from "react-router-dom";
import {resizeImg} from "../../../services/ImgResize";

export const CreateArticlePageContext = createContext<any>('')


type Props = {};

export function CreateArticle(props: Props) {

    const [editorState, setEditorState] = useState(
        () => EditorState.createEmpty(),
    );
    const isArticleCreated = useAppSelector(state => state.articles.isArticleCreated);
    const editingArticle = useAppSelector(state => state.articles.editingArticle);
    const err = useAppSelector(state => state.articles.commonError);
    const dispatch = useAppDispatch();
    const [isAddLinkInputOpen, setAddLinkInputState] = useState(false)
    const fileWithTextInputRef = useRef() as React.MutableRefObject<HTMLInputElement>;
    const fileWithOutTextInputRef = useRef() as React.MutableRefObject<HTMLInputElement>;
    const [isImgWithTextAttaching, setImgWithTextAttachmentState] = useState(false);
    const [isImgWithOutTextAttaching, setImgWithOutTextAttachmentState] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        const location = window.location.search
        const id = new URLSearchParams(location).get('id');
        if (Object.keys(editingArticle).length === 0 && id) navigate('/dashboard/articles/create')
        if (id && Object.keys(editingArticle).length !== 0) {
            const newState = ContentState.createFromBlockArray(
                editingArticle.editorState.contentBlocks,
                editingArticle.editorState.entityMap
            )
            setEditorState(EditorState.createWithContent(newState))
            if (editingArticle.coverImg_withText) formik.setFieldValue('coverImg_withText.src', editingArticle.coverImg_withText)
            if (editingArticle.coverImg_withOutText) formik.setFieldValue('coverImg_withOutText.src', editingArticle.coverImg_withOutText)
            formik.setFieldValue('header', editingArticle.header)
            formik.setFieldValue('description', editingArticle.description)
            formik.setFieldValue('previewDescription', editingArticle.previewDescription)
            formik.setFieldValue('articleId', editingArticle.articleId)
            formik.setFieldValue('categoryIds', editingArticle.categoryIds)
        }
    }, [editingArticle, window.location.search])

    const CreateArticleSchema = Yup.object().shape({
        header: Yup.string()
            .min(1)
            .max(55)
            .required('Header is Required'),
        category: Yup.string(),
        previewDescription: Yup.string()
            .max(95)
            .required('Preview description is required'),
        description: Yup.string()
            .min(1)
            .max(240)
            .required('Description is Required'),
        text: Yup.object().required('Required'),
    })
    const formik = useFormik({
        validateOnChange: false,
        validateOnBlur: true,
        initialValues: {
            articleId: '',
            header: '',
            description: '',
            previewDescription: '',
            categoryIds: [],
            coverImg_withText: {
                file: '',
                src: '',
            },
            coverImg_withOutText: {
                file: '',
                src: '',
            },
            text: '',
            hyperLink: '',
        },
        validationSchema: CreateArticleSchema,
        onSubmit: async (values) => {
            await onAddArticle(values)
        }
    })

    function onAddLink(e: any) {
        e.preventDefault()
        formik.setFieldValue('hyperLink', '')
        const selection = editorState.getSelection();
        if (!selection.isCollapsed()) {
            setAddLinkInputState(true);
            const contentState = editorState.getCurrentContent();
            const startKey = editorState.getSelection().getStartKey();
            const startOffset = editorState.getSelection().getStartOffset();
            const blockWithLinkAtBeginning = contentState.getBlockForKey(startKey);
            const linkKey = blockWithLinkAtBeginning.getEntityAt(startOffset);
            if (linkKey) {
                const linkInstance = contentState.getEntity(linkKey);
                const url = linkInstance.getData().url;
                formik.setFieldValue('hyperLink', url)
            }
        } else {
            setAddLinkInputState(false)
        }
    }

    function confirmLink() {
        const {hyperLink} = formik.values
        const contentState = editorState.getCurrentContent();
        const contentStateWithEntity = contentState.createEntity(
            "LINK",
            "MUTABLE",
            {url: hyperLink}
        );
        const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
        let nextEditorState = EditorState.set(editorState, {
            currentContent: contentStateWithEntity
        });
        nextEditorState = RichUtils.toggleLink(
            nextEditorState,
            nextEditorState.getSelection(),
            entityKey
        );
        setEditorState(nextEditorState);
        formik.setFieldValue('hyperLink', '')
        setAddLinkInputState(false)
    }

    function removeLink() {
        const selection = editorState.getSelection();
        if (!selection.isCollapsed()) {
            const newState = RichUtils.toggleLink(editorState, selection, null);
            setEditorState(newState)
            formik.setFieldValue('hyperLink', '')
        }
        setAddLinkInputState(false)
    }

    async function onAddArticle(values: typeof formik.values) {
        try {
            if (!formik.isValid) return
            const rawText = editorState.getCurrentContent().getPlainText('\u0001')
            if (rawText.length < 100) {
                formik.setFieldError('text', 'Article\'s content has to be minimum up to 100 characters');
                return;
            }
            dispatch(setArticleCreatingState(true))
            const {
                header,
                description,
                previewDescription,
                coverImg_withText,
                coverImg_withOutText,
                categoryIds
            } = values
            if (coverImg_withText.file && coverImg_withText.src.includes('base64')) {
                const fd2 = new FormData();
                fd2.append('file', coverImg_withText.file);
                const s3 = await articlesAPI.uploadImage(fd2);
                coverImg_withText.src = s3.data
            }
            if (coverImg_withOutText.file && coverImg_withOutText.src.includes('base64')) {
                const fd3 = new FormData()
                fd3.append('file', coverImg_withOutText.file)
                const s3 = await articlesAPI.uploadImage(fd3)
                coverImg_withOutText.src = s3.data
            }
            const contentState = await editorState.getCurrentContent()
            const entityKeys = convertToRaw(contentState).entityMap
            for (const key in entityKeys) {
                if (entityKeys[key].type !== 'LINK' && entityKeys[key].data.src.includes('base64')) {
                    const {file} = entityKeys[key].data
                    const fd = new FormData()
                    await fd.append('file', file)
                    const s3 = await articlesAPI.uploadImage(fd)
                    entityKeys[key].data.src = s3.data
                }
            }
            const html = convertToHTML({
                entityToHTML: (entity, originalText) => {
                    if (entity.type === 'IMAGE') {
                        return <div className='article__imgContainer'>
                                <div className={'article__imgLoader'}></div>
                            <img src={entity.data.src} alt='article_image'/>
                        </div>
                    } else if (entity.type === 'LINK' && entity.data?.url) {
                        return <a href={entity.data.url} target="_blank" rel="noopener noreferrer"></a>
                    } else {
                        return originalText
                    }
                }
            })(editorState.getCurrentContent());
            const data = {
                header,
                description,
                previewDescription,
                coverImg_withText: coverImg_withText.src,
                coverImg_withOutText: coverImg_withOutText.src,
                categoryIds: categoryIds?.length !== 0 ? categoryIds : null,
                text: DOMPurify.sanitize(html, {USE_PROFILES: {html: true}})
            }
            if (formik.values?.articleId) {
                const updateData = {...data, articleId: +formik.values?.articleId}
                dispatch(updateArticle(updateData))
            } else {
                dispatch(createArticle(data))
            }
        } catch (e) {
            console.log(e);
            dispatch(setCommonErr('Something went wrong, try again later'))
            dispatch(setArticleCreatingState(false))
        }
    }

    async function pasteImg(src: string, file: File) {
        const {newFile, dataURL} = await resizeImg(file, src,  500000) as {newFile:File, dataURL:string}
        const contentState = await editorState.getCurrentContent();
        const contentStateWithEntity = await contentState.createEntity("IMAGE", "MUTABLE",
            {src: dataURL, id: '2', file: newFile})
        const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
        const newEditorState = await EditorState.set(editorState, {currentContent: contentStateWithEntity});
        const state = await AtomicBlockUtils.insertAtomicBlock(newEditorState, entityKey, "MyImage");
        setEditorState(state)
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
                    } else {
                        if (src) return await pasteImg(src.toString(), files[0])
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

    return <form onSubmit={formik.handleSubmit}>
        {isArticleCreated === true && <ModalWindow smallModal={true} closeModal={closeModal} header={'Success'}
                                                   text='Article successfully created'/>}
        {err && <ModalWindow smallModal={true} closeModal={closeErrModal} header={'Failure'}
                             text={err}/>}
        <Content style={{padding: '60px 0'}}>

            <H1 style={{textAlign: 'center'}}>Add new articles</H1>
            <FormContent>
                <CustomInputWithCounter value={formik.values.header}
                                        currentValueLength={formik.values.header?.length || 0}
                                        error={formik.errors.header}
                                        name='header' handleChange={formik.handleChange} placeholder='Header'
                                        maxLength={55}/>
                <CustomTextAreaWithCounter value={formik.values.previewDescription}
                                           error={formik.errors.previewDescription}
                                           currentValueLength={formik.values.previewDescription?.length || 0}
                                           name='previewDescription' handleChange={formik.handleChange}
                                           placeholder='Preview Description' maxLength={95}/>
                <CustomTextAreaWithCounter value={formik.values.description}
                                           error={formik.errors.description}
                                           currentValueLength={formik.values.description?.length || 0}
                                           name='description'
                                           handleChange={formik.handleChange}
                                           placeholder='Description' maxLength={240}/>
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
                                                color='#F05050' size={30} id={'withText'} onClick={deleteCoverImg}/>}
                            {isImgWithTextAttaching && !formik.values.coverImg_withText.src &&
                                <RiImageAddFill color='#525252' size={120}/>}
                            {!formik.values.coverImg_withText.src && !isImgWithTextAttaching && <>
                                <BsFileEarmarkRichtextFill color='#525252' opacity='0.5' size={120}/>
                                <p>Add preview image <b>with text</b></p>
                                <p>min. size - 1170x439</p>
                            </>
                            }
                        </AddImgWithTextBtn>
                    </label>
                    <label htmlFor="uploadWithOutText">
                        <AddImgWithOutTextBtn onDragEnter={dragEnter} onDrop={imgDrop} onDragOver={dragOver}
                                              onDragLeave={dragLeave} flexDirection='column' id={'withOutText'}
                                              imgSrc={formik.values.coverImg_withOutText.src || ''}
                                              isAttaching={isImgWithOutTextAttaching}>
                            {!formik.values.coverImg_withOutText.src &&
                                <input ref={fileWithOutTextInputRef} name='coverImg_withOutText' onChange={onAddImg}
                                       style={{display: 'none'}}
                                       type="file" accept='image/*' id={'uploadWithOutText'}/>
                            }
                            {formik.values.coverImg_withOutText.src &&
                                <AiOutlineClose style={{position: 'absolute', left: '93%', top: '5%'}}
                                                color='#F05050' size={30} onClick={deleteCoverImg} id={'withOutText'}/>}
                            {isImgWithOutTextAttaching && !formik.values.coverImg_withText.src &&
                                <RiImageAddFill color='#525252' size={120}/>}
                            {!formik.values.coverImg_withOutText.src && !isImgWithOutTextAttaching && <>
                                <FaFileImage color='#525252' opacity='0.5' size={120}/>
                                <p>Add preview image <b>without text</b></p>
                                <p>min. size - 1170x439</p>
                            </>
                            }
                        </AddImgWithOutTextBtn>
                    </label>
                </CoversContainer>
            </FormContent>
        </Content>
        <BreakingLine/>
        <Content>
            <ArticleEditorContainer>
                <CreateArticlePageContext.Provider
                    value={{onAddImg, onAddLink, confirmLink, isAddLinkInputOpen, setAddLinkInputState, removeLink}}>
                    <ArticleEditor formik={formik} editorState={editorState} setEditorState={setEditorState}/>
                </CreateArticlePageContext.Provider>
                {formik.errors.text && <ErrorMessage style={{marginTop: '30px'}}>{formik.errors.text}</ErrorMessage>}
            </ArticleEditorContainer>
            <AddArticleButtonContainer>
                <AddArticleButton type={'submit'}>
                    <BsFillCheckCircleFill size={120} opacity='0.5' color='#58649C'/>
                    <p>Add Article</p>
                </AddArticleButton>
                {!formik.isValid &&
                    <ErrorMessage style={{marginTop: '30px'}}>You haven't passed validation, check if all the fields are
                        field correctly</ErrorMessage>}
            </AddArticleButtonContainer>

        </Content>
    </form>
}