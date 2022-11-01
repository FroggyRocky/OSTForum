// @flow
import * as React from 'react';
import {useState} from 'react';
import {IoSearch} from 'react-icons/io5'
import {Flex} from "../common/commonStyles/Flex.styled";
import styled from "styled-components";
import {ReactComponent as Close} from "../../assets/closeBurger.svg";
import {useAppSelector} from "../../redux/hooks/hooks";
import {NavLink} from "react-router-dom";
import {IArticlesPreview} from "../../redux/articles/articleTypes";
import {useClickOutside} from "../../services/useClickOutside";

const Wrapper = styled.div`
  position: relative;
`
const IconContainer = styled(Flex)`
  width: 30px;
  height: 30px;
  background-color: #D9E3EC;
  border-radius: 5px;
`
const Input = styled.input`
  border: none;
  height: 30px;
  border-radius: 5px;
  padding-left: 10px;

  &::placeholder {
    font-family: 'Gotham Pro', sans-serif;
    font-weight: 400;
    font-size: 14px;
    line-height: 15px;
    color: #D9D9D9;
  }

  &:focus {
    outline: none;
  }

`
const SearchDropDown = styled.div`
  background-color: white;
  color: black;
  font-family: var(--family-text);
  font-weight: 400;
  font-size: 16px;
  line-height: 32px;
  width: 457px;
  height: 204px;
  position: absolute;
  top: 150%;
  right: 0;
  border-radius: 10px;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 5px;
    margin: 0;
    border: none;
  }

  &::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  }

  &::-webkit-scrollbar-thumb {
    background-color: darkgrey;
  }
`
const NoMatchedFound = styled.p`
    font-family: var(--family-header);
  color: #bdc1c9;
  text-align: center;
  margin-top: 18%;
`
const SearchDropDownContent = styled.div`
  padding: 5px 0px;
  color: black;
  text-decoration: none;
  & > a {
    text-decoration: none;
    display: block;
    color: black;
    font-family: var(--family-text);
    white-space: nowrap;
    overflow-x: hidden;
    text-overflow: ellipsis;
    cursor: pointer;
    padding: 10px 0 10px 10px;
    border-radius: 10px;
  }
  

  & > a:hover {
    background-color: #D9E3EC;
    font-weight: bold;
  }

`

interface PropsBase {
    inputWidth?: string,
    inputHeight?: string
}

interface MobileProps extends PropsBase {
    mob: true,
    onToggleMobSearch: (state: boolean) => void
}

interface DesktopProps extends PropsBase {
    mob?: false,
    onToggleMobSearch?: (state: boolean) => void
}

type Props = MobileProps | DesktopProps


export const Search = (props: Props) => {
    const [isSearchDropDownOpen, setSearchDropDownState] = useState(false)
    const [searchValue, setSearchValue] = useState('')
    const [filteredArticles, setFilteredArticles] = useState<Array<IArticlesPreview>>()
    const clickOutsideRef = useClickOutside(handleCloseSearch)
    const articles = useAppSelector(state => state.articles.articles)

    function handleChange(e: any) {
        const value = e.target.value
        setSearchValue(value)
        if(value) {
            setSearchDropDownState(true)
            const filtered = articles.filter(el => el.header.toLowerCase().includes(value.toLowerCase()))
            setFilteredArticles(filtered)
        } else {
            setSearchDropDownState(false)
            setFilteredArticles([])
        }
    }
function handleCloseSearch() {
    setSearchDropDownState(false)
}
function handleFocus() {
        if(searchValue) {
            setSearchDropDownState(true)
        }
}
   const Articles = () => {
        if(filteredArticles && filteredArticles?.length > 0) {
           return filteredArticles.map(el => {
                const pathData = [{
                    pathName: 'Home',
                    path: '/'
                },
                ]
                return <NavLink key={el.id} state={pathData} to={`/article/${encodeURI(el.header)}`}>
                    {el.header}
                </NavLink>
            })
        } else {
            return <NoMatchedFound>NO MATCHES FOUND</NoMatchedFound>
        }
   }
    return (<Wrapper>
            <div ref={clickOutsideRef}>
            <Flex>
                <Input onFocus={handleFocus} value={searchValue} onChange={handleChange}
                       style={{width: props.inputWidth, height: props.inputHeight}} type="text" placeholder='Search'/>
                {props.mob ?
                    <Close onClick={() => props.onToggleMobSearch(false)}
                           style={{width: '22px', height: '20px'}}/>
                    :
                    <IconContainer>
                        <IoSearch/>
                    </IconContainer>
                }
            </Flex>
            {isSearchDropDownOpen && <SearchDropDown>
                <SearchDropDownContent>
                    {Articles()}
                </SearchDropDownContent>
            </SearchDropDown>}
            </div>
        </Wrapper>
    );
};