import {StyledContent} from "../../../UIKit/BasicStyledComponents/basicStyledComponents";
import {Card} from './Card'
import {Pagination} from "../../../UIKit/Pagination/Pagination";
import {TelegramBtn} from "../../../UIKit/TelegramBtn/TelegramBtn";
import {useAppDispatch, useAppSelector} from "../../../redux/storeHooks/storeHooks";
import {useState} from "react";
import defaultCardCover from '../../../assets/defaultCardCover.png'
import {ArticlesContainer, CategoriesContainer, Category} from './articles.styles'
import {findCategoryObjById} from "../../../services/categoryFlags";
import {fetchArticles} from "../../../redux/articles/articlesThunks";
import {PageLoader} from "../../../UIKit/PageLoader/PageLoader";

type Props = {
    articlesPageRef: any
}


export const Articles = (props: Props) => {
    const dispatch = useAppDispatch()
    const articlesData = useAppSelector(state => state.articles.articles)
    const totalNumOfArticles = useAppSelector(state => state.articles.totalCountOfArticles)
    const categories = useAppSelector(state => state.authConfigs.configs.categories)
    const [currentPage, setCurrentPage] = useState(0)
    const [selectedCategoryIds, setSelectedCategoryIds] = useState<Array<number> | []>([])
    const [isArticlesLoading, setArticleLoadState] = useState(false)
    const historyPath = [
        {
            pathName: 'Home',
            path: '/'
        },
        {
            pathName: 'Article',
            path: '/#articles__main'
        }
    ]

    function isSelected(properIds: number[], selectedIds: number[]) {
        return selectedIds.some(id => properIds.indexOf(id) >= 0)
    }

    const categoryComponents = categories.map(el => {
        if (el.name !== 'facebook' && el.name !== 'instagram') {
            return <Category key={el.id} isSelected={isSelected(selectedCategoryIds, [el.id])}
                             onClick={() => selectTopic([el.id])}>{el.name}</Category>
        }
    })

    const articleComponents = articlesData.map((el, index) => {
            const cardCategories = () => {
                if(!el.categoryIds || el.categoryIds.length === 0) return;
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

    function findInstAndFbCategoryId() {
        const instAndFbCategoryIds: number[] = []
        categories.forEach(category => {
            if (category.name === 'instagram' || category.name === 'facebook') {
                instAndFbCategoryIds.push(category.id)
            }
        })
        return instAndFbCategoryIds
    }

    async function selectTopic(topicIds: number[]) {
        setArticleLoadState(true)
        if (selectedCategoryIds.some(el => topicIds.indexOf(el) >= 0)) {
            setCurrentPage(0)
            setSelectedCategoryIds([])
           await dispatch(fetchArticles(1, []))
        } else {
            setCurrentPage(1)
            setSelectedCategoryIds([...topicIds])
           await dispatch(fetchArticles(1,[...topicIds]))
        }
        setArticleLoadState(false)
    }
    async function changePage(page:number) {
        setArticleLoadState(true)
        setCurrentPage(page);
        await dispatch(fetchArticles(page + 1, selectedCategoryIds))
        setArticleLoadState(false)
        setTimeout(() => {
            props.articlesPageRef.current.scrollIntoView({ behavior: "smooth", block: "start" })
        }, 100)
    }
    return <>
        <div style={{padding: '0px 0 60px 0'}}>
            <StyledContent>
                <div ref={props.articlesPageRef}></div>
                <CategoriesContainer>
                    <Category isSelected={isSelected(findInstAndFbCategoryId(), selectedCategoryIds)}
                              onClick={() => selectTopic(findInstAndFbCategoryId())}>Facebook&Instagram</Category>
                    {categoryComponents}
                </CategoriesContainer>
                {isArticlesLoading ?  <div style={{padding:'30px 0'}}>
                    <PageLoader />
                </div> : <>
                <ArticlesContainer id='articles__main'>
                    {articleComponents}
                </ArticlesContainer>
                {articlesData.length !== 0 && <TelegramBtn/>}
                </>
                }
                {articlesData.length !== 0 &&
                    <Pagination changePage={changePage} currentPage={currentPage} limit={8}
                                totalItems={totalNumOfArticles || 0}
                    />}
            </StyledContent>
        </div>
        </>
};