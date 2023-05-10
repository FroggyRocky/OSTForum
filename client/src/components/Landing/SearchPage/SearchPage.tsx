import './searchPage.scss'
import {useState} from "react";
import {StyledContent, StyledH1, StyledWrapper} from "../../../UIKit/BasicStyledComponents/basicStyledComponents";
import {Layout} from "../../../UIKit/GeneralLayout/Layout";
import {useAppDispatch, useAppSelector} from "../../../redux/storeHooks/storeHooks";
import {Card} from '../Articles/Card'
import {findCategoryObjById} from "../../../services/categoryFlags";
import defaultCardCover from "../../../assets/defaultCardCover.png";
import {ArticlesContainer} from "../Articles/articles.styles";
import {SearchInput} from "../../../UIKit/Form/SearchInput/SearchInput";
import {setSearchValue, setSearchingState} from "../../../redux/articles/articlesSlice";
import {useDebounce} from "../../../services/useDebounce";
import {searchArticle} from "../../../redux/articles/articlesThunks";
import {Loader} from "../../../UIKit/Loader/Loader";
import {Pagination} from "../../../UIKit/Pagination/Pagination";
import {TelegramBtn} from "../../../UIKit/TelegramBtn/TelegramBtn";
type Props = {};

export function SearchPage(props: Props) {
    const searchResults = useAppSelector(state => state.articles.searchResult.foundArticles)
    const totalResults = useAppSelector(state => state.articles.searchResult.total)
    const categories = useAppSelector(state => state.authConfigs.configs.categories)
    const searchValue = useAppSelector(state => state.articles.searchValue)
    const isSearching = useAppSelector(state => state.articles.isSearching)
    const [currentPage, setCurrentPage] = useState(0)
    const dispatch = useAppDispatch()
    useDebounce(handleDebounceCallback, 1000, [searchValue])
    const historyPath = [
        {
            pathName: 'Search',
            path: '/search'
        },
        {
            pathName: 'Article',
            path: '/#articles__main'
        }
    ]

    function handlePageChange(page: number) {
        setCurrentPage(page)
        dispatch(searchArticle(searchValue, page + 1))
    }

    function handleDebounceCallback() {
        dispatch(searchArticle(searchValue))
    }

    const searchResultComponents = searchResults.map(el => {
        const cardCategories = () => {
            if (!el.categoryIds || el.categoryIds.length === 0) return;
            return findCategoryObjById(el.categoryIds, categories)
        }
        return <Card key={el.id} header={el.header}
                     coverImg_withText={el.coverImg_withText || el.coverImg_withOutText || defaultCardCover}
                     description={el.description} id={el.id}
                     dislikes={el.usersDisliked?.length || 0} likes={el.usersLiked?.length || 0}
                     views={el.usersViewed?.length || 0} historyPath={historyPath}
                     previewDescription={el.previewDescription}
                     categories={cardCategories() || []}
                     comments={el.comments?.length || 0} createdAt={el.createdAt}/>
    })

    function handleChange(e: any) {
        dispatch(setSearchingState(true))
        const value = e.target.value
        setCurrentPage(0)
        dispatch(setSearchValue(value))
    }

    return <Layout>
        <StyledWrapper>
            <div className={'searchPage'}>
                <StyledH1>Search Results on:</StyledH1>
                <div className={'searchPage__searchInput'}>
                    <SearchInput value={searchValue} handleChange={handleChange}/>
                </div>
                <div className={'searchPage__cards'}>
                    {isSearching ? <div className='searchPage__loader'><Loader/></div> : searchResultComponents}
                </div>
                {!isSearching && <Pagination currentPage={currentPage} changePage={handlePageChange} limit={8}
                            totalItems={totalResults}/> }
            </div>
        </StyledWrapper>

    </Layout>
};