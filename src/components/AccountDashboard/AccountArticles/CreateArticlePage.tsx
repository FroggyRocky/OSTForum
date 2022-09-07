import {createContext, useRef, useState} from "react";
import {H1} from '../../commonStyles/H1.styled'
import {useFormik} from "formik";
import {ArticleEditor} from "../ArticleEditor/ArticleEditor";
import {Content} from "../../commonStyles/Content.styled";
import {FaFileImage} from "react-icons/fa";
import {BsFillCheckCircleFill} from "react-icons/bs";
import {convertToHTML} from 'draft-convert';
import {AtomicBlockUtils, convertToRaw, EditorState} from "draft-js";
import {useAppDispatch, useAppSelector} from "../../../redux/hooks/hooks";
import articlesAPI from "../../../api/articlesAPI";
import {AiOutlineClose} from "react-icons/ai";
import {ModalWindow} from "../../common/ModalWindow";
import {setArticleCreatedState, setArticleCreatingState, setCommonErr} from "../../../redux/articles/articlesSlice";
import {createArticle} from "../../../redux/articles/articlesThunks";
import {AddArticleButton, AddImgBtn, BreakingLine, Form, Input, TextArea} from './createArticle.styles'
import {useClickOutside} from "../../../services/useClickOutside";
import * as Yup from 'yup';
import {RichUtils} from 'draft-js'

export const CreateArticlePageContext = createContext<any>('')


type Props = {};

export function CreateArticlePage(props: Props) {

    const [editorState, setEditorState] = useState(
        () => EditorState.createEmpty(),
    );
    const isArticleCreated = useAppSelector(state => state.articles.isArticleCreated)
    const err = useAppSelector(state => state.articles.commonError)
    const dispatch = useAppDispatch()
    const [isAddLinkInputOpen, setAddLinkInputState] = useState(false)
    const fileInputRef = useRef() as React.MutableRefObject<HTMLInputElement>;

    const CreateArticleSchema = Yup.object().shape({
        header: Yup.string().required('Required'),
        category: Yup.string().required('Required'),
        description: Yup.string().required('Required'),
        text: Yup.object().required('Required'),
    })

    const formik = useFormik({
        initialValues: {
            header: '',
            description: '',
            category: '',
            mainImg: {
                file: '',
                src: ''
            },
            text: '',
            hyperLink: '',
        },
        validationSchema: CreateArticleSchema,
        onSubmit: values => {
            console.log(values)
        }
    })

    function onAddLink(e:any) {
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
            { url: hyperLink }
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
        const {header, description, mainImg, category} = formik.values
        if (mainImg.file) {
            const fd2 = new FormData()
            fd2.append('file', mainImg.file)
            const s3 = await articlesAPI.uploadImage(fd2)
            mainImg.src = s3.data
        }
        const contentState = await editorState.getCurrentContent()
        const entityKeys = convertToRaw(contentState).entityMap
        for (const key in entityKeys) {
            const {file} = entityKeys[key].data
            const fd = new FormData()
            fd.append('file', file)
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
            mainImg: mainImg.src,
            category,
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
                    if (name === 'mainImg') {
                        formik.setFieldValue('mainImg', {src: src, file: files[0]})
                    } else {
                        if (src) return pasteImg(src.toString(), files[0])
                    }
                }
            }
        }
    }

    function deleteMainImg() {
        setTimeout(() => {
            formik.setFieldValue('mainImg', {src: '', file: ''})
        }, 0)

    }

    function closeModal() {
        dispatch(setArticleCreatedState(false))
    }

    function closeErrModal() {
        dispatch(setCommonErr(''))
    }

    return <>
        {isArticleCreated === true && <ModalWindow smallModal={true} closeModal={closeModal} header={'Success'}
                                                   text='Article successfully created'/>}
        {err && <ModalWindow smallModal={true} closeModal={closeErrModal} header={'Failure'}
                             text={err}/>}
        <Content style={{padding: '60px 0'}}>
            <H1 style={{textAlign: 'center'}}>Add new articles</H1>

            <Form>
                <Input name='header' onChange={formik.handleChange} placeholder='Header'/>
                <TextArea name='description' onChange={formik.handleChange} placeholder='Description'/>
                <label htmlFor="upload">
                    <AddImgBtn flexDirection='column'
                               imgSrc={formik.values.mainImg.src || ''}>
                        {!formik.values.mainImg.src && <input ref={fileInputRef} name='mainImg' onChange={onAddImg}
                                                              style={{display: 'none'}}
                                                              type="file" accept='image/*' id={'upload'}/>
                        }
                        {formik.values.mainImg.src &&
                            <AiOutlineClose style={{position: 'absolute', left: '93%', top: '5%'}}
                                            color='#F05050' size={30} onClick={deleteMainImg}/>}
                        {!formik.values.mainImg.src && <>
                            <FaFileImage color='#525252' opacity='0.5' size={120}/>
                            <p>Add image</p>
                            <p>min. size - 1170x439</p>
                        </>
                        }
                    </AddImgBtn>
                </label>
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