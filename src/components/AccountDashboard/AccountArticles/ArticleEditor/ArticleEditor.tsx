import {createContext, useEffect} from 'react'
import Draft, { RichUtils, CompositeDecorator} from 'draft-js';
import 'draft-js/dist/Draft.css'
import {EditorPanel} from "./EditorPanel";
import Editor from '@draft-js-plugins/editor';
import createImagePlugin from '@draft-js-plugins/image';
import './textareaEditor.css'



const imagePlugin = createImagePlugin();

function findLinkEntities(contentBlock:any, callback:any, contentState:any) {
    contentBlock.findEntityRanges(
        (character:any) => {
            const entityKey = character.getEntity();
            return (
                entityKey !== null &&
                contentState.getEntity(entityKey).getType() === 'LINK'
            );
        },
        callback
    );
}


const Link = (props:any) => {
    const {url} = props.contentState.getEntity(props.entityKey).getData();
    return (
        <a className={'hyperLink'} href={url} target={'_blank'} rel="noopener noreferrer">
            {props.children}
        </a>
    );
};

export const ArticleEditorContext = createContext<any>({})
type Props = {
    editorState: any;
    setEditorState: (prev: any) => any,
    formik:any
};



export const ArticleEditor = (props: Props) => {


    const decorators = new CompositeDecorator([
        {
            strategy: findLinkEntities,
            component: Link
        }
    ]);


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
        <div>
        <Editor decorators={[decorators]} plugins={[imagePlugin]} editorState={props.editorState} onChange={onChange}/>
        </div>
    </div>
};