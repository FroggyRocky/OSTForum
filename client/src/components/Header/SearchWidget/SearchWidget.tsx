import * as React from 'react';
import {useState} from 'react';
import {IoSearch} from 'react-icons/io5'
import {useAppDispatch, useAppSelector} from "../../../redux/storeHooks/storeHooks";
import {NavLink} from "react-router-dom";
import {useClickOutside} from "../../../services/useClickOutside";
import {StyledRoundBtn, StyledFlex} from "../../../UIKit/BasicStyledComponents/basicStyledComponents";
import {useDebounce} from "../../../services/useDebounce";
import {searchArticle} from "../../../redux/articles/articlesThunks";
import './searchWidget.scss'
import {Loader} from "../../../UIKit/Loader/Loader";
import {setSearchValue} from "../../../redux/articles/articlesSlice";
import {setSearchingState} from "../../../redux/articles/articlesSlice";

interface PropsBase {
    inputWidth?: string,
    inputHeight?: string
}

interface MobileProps extends PropsBase {
    mob: true,
}

interface DesktopProps extends PropsBase {

}

type Props = MobileProps | DesktopProps


export const SearchWidget = (props: Props) => {
    const [isSearchDropDownOpen, setSearchDropDownState] = useState(false)
    const [searchValue, setLocalSearchValue] = useState('')
    const clickOutsideRef = useClickOutside(handleCloseSearch)
    const isSearching =  useAppSelector(state => state.articles.isSearching)
    const searchedArticles = useAppSelector(state => state.articles.searchResult.foundArticles)
    const dispatch = useAppDispatch()
    useDebounce(() => dispatch(searchArticle(searchValue)), 1000, [searchValue])

    function handleChange(e: any) {
        dispatch(setSearchingState(true))
        const value = e.target.value
        setLocalSearchValue(value)
        dispatch(setSearchValue(value))
        setSearchDropDownState(true)
        if (!value) {
            setSearchDropDownState(false)
            dispatch(setSearchingState(false))
        }
    }

    function handleCloseSearch() {
        setSearchDropDownState(false)
    }

    function handleFocus() {
        if (searchValue) {
            setSearchDropDownState(true)
        }
    }

    const articleComponents = searchedArticles.slice(0, 4).map(el => {
        const pathData = [{
            pathName: 'Home',
            path: '/'
        },
        ]
        return <NavLink key={el.id} state={pathData} to={`/article/${el.id}`}>
            {el.header}
        </NavLink>
    })
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
                    {isSearching ? <Loader /> :
                    searchedArticles.length > 0 ? articleComponents :
                        <p className={'search__notFoundText'}>NO MATCHES FOUND</p>
                    }
                </div>
                {searchedArticles.length > 0 && !isSearching && <div className={'search__dropdown__showMore'}>
                    <NavLink to={'/search'} className={'search__dropdown__showMore__text'}>Check Results</NavLink>
                </div>
                }
            </div>}
        </div>
    </main>
};