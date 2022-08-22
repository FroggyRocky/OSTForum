import {createContext, useEffect} from 'react'
import { RichUtils} from 'draft-js';
import 'draft-js/dist/Draft.css'
import {EditorPanel, } from "./EditorPanel";
import Editor from '@draft-js-plugins/editor';
import createImagePlugin from '@draft-js-plugins/image';
import './textareaEditor.css'
import styled from "styled-components";
import {Formik, FormikProps} from "formik";

const imagePlugin = createImagePlugin();
const EditorWrapper = styled.div`

`



export const ArticleEditorContext = createContext<any>({})
type Props = {
    editorState: any;
    setEditorState: (prev: any) => any,
    formik:any
};



export const ArticleEditor = (props: Props) => {





    function onChange(editorState: any) {
        props.formik.setFieldValue('text', editorState)
        props.setEditorState(editorState)
    }


    function onPanelToggle(type: string) {
        onChange((RichUtils.toggleBlockType(props.editorState, type)))
    }

    return <div style={{margin: '60px 0'}}>
        <ArticleEditorContext.Provider value={{onPanelToggle}}>
            <EditorPanel editorState={props.editorState}  formik={props.formik} />
        </ArticleEditorContext.Provider>
        <EditorWrapper>
        <Editor plugins={[imagePlugin]} editorState={props.editorState} onChange={onChange}/>
        </EditorWrapper>
    </div>
};