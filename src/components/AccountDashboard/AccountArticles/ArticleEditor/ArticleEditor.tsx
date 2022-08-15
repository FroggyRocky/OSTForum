import {createContext, useEffect} from 'react'
import {AtomicBlockUtils, RichUtils} from 'draft-js';
import 'draft-js/dist/Draft.css'
import {EditorPanel, } from "./EditorPanel";
import Editor from '@draft-js-plugins/editor';
import createImagePlugin from '@draft-js-plugins/image';
import './textareaEditor.css'


const imagePlugin = createImagePlugin();

export const ArticleEditorContext = createContext<any>({})
type Props = {
    editorState: any;
    setEditorState: (prev: any) => any
};



export const ArticleEditor = (props: Props) => {

    function onChange(editorState: any) {
        props.setEditorState(editorState)
    }


    function onPanelToggle(type: string) {
        onChange((RichUtils.toggleBlockType(props.editorState, type)))
    }

    return <div style={{margin: '60px 0'}}>
        <ArticleEditorContext.Provider value={{onPanelToggle}}>
            <EditorPanel />
        </ArticleEditorContext.Provider>
        <Editor plugins={[imagePlugin]} editorState={props.editorState} onChange={props.setEditorState}/>
    </div>
};