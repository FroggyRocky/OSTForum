import {EditorPanelButton, PanelButton} from "./PanelButton";
import {RichUtils} from 'draft-js'
import {Flex} from "../../../commonStyles/Flex.styled";
import {AiOutlineLink} from "react-icons/ai";
import {BsFillBookmarkFill, BsImageFill} from "react-icons/bs";
import {MdArrowDropDown} from "react-icons/md";
import {useContext} from "react";
import {CreateArticlePageContext} from "../CreateArticle";
import styled from "styled-components";
import {DropDown} from "../../../common/DropDown";
import {useAppSelector} from "../../../../redux/hooks/hooks";
import {useClickOutside} from "../../../../services/useClickOutside";

const Button = styled(EditorPanelButton)`
  position: relative;
  z-index: 1;
  cursor: pointer;
`
const CategoryContainer = styled.div`
  position: relative;
`
const Input = styled.input`
  border: none;
  border-radius: 8px;
  background-color: rgba(255, 255, 255, 0.62);
  font-family: var(--family-text);
  color: #58649C;
  font-weight: 400;
  font-size: 18px;
  line-height: 32px;
  padding: 0 5px;
`
const LinkBtn = styled.button`
  font-family: var(--family-text);
  border: none;
  border-radius: 8px;
  margin-left: 10px;
  width: 60px;
  height: 30px;
  background-color: rgba(255, 255, 255, 0.62);
  color: #58649C;
  font-weight: 400;
  font-size: 15px;
`

interface IUserContext {
    removeLink: () => void,
    onAddImg: () => void,
    onAddLink: () => void,
    confirmLink: () => void,
    setAddLinkInputState: (state: boolean) => void,
    isAddLinkInputOpen: boolean
}

type Props = {
    formik: any,
    editorState: any;
};
export const EditorPanel = (props: Props) => {


    const CreateArticleContext = useContext<IUserContext>(CreateArticlePageContext)
    const {setTouched: setCategoryTouched, setValue: setCategoryValue} = props.formik.getFieldHelpers('category')
    const {value: categoryValue, touched: categoryTouched} = props.formik.getFieldMeta('category')
    const {setValue: setHyperLinkValue} = props.formik.getFieldHelpers('hyperLink')
    const {value: hyperLinkValue} = props.formik.getFieldMeta('hyperLink')
    const categories = useAppSelector(state => state.auth.configs.categories)
    const linkFiledRef = useClickOutside(closeLinkField)
    const linkButtonRef = useClickOutside(closeLinkField)
    const BLOCK_TYPES_HEADINGS = [
        {label: 'h1', id: 'header-one'},
        {label: 'h2', id: 'header-two'},
        // {label: 'h3', id: 'header-three'},
    ];
    const headers = BLOCK_TYPES_HEADINGS.map((el, index) => {
        return <PanelButton key={index} active={stateActive(el.id)} editorState={props.editorState} id={el.id}
                            label={el.label}/>
    })

    function closeLinkField() {
        CreateArticleContext.setAddLinkInputState(false)
    }

    function stateActive(id: string) {
        const currentBlockType = RichUtils.getCurrentBlockType(props.editorState);
        return currentBlockType === id;
    }

    function handleHyperLinkChange(e: any) {
        const value = e.target.value
        setHyperLinkValue(value)
    }

    function handleLinkInputBlur() {
        setTimeout(() => {
            CreateArticleContext.setAddLinkInputState(false)
        }, 100)
    }

    return <>
        <Flex style={{marginBottom: '30px'}} justifyContent={'space-between'}>
            <Flex gap={'30px'}>
                {headers}
                <PanelButton active={stateActive('unordered-list-item')} editorState={props.editorState}
                             id='unordered-list-item'>
                    <p>• ...</p>
                    <p>• ...</p>
                </PanelButton>
            </Flex>
            <Flex gap={'30px'}>
                <Button ref={linkButtonRef} onClick={CreateArticleContext.onAddLink}>
                    <AiOutlineLink size={35}/>
                </Button>
                <Button type={'button'}>
                    <label htmlFor="upload2" style={{width: '100%', height: '100%', position: 'absolute'}}></label>
                    <input type="file" id='upload2' style={{display: 'none'}} onChange={CreateArticleContext.onAddImg}/>
                    <BsImageFill/>
                </Button>
                <CategoryContainer onClick={() => setCategoryTouched(!categoryTouched)} tabIndex={0}>
                    <Button>
                        <Flex style={{cursor: 'pointer'}}>
                            <BsFillBookmarkFill/>
                            <MdArrowDropDown/>
                        </Flex>
                    </Button>
                    <DropDown setValue={setCategoryValue} setTouched={setCategoryTouched} value={categoryValue}
                              touched={categoryTouched}
                              selectOptions={categories}/>
                </CategoryContainer>
            </Flex>
        </Flex>
        {CreateArticleContext.isAddLinkInputOpen &&
            <div style={{margin: '10px 0', textAlign: 'end'}} ref={linkFiledRef}>
                <Input onBlur={handleLinkInputBlur} type="text" name={'hyperLink'} value={hyperLinkValue}
                       onChange={handleHyperLinkChange}/>
                <LinkBtn type={'button'} onClick={CreateArticleContext.confirmLink}>Add</LinkBtn>
                <LinkBtn type={'button'} style={{color: '#F05050', width: '90px'}}
                         onClick={CreateArticleContext.removeLink}>Remove</LinkBtn>
            </div>
        }
    </>
};

