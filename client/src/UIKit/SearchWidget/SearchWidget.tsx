import * as React from 'react';
import {useCallback, useState} from 'react';
import {IoSearch} from 'react-icons/io5'
import {ReactComponent as Close} from "../../assets/closeBurger.svg";
import {useAppSelector} from "../../redux/hooks/hooks";
import {NavLink} from "react-router-dom";
import {IArticlesPreview} from "../../redux/articles/articleTypes";
import {useClickOutside} from "../../services/useClickOutside";
import {StyledRoundBtn, StyledFlex} from "../BasicStyledComponents/basicStyledComponents";
import { GoSearch } from "react-icons/go";
import './searchWidget.scss'


interface PropsBase {
    inputWidth?: string,
    inputHeight?: string
}

interface MobileProps extends PropsBase {
    mob: true,
}

interface DesktopProps extends PropsBase {
    mob?: false,
}

type Props = MobileProps | DesktopProps


export const SearchWidget = (props: Props) => {
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
   const Articles = useCallback(() => {
       if(filteredArticles && filteredArticles?.length > 0) {
           return filteredArticles.map(el => {
               const pathData = [{
                   pathName: 'Home',
                   path: '/'
               },
               ]
               return <NavLink key={el.id} state={pathData} to={`/article/${el.id}`}>
                   {el.header}
               </NavLink>
           })
       } else {
           return <p className={'search__notFoundText'}>NO MATCHES FOUND</p>
       }
   }, [filteredArticles])
    return <main className={'search'}>
            <div ref={clickOutsideRef}>
                <StyledFlex>
                    <input className={'search__input'} onFocus={handleFocus} value={searchValue} onChange={handleChange}
                                     style={{width: props.inputWidth, height: props.inputHeight}} type="text" placeholder='Search'/>
                    <div className={'search__btn'}>
                        <IoSearch color={'white'} size={21}/>
                    </div>
                    </StyledFlex>
            {isSearchDropDownOpen && <div className={'search__dropdown'}>
                <div className={'search__dropdown__content'}>
                    {Articles()}
                </div>
            </div>}
            </div>
        </main>
};