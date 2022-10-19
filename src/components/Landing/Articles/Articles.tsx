import styled from "styled-components";
import {Content} from "../../commonStyles/Content.styled";
import {Flex} from "../../commonStyles/Flex.styled";
import {Card} from './Card'
import {Pagination} from "../../common/Pagination";
import {TgButton} from "../../common/TgButton";
import {useAppSelector} from "../../../redux/hooks/hooks";
import {useState} from "react";
import {mediaSizes} from "../../commonStyles/MediaSizes";

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
    const articles = articlesData.slice(startIndex, endIndex).map(el => {
        return <Card key={el.id} header={el.header} mainImg={el.mainImg} description={el.description} id={el.id}
                     dislikes={el.usersDisliked?.length || 0} likes={el.usersLiked?.length || 0}
                     views={el.usersViewed?.length || 0} historyPath={historyPath}
                     previewDescription={el.previewDescription}
                     category={el.category?.name || ''} comments={el.comments?.length || 0} createdAt={el.createdAt}/>
    })
    return (
        <div style={{padding: '128px 0 60px 0'}}>
            <Content>
                <TopicsContainer>
                    <Topic>Topic 1</Topic>
                    <Topic>Topic 2</Topic>
                    <Topic>Topic 3</Topic>
                    <Topic>Topic 4</Topic>
                    <Topic>Topic 5</Topic>
                    <Topic>Topic 6</Topic>
                </TopicsContainer>
                <ArticlesContainer id='articles__main'>
                    {articles}
                    <TgButton/>
                </ArticlesContainer>
                {articlesData.length !== 0 &&
                    <Pagination changePage={setCurrentPage} currentPage={currentPage} limit={articlesPerPageLimit}
                                totalItems={articlesData.length}/>}
            </Content>
            <div ref={props.articlesPageRef}></div>
        </div>
    );
};