import {createContext, useEffect, useRef, useState} from "react";
import {H1} from '../../common/commonStyles/H1.styled'
import {useFormik} from "formik";
import {ArticleEditor} from "./ArticleEditor/ArticleEditor";
import {Content} from "../../common/commonStyles/Content.styled";
import {FaFileImage} from "react-icons/fa";
import {BsFillCheckCircleFill} from "react-icons/bs";
import {BsFileEarmarkRichtextFill} from "react-icons/bs";
import {convertToHTML} from 'draft-convert';
import {AtomicBlockUtils, convertToRaw, EditorState, RichUtils, ContentState} from "draft-js";
import {useAppDispatch, useAppSelector} from "../../../redux/hooks/hooks";
import articlesAPI from "../../../api/articlesAPI";
import {AiOutlineClose} from "react-icons/ai";
import {ModalWindow} from "../../common/ModalWindow";
import {setArticleCreatedState, setArticleCreatingState, setCommonErr} from "../../../redux/articles/articlesSlice";
import {createArticle} from "../../../redux/articles/articlesThunks";
import {AddArticleButton, AddImgWithTextBtn,AddImgWithOutTextBtn, BreakingLine, Form, CoversContainer} from './createArticle.styles'
import {CustomTextAreaWithCounter} from "../../common/Forms/CustomTextAreaWithCounter";
import {CustomInputWithCounter} from "../../common/Forms/CustomInputWithCounter";
import {RiImageAddFill} from "react-icons/ri";
import * as Yup from 'yup';
import {useSearchParams} from "react-router-dom";

export const CreateArticlePageContext = createContext<any>('')


type Props = {};

export function CreateArticle(props: Props) {

    const [editorState, setEditorState] = useState(
        () => EditorState.createEmpty(),
    );
    const isArticleCreated = useAppSelector(state => state.articles.isArticleCreated)
    const editingArticle = useAppSelector(state => state.articles.editingArticle)
    const err = useAppSelector(state => state.articles.commonError)
    const dispatch = useAppDispatch()
    const [isAddLinkInputOpen, setAddLinkInputState] = useState(false)
    const fileWithTextInputRef = useRef() as React.MutableRefObject<HTMLInputElement>;
    const fileWithOutTextInputRef = useRef() as React.MutableRefObject<HTMLInputElement>;
    const [isImgWithTextAttaching, setImgWithTextAttachmentState] = useState(false);
    const [isImgWithOutTextAttaching, setImgWithOutTextAttachmentState] = useState(false)
    const categories = useAppSelector(state => state.auth.configs.categories)
    useEffect( () => {
        const location = window.location.search
        const id = new URLSearchParams(location).get('id');
        if(id && Object.keys(editingArticle).length !== 0) {
            const newState = ContentState.createFromBlockArray(
                editingArticle.editorState.contentBlocks,
                editingArticle.editorState.entityMap
            )
            setEditorState(EditorState.createWithContent(newState))
        }
    },[editingArticle,window.location.search])
    const CreateArticleSchema = Yup.object().shape({
        header: Yup.string()
            .min(1)
            .max(55)
            .required('Required'),
        category: Yup.string().required('Required'),
        previewDescription: Yup.string().max(95),
        description: Yup.string()
            .min(1)
            .max(240)
            .required('Required'),
        text: Yup.object().required('Required'),
    })
    const formik = useFormik({
        initialValues: {
            header: '',
            description: '',
            previewDescription: '',
            category: '',
            coverImg_withText: {
                file: '',
                src: ''
            },
            coverImg_withOutText: {
                file: '',
                src: ''
            },
            text: '',
            hyperLink: '',
        },
        validationSchema: CreateArticleSchema,
        onSubmit: values => {

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

    async function onAddArticle() {
        dispatch(setArticleCreatingState(true))
        const {header, description, previewDescription, coverImg_withText, coverImg_withOutText, category, } = formik.values
        if (coverImg_withText.file) {
            const fd2 = new FormData()
            fd2.append('file', coverImg_withText.file)
            const s3 = await articlesAPI.uploadImage(fd2)
            coverImg_withText.src = s3.data
        }
        if(coverImg_withOutText.file) {
            const fd2 = new FormData()
            fd2.append('file', coverImg_withOutText.file)
            const s3 = await articlesAPI.uploadImage(fd2)
            coverImg_withOutText.src = s3.data
        }
        const contentState = await editorState.getCurrentContent()
        const entityKeys = convertToRaw(contentState).entityMap
        for (const key in entityKeys) {
            const {file} = entityKeys[key].data
            const fd = new FormData()
            await fd.append('file', file)
            const s3 = await articlesAPI.uploadImage(fd)
            entityKeys[key].data.src = s3.data
        }
        const html = convertToHTML({
            entityToHTML: (entity, originalText) => {
                if (entity.type === 'IMAGE') {
                    return <pre><img src={entity.data.src} alt='article_image'/></pre>
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
            coverImg_withOutText:coverImg_withOutText.src,
            categoryId: categories.find(el => el.name === category)?.id,
            text: html
        }
        dispatch(createArticle(data))
    }

    async function pasteImg(src: string, file: File) {
        const contentState = await editorState.getCurrentContent();
        const contentStateWithEntity = await contentState.createEntity("IMAGE", "MUTABLE",
            {src: src, id: '2', file: file},)
        const entityKey = await contentStateWithEntity.getLastCreatedEntityKey();
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
                        formik.setFieldValue('coverImg_withText', {src: src, file: files[0]})
                    } else if(name === 'coverImg_withOutText') {
                        formik.setFieldValue('coverImg_withOutText', {src: src, file: files[0]})
                    } else {
                        if (src) return pasteImg(src.toString(), files[0])
                    }
                }
            }
        }
    }

    function deleteCoverImg_withText(e:any) {
        const id = e.currentTarget.id
        setTimeout(() => {
            if(id === 'withText') {
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
        console.log(id);
        let imgFile = e.dataTransfer.files[0]
        if (imgFile) {
            const reader = new FileReader()
            reader.readAsDataURL(imgFile)
            console.log(e.currentTarget.id)
            reader.onload = () => {
                if(id === 'withText') {
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
        if(id === 'withText') {
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
        if(id === 'withText') {
            setImgWithTextAttachmentState(true)
        } else if (id === 'withOutText') {
            setImgWithOutTextAttachmentState(true)
        }
    }

    return <>
        {isArticleCreated === true && <ModalWindow smallModal={true} closeModal={closeModal} header={'Success'}
                                                   text='Article successfully created'/>}
        {err && <ModalWindow smallModal={true} closeModal={closeErrModal} header={'Failure'}
                             text={err}/>}
        <Content style={{padding: '60px 0'}}>
            <H1 style={{textAlign: 'center'}}>Add new articles</H1>
            <Form>
                <CustomInputWithCounter value={formik.values.header} currentValueLength={formik.values.header.length}
                                        name='header' handleChange={formik.handleChange} placeholder='Header'
                                        maxLength={55}/>
                <CustomTextAreaWithCounter value={formik.values.previewDescription}
                                           currentValueLength={formik.values.previewDescription.length}
                                           name='previewDescription' handleChange={formik.handleChange}
                                           placeholder='Preview Description' maxLength={95}/>
                <CustomTextAreaWithCounter value={formik.values.description}
                                           currentValueLength={formik.values.description.length} name='description'
                                           handleChange={formik.handleChange}
                                           placeholder='Description' maxLength={240}/>
                <CoversContainer>
                <label htmlFor="uploadWithText">
                    <AddImgWithTextBtn onDragEnter={dragEnter} onDrop={imgDrop} onDragOver={dragOver}
                               onDragLeave={dragLeave} flexDirection='column' id={'withText'}
                               imgSrc={formik.values.coverImg_withText.src || ''} isAttaching={isImgWithTextAttaching}>
                        {!formik.values.coverImg_withText.src &&
                            <input ref={fileWithTextInputRef} name='coverImg_withText' onChange={onAddImg}
                                   style={{display: 'none'}}
                                   type="file" accept='image/*' id={'uploadWithText'}/>
                        }
                        {formik.values.coverImg_withText.src &&
                            <AiOutlineClose style={{position: 'absolute', left: '93%', top: '5%'}}
                                            color='#F05050' size={30} id={'withText'} onClick={deleteCoverImg_withText}/>}
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
                               imgSrc={formik.values.coverImg_withOutText.src || ''} isAttaching={isImgWithOutTextAttaching}>
                        {!formik.values.coverImg_withOutText.src &&
                            <input ref={fileWithOutTextInputRef} name='coverImg_withOutText' onChange={onAddImg}
                                   style={{display: 'none'}}
                                   type="file" accept='image/*' id={'uploadWithOutText'}/>
                        }
                        {formik.values.coverImg_withOutText.src &&
                            <AiOutlineClose style={{position: 'absolute', left: '93%', top: '5%'}}
                                            color='#F05050' size={30} onClick={deleteCoverImg_withText} id={'withOutText'} />}
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
            </Form>
        </Content>
        <BreakingLine/>
        <Content>
            <CreateArticlePageContext.Provider
                value={{onAddImg, onAddLink, confirmLink, isAddLinkInputOpen, setAddLinkInputState, removeLink}}>
                <ArticleEditor formik={formik} editorState={editorState} setEditorState={setEditorState}/>
            </CreateArticlePageContext.Provider>
            <AddArticleButton onClick={onAddArticle}>
                <BsFillCheckCircleFill size={120} opacity='0.5' color='#58649C'/>
                <p>Add Article</p>
            </AddArticleButton>
        </Content>
    </>
}