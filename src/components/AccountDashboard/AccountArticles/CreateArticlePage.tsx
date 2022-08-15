import {createContext, useRef, useState} from "react";
import {H1} from '../../commonStyles/h1.styled'
import {useFormik} from "formik";
import {ArticleEditor} from "./ArticleEditor/ArticleEditor";
import styled, {css} from "styled-components";
import {Content} from "../../commonStyles/Content.styled";
import {FaFileImage} from "react-icons/fa";
import {BsFillCheckCircleFill} from "react-icons/bs";
import {convertToHTML} from 'draft-convert';
import {AtomicBlockUtils, EditorState, convertToRaw} from "draft-js";
import {Flex} from "../../commonStyles/Flex.styled";
import {useAppDispatch, useAppSelector} from "../../../redux/hooks/hooks";
import articlesAPI from "../../../api/articlesAPI";
import ArticlesAPI from "../../../api/articlesAPI";

export const AddImageFnContext = createContext<any>('')
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
    background-size: contain;
    background-repeat: no-repeat;
    width: 100%;
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
export const CreateArticlePage = (props: Props) => {
    const [editorState, setEditorState] = useState(
        () => EditorState.createEmpty(),
    );
    const dispatch = useAppDispatch()
    const currentEditedArticletate = useAppSelector(state => state.currentEditedArticle)
    const fileInputRef = useRef() as React.MutableRefObject<HTMLInputElement>;
    const formik = useFormik({
        initialValues: {
            header: '',
            description: '',
            mainImg: {
                file: '',
                src: ''
            }
        },
        onSubmit: values => {
            console.log(values)
        }
    })

    async function onAddArticle() {
        const {header, description, mainImg} = formik.values
        const fd2 = new FormData()
        fd2.append('file', mainImg.file)
        const s3 = await articlesAPI.uploadImage(fd2)
        mainImg.src = s3.data
        const contentState = await editorState.getCurrentContent()
        const entityKeys = convertToRaw(contentState).entityMap
        for(const key in entityKeys) {
            const {file} = entityKeys[key].data
            const fd = new FormData()
            fd.append('file', file)
            const s3 = await articlesAPI.uploadImage(fd)
            entityKeys[key].data.src = s3.data
        }
        // const html = convertToHTML({
        //     styleToHTML: (style) => {
        //         console.log(style)
        //         if (style === 'BOLD') {
        //             console.log(style)
        //             return <span style={{color: 'blue'}} />;
        //         }
        //     },
        //     blockToHTML: (block) => {
        //         console.log(block.type)
        //         if (block.type === 'header-three') {
        //             console.log(block)
        //             return <p />;
        //         } else if(block.type === 'unordered-list-item') {
        //
        //         } else if(block.type === 'header-two')
        //     },
        //     entityToHTML: (entity, originalText) => {
        //         if (entity.type === 'IMAGE') {
        //             return <img src={entity.data.src} alt='article_image' />;
        //         }
        //         return originalText;
        //     }
        //     })(editorState.getCurrentContent());
//         const data = {
//             header,
//             description,
//             mainImg:mainImg.src,
//             text: html
//         }
// const res = await articlesAPI.createArticle(data)
//
    }

    async function pasteImg(src: string, file:File) {
        const contentState = await editorState.getCurrentContent();
        const contentStateWithEntity = await contentState.createEntity("IMAGE", "MUTABLE",
            {src: src, id: '2', file:file},)
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
                        formik.setFieldValue('mainImg', {src:src, file:files[0]})
                    } else {
                        if (src) return pasteImg(src.toString(), files[0])
                    }
                }
            }
        }
    }

    return <>
        <Content style={{padding: '60px 0'}}>
            <H1 style={{textAlign: 'center'}}>Add new articles</H1>
            <Form>
                <Input name='header' onChange={formik.handleChange} placeholder='Header'/>
                <TextArea name='description' onChange={formik.handleChange} placeholder='Description'/>
                <label htmlFor="upload">
                    <AddImgBtn flexDirection='column'
                               imgSrc={formik.values.mainImg.src || ''}>
                        <input ref={fileInputRef} name='mainImg' onChange={onAddImg}
                               style={{display: 'none'}}
                               type="file" accept='image/*' id={'upload'}/>
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
            <AddImageFnContext.Provider value={onAddImg}>
                <ArticleEditor editorState={editorState} setEditorState={setEditorState}/>
            </AddImageFnContext.Provider>
            <AddArticleButton onClick={onAddArticle}>
                <BsFillCheckCircleFill size={120} opacity='0.5' color='#58649C'/>
                <p>Add Article</p>
            </AddArticleButton>
        </Content>
    </>
};