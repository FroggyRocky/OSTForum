import {EditorPanelButton, PanelButton} from "./PanelButton";
import {RichUtils} from 'draft-js'
import {Flex} from "../../common/commonStyles/Flex.styled";
import {AiOutlineLink} from "react-icons/ai";
import {BsFillBookmarkFill, BsImageFill} from "react-icons/bs";
import {MdArrowDropDown} from "react-icons/md";
import {useContext, useState} from "react";
import {CreateArticlePageContext} from "../AccountArticles/CreateArticle";
import styled from "styled-components";
import {DropDown} from "../../common/DropDown";
import {useAppSelector} from "../../../redux/hooks/hooks";
import {useClickOutside} from "../../../services/useClickOutside";

const Button = styled(EditorPanelButton).attrs(props => ({
    type: 'button',
}))`
  position: relative;
  z-index: 1;
  cursor: pointer;
  type:button;
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
const LinkBtn = styled.button.attrs(props => ({
    type: 'button',
}))`
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
    const {setValue: setCategoryFormValue} = props.formik.getFieldHelpers('categoryIds')
    const {value: categoryFormValue} = props.formik.getFieldMeta('categoryIds')
    const [isCategoryDropDownOpen, setCategoryDropDownState] = useState(false)
    const {setValue: setHyperLinkValue} = props.formik.getFieldHelpers('hyperLink')
    const {value: hyperLinkValue} = props.formik.getFieldMeta('hyperLink')
    const categoryFlagsRef = useClickOutside(closeCategoryFlagsSelector)
    const categories = useAppSelector(state => state.authConfigs.configs.categories)
    const BLOCK_TYPES_HEADINGS = [
        {label: 'h1', id: 'header-one'},
        {label: 'h2', id: 'header-two'},
    ];
    const headers = BLOCK_TYPES_HEADINGS.map((el, index) => {
        return <PanelButton key={index} active={stateActive(el.id)} editorState={props.editorState} id={el.id}
                            label={el.label}/>
    })
    function chooseCategory(option:{id:number, name:string}) {
        const {id} = option;
        const prevValue:number[] = categoryFormValue;
        if(!prevValue || prevValue.length <= 0) {
            setCategoryFormValue([id])
        } else {
            if (!prevValue?.includes(id)) {
                setCategoryFormValue([...prevValue, id])
            } else if (prevValue?.includes(id)) {
                const filteredCategoryIds = prevValue?.filter(categoryId => +categoryId !== +id)
                setCategoryFormValue(filteredCategoryIds)
            }
        }
    }
    function closeCategoryFlagsSelector() {
        setCategoryDropDownState(false)
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
                <Button onClick={CreateArticleContext.onAddLink}>
                    <AiOutlineLink size={35}/>
                </Button>
                <Button>
                    <label htmlFor="upload2" style={{width: '100%', height: '100%', position: 'absolute'}}></label>
                    <input type="file" id='upload2' style={{display: 'none'}} onChange={CreateArticleContext.onAddImg}/>
                    <BsImageFill/>
                </Button>
                <CategoryContainer ref={categoryFlagsRef}>
                    <Button onClick={() => setCategoryDropDownState(prev => !prev)}>
                        <Flex style={{cursor: 'pointer'}}>
                            <BsFillBookmarkFill/>
                            <MdArrowDropDown/>
                        </Flex>
                    </Button>
                    <DropDown setValue={chooseCategory} setTouched={setCategoryDropDownState} currentValue={categoryFormValue}
                              isOpen={isCategoryDropDownOpen}
                              selectOptions={categories}/>
                </CategoryContainer>
            </Flex>
        </Flex>
        {CreateArticleContext.isAddLinkInputOpen &&
            <div style={{margin: '10px 0', textAlign: 'end'}}>
                <Input onBlur={handleLinkInputBlur} autoFocus  type="text" name={'hyperLink'} value={hyperLinkValue}
                       onChange={handleHyperLinkChange}/>
                <LinkBtn type={'button'} onClick={CreateArticleContext.confirmLink}>Add</LinkBtn>
                <LinkBtn type={'button'} style={{color: '#F05050', width: '90px'}}
                         onClick={CreateArticleContext.removeLink}>Remove</LinkBtn>
            </div>
        }
    </>
};

