import {EditorPanelButton, PanelButton} from "./PanelButton";
import {RichUtils} from 'draft-js'
import {Flex} from "../../commonStyles/Flex.styled";
// import {ImAttachment} from "react-icons/im";
import {BsFillBookmarkFill, BsImageFill} from "react-icons/bs";
import {MdArrowDropDown} from "react-icons/md";
import {useContext} from "react";
import {CreateArticlePageContext} from "../AccountArticles/CreateArticlePage";
import styled from "styled-components";
import {DropDown} from "../../common/DropDown";
import {useAppSelector} from "../../../redux/hooks/hooks";


const Button = styled(EditorPanelButton)`
  position: relative;
  z-index: 1;
`
const CategoryContainer = styled.div`
  position: relative;

`


type Props = {
    formik: any,
    editorState: any;
};
export const EditorPanel = (props: Props) => {

    const CreateArticleContext = useContext<{ onAddImg: () => void }>(CreateArticlePageContext)
    const {setTouched, setValue} = props.formik.getFieldHelpers('category')
    const {value, touched} = props.formik.getFieldMeta('category')
    const categories = useAppSelector(state => state.auth.configs.categories)
    const BLOCK_TYPES_HEADINGS = [
        {label: 'h1', id: 'header-one'},
        {label: 'h2', id: 'header-two'},
        {label: 'h3', id: 'header-three'},
    ];
    const headers = BLOCK_TYPES_HEADINGS.map((el, index) => {
        return <PanelButton active={stateActive(el.id)} editorState={props.editorState}  id={el.id} label={el.label}/>
    })

    function stateActive (id: string) {
        const currentBlockType = RichUtils.getCurrentBlockType(props.editorState);
        return currentBlockType === id;
    }


    return <Flex style={{marginBottom: '30px'}} justifyContent={'space-between'}>
        <Flex gap={'30px'}>
            {headers}
            <PanelButton active={stateActive('unordered-list-item')} editorState={props.editorState} id='unordered-list-item'>
                <p>• ...</p>
                <p>• ...</p>
            </PanelButton>
        </Flex>

        <Flex gap={'30px'}>
            <Button>
                <label htmlFor="upload2" style={{width: '100%', height: '100%', position: 'absolute'}}></label>
                <input type="file" id='upload2' style={{display: 'none'}} onChange={CreateArticleContext.onAddImg}/>
                <BsImageFill/>
            </Button>
            <CategoryContainer onClick={() => setTouched(!touched)} tabIndex={0}>
                <Button>
                    <Flex style={{cursor: 'pointer'}}>
                        <BsFillBookmarkFill/>
                        <MdArrowDropDown/>
                    </Flex>
                </Button>
                <DropDown setValue={setValue} setTouched={setTouched} value={value} touched={touched}
                          selectOptions={categories}/>
            </CategoryContainer>
        </Flex>
    </Flex>
};

