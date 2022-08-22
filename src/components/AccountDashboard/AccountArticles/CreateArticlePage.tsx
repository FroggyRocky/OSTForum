import {createContext, useRef, useState} from "react";
import {H1} from '../../commonStyles/h1.styled'
import {useFormik, Form as FormikForm} from "formik";
import {ArticleEditor} from "../ArticleEditor/ArticleEditor";
import styled, {css} from "styled-components";
import {Content} from "../../commonStyles/Content.styled";
import {FaFileImage} from "react-icons/fa";
import {BsFillCheckCircleFill} from "react-icons/bs";
import {convertToHTML} from 'draft-convert';
import {AtomicBlockUtils, convertToRaw, EditorState} from "draft-js";
import {Flex} from "../../commonStyles/Flex.styled";
import {useAppDispatch, useAppSelector} from "../../../redux/hooks/hooks";
import articlesAPI from "../../../api/articlesAPI";
import {AiOutlineClose} from "react-icons/ai";
import {ModalWindow} from "../../common/ModalWindow";
import {setArticleCreatedState, setArticleCreatingState} from "../../../redux/articles/articlesSlice";
import {createArticle} from "../../../redux/articles/articlesThunks";
import * as Yup from 'yup';


export const CreateArticlePageContext = createContext<any>('')

const BreakingLine = styled.hr`
  width: 100%;
  border: 1px solid #58649C;
  position: absolute;
  align-self: start;
`
const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 30px;
  margin-top: 60px;
`
const Input = styled.input`
  background: rgba(255, 255, 255, 0.3);
  box-shadow: 0px 4px 14px rgba(0, 0, 0, 0.15);
  border-radius: 10px;
  border: none;
  font-family: var(--family-text);
  height: 84px;
  color: #525252;
  font-size: 30px;
  line-height: 29px;
  font-weight: 700;
  display: block;
  width: 100%;
  padding: 30px;

  &:focus {
    outline: none;
  }
`
const TextArea = styled.textarea`
  background: rgba(255, 255, 255, 0.3);
  box-shadow: 0px 4px 14px rgba(0, 0, 0, 0.15);
  border-radius: 10px;
  border: none;
  font-family: var(--family-text);
  height: 240px;
  color: #272727;
  font-size: 25px;
  line-height: 35px;
  font-weight: 400;
  display: block;
  width: 100%;
  padding: 30px;
  resize: none;

  &:focus {
    outline: none;
  }
`
const AddImgBtn = styled(Flex)<{ imgSrc: string }>`
  height: 253px;
  border: none;
  background: rgba(255, 255, 255, 0.3);
  box-shadow: 0px 4px 14px rgba(0, 0, 0, 0.15);
  border-radius: 15px;
  color: #525252;
  position: relative;

  ${({imgSrc}) => imgSrc && css`
    background-image: url(${imgSrc});
    background-repeat: no-repeat;
    background-size: cover;
    width: 1170px;
    height: 439px;
    margin: auto auto;
    align-self: center;
    background-position: center;
  `}
  & > p {
    opacity: 0.5;
    font-weight: 400;
    font-family: var(--family-text);
  }

  & p:nth-child(3) {
    font-size: 25px;
    line-height: 24px;
    text-transform: uppercase;
    margin: 30px 0 10px 0;
  }

  & p:nth-child(4) {
    font-size: 20px;
    line-height: 19px;
  }
`
const AddArticleButton = styled.button`
  width: 100%;
  height: 244px;
  background: rgba(255, 255, 255, 0.3);
  box-shadow: 0px 4px 14px rgba(0, 0, 0, 0.15);
  border-radius: 15px;
  border: none;
  margin: 0px 0 60px 0;

  & > p {
    font-family: var(--family-text);
    font-weight: 400;
    font-size: 25px;
    line-height: 24px;
    text-transform: uppercase;
    color: #58649C;
    opacity: 0.5;
    margin-top: 18px;
  }
`

type Props = {};

export function CreateArticlePage(props:Props) {

const [editorState, setEditorState] = useState(
        () => EditorState.createEmpty(),
    );
    const isArticleCreated = useAppSelector(state => state.articles.isArticleCreated)
    const dispatch = useAppDispatch()

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
            text: ''
        },
        validationSchema: CreateArticleSchema,
        onSubmit: values => {
            console.log(values)
        }
    })

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
        dispatch(setArticleCreatedState(undefined))
    }

    return <>
        {isArticleCreated === true && <ModalWindow smallModal={true} closeModal={closeModal} header={'Success'}
                                                   text='Article successfully created'/>}
        {isArticleCreated === false && <ModalWindow smallModal={true} closeModal={closeModal} header={'Failure'}
                                                    text={'Something went wrong, article wasn\'t created'}/>}
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
            <CreateArticlePageContext.Provider value={{onAddImg: onAddImg}}>
                <ArticleEditor formik={formik} editorState={editorState} setEditorState={setEditorState}/>
            </CreateArticlePageContext.Provider>
            <AddArticleButton onClick={onAddArticle}>
                <BsFillCheckCircleFill size={120} opacity='0.5' color='#58649C'/>
                <p>Add Article</p>
            </AddArticleButton>
        </Content>
    </>
}