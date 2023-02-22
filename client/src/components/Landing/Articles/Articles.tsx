import {Content} from "../../common/commonStyles/Content.styled";
import {Card} from './Card'
import {Pagination} from "../../common/Pagination";
import {TgButton} from "../../common/TgButton";
import {useAppSelector} from "../../../redux/hooks/hooks";
import {useCallback, useState, useEffect} from "react";
import {IArticlesPreview} from "../../../redux/articles/articleTypes";
import defaultCardCover from '../../../assets/defaultCardCover.png'
import {ArticlesContainer, CategoriesContainer, Category} from './articles.styles'
import {findCategoryObjById} from "../../../services/categoryFlags";
import {useNavigate} from "react-router-dom";

type Props = {
    articlesPageRef: any
}
const articlesPerPageLimit = 8

export const Articles = (props: Props) => {
    const articlesData = useAppSelector(state => state.articles.articles)
    const categories = useAppSelector(state => state.authConfigs.configs.categories)
    const [currentPage, setCurrentPage] = useState(0)
    const [selectedCategoryIds, setSelectedCategoryIds] = useState<Array<number>>([])
    const endIndex = (currentPage + 1) * articlesPerPageLimit
    const startIndex = endIndex - articlesPerPageLimit
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
    const articles = useCallback(() => {
        if (selectedCategoryIds.length !== 0) {
            const filteredArticles = articlesData.filter(article => {
                if (!article.categoryIds || article.categoryIds.length === 0) return
                if (selectedCategoryIds.some(id => article.categoryIds!.indexOf(id) >= 0)) {
                    return article
                } else {
                    return;
                }
            });
            return createArticleComponents(filteredArticles)
        } else {
            return createArticleComponents(articlesData)
        }
    }, [currentPage, selectedCategoryIds])

    const categoryComponents = categories.map(el => {
        if (el.name !== 'facebook' && el.name !== 'instagram') {
            return <Category key={el.id} isSelected={isSelected(selectedCategoryIds, [el.id])}
                             onClick={() => setSelectedCategoryIds([el.id])}>{el.name}</Category>
        }
    })

    function createArticleComponents(articles: IArticlesPreview[]) {
        return articles.map((el, index) => {
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
    }

    function findInstAndFbCategoryId() {
        const instAndFbCategoryIds: number[] = []
        categories.forEach(category => {
            if (category.name === 'instagram' || category.name === 'facebook') {
                instAndFbCategoryIds.push(category.id)
            }
        })
        return instAndFbCategoryIds
    }

    function selectTopic(topicIds: number[]) {
        if (selectedCategoryIds.some(el => topicIds.indexOf(el) >= 0)) {
            setCurrentPage(0)
            setSelectedCategoryIds([])
        } else {
            setCurrentPage(0)
            setSelectedCategoryIds([...topicIds])
        }
    }
    function changePage(page:number) {
        setCurrentPage(page);
        props.articlesPageRef.current.scrollIntoView({ behavior: "smooth", block: "start" })
    }
    return (
        <div style={{padding: '0px 0 60px 0'}}>
            <Content>
                <div ref={props.articlesPageRef}></div>
                <CategoriesContainer>
                    <Category isSelected={isSelected(findInstAndFbCategoryId(), selectedCategoryIds)}
                              onClick={() => selectTopic(findInstAndFbCategoryId())}>Facebook&Instagram</Category>
                    {categoryComponents}
                </CategoriesContainer>

                <ArticlesContainer id='articles__main'>
                    {articles()?.slice(startIndex, endIndex)}
                </ArticlesContainer>
                <TgButton/>
                {articlesData.length !== 0 &&
                    <Pagination changePage={changePage} currentPage={currentPage} limit={articlesPerPageLimit}
                                totalItems={articles().length || 0}
                    />}
            </Content>
        </div>
    );
};