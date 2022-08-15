import {PanelButton} from "./PanelButton";
import {Flex} from "../../../commonStyles/Flex.styled";
import {ImAttachment} from "react-icons/im";
import {BsFillBookmarkFill, BsImageFill} from "react-icons/bs";
import {MdArrowDropDown} from "react-icons/md";
import {useContext} from "react";
import {AddImageFnContext} from "../CreateArticlePage";
import {EditorPanelButton} from "./PanelButton";
import styled from "styled-components";

const Button = styled(EditorPanelButton)`
    position: relative;
  z-index: 1;
`

type Props = {};
export const EditorPanel = (props: Props) => {

    const addImageFn = useContext(AddImageFnContext)

    const BLOCK_TYPES_HEADINGS = [
        {label: 'h1', id: 'header-one'},
        {label: 'h2', id: 'header-two'},
        {label: 'h3', id: 'header-three'},
    ];
    const headers = BLOCK_TYPES_HEADINGS.map((el, index) => {
        return <PanelButton key={index} label={el.label} id={el.id}/>
    })
    return <Flex style={{marginBottom: '30px'}} justifyContent={'space-between'}>
        <Flex gap={'30px'}>
            {headers}
            <PanelButton id='unordered-list-item'>
                <p>• ...</p>
                <p>• ...</p>
            </PanelButton>
        </Flex>

        <Flex gap={'30px'}>
            <PanelButton>
                <ImAttachment/>
            </PanelButton>
                <Button>
                    <label htmlFor="upload2" style={{width:'100%',height:'100%', position:'absolute'}}></label>
                    <input type="file" id='upload2' style={{display:'none'}} onChange={addImageFn}/>
                    <BsImageFill/>
                </Button>
            <PanelButton>
                <Flex>
                    <BsFillBookmarkFill/>
                    <MdArrowDropDown/>
                </Flex>
            </PanelButton>
        </Flex>
    </Flex>
};