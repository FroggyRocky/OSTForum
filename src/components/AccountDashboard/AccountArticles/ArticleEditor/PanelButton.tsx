import styled, {css} from "styled-components";
import {useContext, useEffect, useState} from "react";
import {ArticleEditorContext} from './ArticleEditor'
import {RichUtils} from 'draft-js'

export const EditorPanelButton = styled.button<{ active?: boolean }>`
  width: 80px;
  height: 50px;
  cursor: pointer;
  background: rgba(255, 255, 255, 0.3);
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.15);
  border-radius: 10px;
  font-family: var(--family-text);
  font-weight: 400;
  font-size: 25px;
  line-height: 24px;
  color: #525252;
  border: none;
  ${({active}) => active === true && css`
    font-weight: 800;
    color: white;
    background-color: #58649C;
  `}
`

type Props = {
    label?: string
    id: string
    children?: JSX.Element[] | JSX.Element,
    editorState?: any,
    active: boolean
};

export const PanelButton = (props: Props) => {

    const [activeBlockButton, setActiveBlockButton] = useState('')

    useEffect(() => {
        const currentBlock = RichUtils.getCurrentBlockType(props.editorState)
        if (currentBlock) {
            setActiveBlockButton(currentBlock)
        }
    }, [RichUtils.getCurrentBlockType(props.editorState)])

    const ArticleEditorProps = useContext(ArticleEditorContext)


    return <EditorPanelButton type='button' active={activeBlockButton === props.id}
                              onMouseDown={() => ArticleEditorProps.onPanelToggle(props.id)}>
        {props.label || props.children}
    </EditorPanelButton>
};