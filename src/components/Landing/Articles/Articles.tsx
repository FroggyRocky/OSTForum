import styled, {css} from "styled-components";
import {Content} from "../../common/commonStyles/Content.styled";
import {Flex} from "../../common/commonStyles/Flex.styled";
import {Card} from './Card'
import {Pagination} from "../../common/Pagination";
import {TgButton} from "../../common/TgButton";
import {useAppSelector} from "../../../redux/hooks/hooks";
import {useCallback, useState} from "react";
import {mediaSizes} from "../../common/commonStyles/MediaSizes";
import {IArticlesPreview} from "../../../redux/articles/articleTypes";
import defaultCardCover from '../../../assets/defaultCardCover.png'
const TopicsContainer = styled(Flex)`
  padding: 0 0 41px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  @media (max-width: ${mediaSizes.mobile}) {
    display: flex;
    //gap: 20px;
    justify-content: start;
  }
`
const Topic = styled.span<{isSelected:boolean}>`
  font-family: var(--family-text);
  font-weight: 400;
  font-size: 20px;
  line-height: 19px;
  text-decoration-line: underline;
  color: #272727;
  cursor: pointer;
  text-transform: capitalize;
  ${({isSelected}) => isSelected && css`
  color: #58649C;
    font-weight: bold;
  `}
  @media (max-width: ${mediaSizes.mobile}) {
  padding-bottom: 20px;
  padding-right: 5px;
    &:nth-child(2) {
      margin: 0 0;
    }

    &:nth-child(4), &:nth-child(5), &:nth-child(6) {
      display: none;
    }
  }
`
const ArticlesContainer = styled(Flex)`
  margin-bottom: 50px;
  position: relative;
  gap: 30px;
  @media (max-width: ${mediaSizes.laptop}) {
    gap: 0;
  }
`

type Props = {
    articlesPageRef: any
}

export const Articles = (props: Props) => {
    const articlesData = useAppSelector(state => state.articles.articles)
    const categories = useAppSelector(state => state.authConfigs.configs.categories)
    const articlesPerPageLimit = 8
    const [currentPage, setCurrentPage] = useState(0)
    const [selectedTopic, setSelectedTopic] = useState('')
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

    const articles = useCallback(() => {
         if (selectedTopic) {
             console.log(selectedTopic)
            if (selectedTopic === 'inst&fb') {
                const filteredArticles = articlesData.filter(el => el.category?.name === 'instagram' || el.category?.name === 'facebook');
                return createArticleComponents(filteredArticles)

            } else if(selectedTopic !== 'inst&fb') {
                const filteredArticles = articlesData.filter(el => {
                 return el.category?.name === selectedTopic
                });
                return createArticleComponents(filteredArticles)
            }
        } else {
             const filteredArticles = articlesData
             return createArticleComponents(filteredArticles)
         }
    }, [currentPage, articlesData, selectedTopic])

    const topics = categories.map(el => {
        if(el.name !== 'facebook' && el.name !== 'instagram') {
            return <Topic key={el.id} isSelected={selectedTopic === el.name} onClick={() => selectTopic(el.name)}>{el.name}</Topic>
        }
    })

function createArticleComponents(articles:IArticlesPreview[]) {
        return articles.map(el => {
            return <Card key={el.id} header={el.header} coverImg_withText={el.coverImg_withText || el.coverImg_withOutText || defaultCardCover}
                         description={el.description} id={el.id}
                         dislikes={el.usersDisliked?.length || 0} likes={el.usersLiked?.length || 0}
                         views={el.usersViewed?.length || 0} historyPath={historyPath}
                         previewDescription={el.previewDescription}
                         category={el.category?.name || ''} comments={el.comments?.length || 0}
                         createdAt={el.createdAt}/>
        })
    }

function selectTopic(topic:string) {
        if(selectedTopic === topic) {
            setCurrentPage(0)
            setSelectedTopic('')
        } else {
            setCurrentPage(0)
            setSelectedTopic(topic)
        }
}

    return (
        <div style={{padding: '50px 0 60px 0'}}>
            <Content>
                <TopicsContainer>
                    <Topic isSelected={selectedTopic === 'inst&fb'} onClick={() => selectTopic('inst&fb')}>Facebook & Instagram</Topic>
                    {topics}
                </TopicsContainer>
                <ArticlesContainer id='articles__main'>
                    {articles()?.slice(startIndex, endIndex)}
                </ArticlesContainer>
                <TgButton/>
                {articlesData.length !== 0 &&
                    <Pagination changePage={setCurrentPage} currentPage={currentPage} limit={articlesPerPageLimit}
                               totalItems={articles()?.length || 0}
                    />}
            </Content>
            <div ref={props.articlesPageRef}></div>
        </div>
    );
};