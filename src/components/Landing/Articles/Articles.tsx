import styled from "styled-components";
import {Content} from "../../commonStyles/Content.styled";
import {Flex} from "../../commonStyles/Flex.styled";
import {Card} from './Card'
import {Pagination} from "../../common/Pagination";
import {TgButton} from "../../common/TgButton";
import {useAppSelector} from "../../../redux/hooks/hooks";

const TopicsContainer = styled(Flex)`
  padding: 0 0 41px 0;
`
const Topic = styled.span`
  font-family: var(--family-text);
  font-weight: 400;
  font-size: 20px;
  line-height: 19px;
  text-decoration-line: underline;
  color: #272727;
  cursor: pointer;

  &:nth-child(2), &:nth-child(4) {
    margin: 0 80px;
  }

  &:nth-child(6) {
    margin-left: 80px;
  }
`


type Props = {};
export const Articles = (props: Props) => {
    const articlesData = useAppSelector(state => state.articles.articles)
    const articles = articlesData.map(el => {
        return <Card key={el.id} header={el.header} mainImg={el.mainImg} description={el.description} id={el.id}
                     dislikes={el.usersDisliked?.length || 0} likes={el.usersLiked?.length || 0} views={el.usersViewed?.length || 0}
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
                <Flex style={{marginBottom: '50px', position: 'relative'}} gap='30px'>
                    {articles}
                    <TgButton/>
                </Flex>
                <Pagination/>
            </Content>
        </div>
    );
};