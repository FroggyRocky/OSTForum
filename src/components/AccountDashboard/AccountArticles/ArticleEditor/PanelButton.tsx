import styled from "styled-components";
import {useContext} from "react";
import {ArticleEditorContext} from './ArticleEditor'

export const EditorPanelButton = styled.button`
    width: 80px;
  height: 50px;
  background: rgba(255, 255, 255, 0.3);
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.15);
  border-radius: 10px;
  font-family: var(--family-text);
  font-weight: 400;
  font-size: 25px;
  line-height: 24px;
  color: #525252;
  border: none;
`

type Props = {
label?:string
    id?:string
    children?:JSX.Element[] | JSX.Element;
};

export const PanelButton = (props: Props) => {

const ArticleEditorProps = useContext(ArticleEditorContext)

    return <EditorPanelButton onClick={() => ArticleEditorProps.onPanelToggle(props.id)}>
        {props.label || props.children}
    </EditorPanelButton>
};