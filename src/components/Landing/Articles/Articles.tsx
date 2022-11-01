import styled from "styled-components";
import {Content} from "../../common/commonStyles/Content.styled";
import {Flex} from "../../common/commonStyles/Flex.styled";
import {Card} from './Card'
import {Pagination} from "../../common/Pagination";
import {TgButton} from "../../common/TgButton";
import {useAppSelector} from "../../../redux/hooks/hooks";
import {useCallback, useState} from "react";
import {mediaSizes} from "../../common/commonStyles/MediaSizes";

const TopicsContainer = styled(Flex)`
  padding: 0 0 41px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  @media (max-width: ${mediaSizes.mobile}) {
    display: flex;
  }
`
const Topic = styled.span`
  font-family: var(--family-text);
  font-weight: 400;
  font-size: 20px;
  line-height: 19px;
  text-decoration-line: underline;
  color: #272727;
  cursor: pointer;
  text-transform: capitalize;
  @media (max-width: ${mediaSizes.mobile}) {
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
    const articlesPerPageLimit = 8
    const [currentPage, setCurrentPage] = useState(0)
    const [selectedTopic, setSelectedTopic] = useState('')
    const endIndex = (currentPage + 1) * articlesPerPageLimit
    const startIndex = endIndex - articlesPerPageLimit
    console.log(articlesData);
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
        if (!selectedTopic) {
            return articlesData.slice(startIndex, endIndex).map(el => {
                return <Card key={el.id} header={el.header} coverImg_withText={el.coverImg_withText}
                             description={el.description} id={el.id}
                             dislikes={el.usersDisliked?.length || 0} likes={el.usersLiked?.length || 0}
                             views={el.usersViewed?.length || 0} historyPath={historyPath}
                             previewDescription={el.previewDescription}
                             category={el.category?.name || ''} comments={el.comments?.length || 0}
                             createdAt={el.createdAt}/>
            })
        } else if (selectedTopic) {
            if (selectedTopic === 'inst&fb') {
                const filteredArticles = articlesData.slice(startIndex, endIndex).filter(el => el.category?.name === 'instagram' || el.category?.name === 'facebook')
                return filteredArticles.slice(startIndex, endIndex).map(el => {
                    return <Card key={el.id} header={el.header} coverImg_withText={el.coverImg_withText}
                                 description={el.description} id={el.id}
                                 dislikes={el.usersDisliked?.length || 0} likes={el.usersLiked?.length || 0}
                                 views={el.usersViewed?.length || 0} historyPath={historyPath}
                                 previewDescription={el.previewDescription}
                                 category={el.category?.name || ''} comments={el.comments?.length || 0}
                                 createdAt={el.createdAt}/>
                })
            } else {
                const filteredArticles = articlesData.slice(startIndex, endIndex).filter(el => el.category?.name === selectedTopic)
                return filteredArticles.slice(startIndex, endIndex).map(el => {
                    return <Card key={el.id} header={el.header} coverImg_withText={el.coverImg_withText}
                                 description={el.description} id={el.id}
                                 dislikes={el.usersDisliked?.length || 0} likes={el.usersLiked?.length || 0}
                                 views={el.usersViewed?.length || 0} historyPath={historyPath}
                                 previewDescription={el.previewDescription}
                                 category={el.category?.name || ''} comments={el.comments?.length || 0}
                                 createdAt={el.createdAt}/>
                })
            }
        }
    }, [currentPage, articlesData, selectedTopic])


    return (
        <div style={{padding: '128px 0 60px 0'}}>
            <Content>
                <TopicsContainer>
                    <Topic onClick={() => setSelectedTopic('inst&fb')}>Facebook & Instagram</Topic>
                    <Topic onClick={() => setSelectedTopic('crypto')}>Crypto</Topic>
                    <Topic onClick={() => setSelectedTopic('affiliate')}>Affiliate</Topic>
                    <Topic onClick={() => setSelectedTopic('cases')}>Cases</Topic>
                    <Topic onClick={() => setSelectedTopic('e-commerce')}>E-commerce</Topic>
                    <Topic onClick={() => setSelectedTopic('tiktok')}>TikTok</Topic>
                </TopicsContainer>
                <ArticlesContainer id='articles__main'>
                    {articles()}
                </ArticlesContainer>
                <TgButton/>
                {articlesData.length !== 0 &&
                    <Pagination changePage={setCurrentPage} currentPage={currentPage} limit={articlesPerPageLimit}
                                totalItems={articlesData.length}/>}
            </Content>
            <div ref={props.articlesPageRef}></div>
        </div>
    );
};