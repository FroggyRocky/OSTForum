import {Wrapper} from "../commonStyles/Wrapper.styled";
import {Content} from "../commonStyles/Content.styled";
import styled from "styled-components";
import {Link, useParams} from 'react-router-dom'
import {ArticleHeader} from "./ArticleHeader";
import {IoChevronDown, IoTimeOutline} from 'react-icons/io5'
import {Flex} from "../commonStyles/Flex.styled";
import {ArticleText} from "./ArticleText";
import {ArticleComments} from "./ArticleComments";
import {TgButton} from "../common/TgButton";
import {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../../redux/hooks/hooks";
import {fetchCurrentArticle} from "../../redux/articles/articlesThunks";
import {IArticle} from "../../redux/articles/articleTypes";
import {Loader} from "../common/Loader";
import {calcDate} from "../common/services/calcDate";
import defaultCover from "../../assets/ArticleCardBg.png";

const StyledPath = styled.div`
  font-family: var(--family-text);
  font-weight: 400;
  font-size: 16px;
  line-height: 15px;
  color: #525252;
  display: flex;
  justify-content: space-between;
  margin: 0 0 40px 0;

  & > p {
    display: flex;
    align-items: center;
  }

  & > a {
    text-decoration: underline;

    &:visited {
      color: #525252;
    }
  }
`
const ContentWidget = styled(Flex)`
  font-family: var(--family-text);
  font-weight: 400;
  font-size: 18px;
  line-height: 16px;
  color: #58649C;
  margin: 30px 0 10px 0;
`

type Props = {};

export const Article = (props: Props) => {
    const dispatch = useAppDispatch()
    const currentArticle: IArticle | null = useAppSelector(state => state.articles.currentArticle)

    const {id} = useParams()
    useEffect(() => {
        if (id) {
            dispatch(fetchCurrentArticle(+id))
        }
    }, [])

    return <Wrapper style={{padding: '40px 0 120px 0'}}>
        {
            currentArticle ? <Content>
                    <StyledPath>
                        <p><Link to='/'> Home </Link>{' > '}<Link to='/'> Articles </Link> {' > '} Article's Header</p>
                        <Flex>
                            <IoTimeOutline size={15} style={{marginRight: '5px'}}/>{calcDate(currentArticle.createdAt)} ago
                        </Flex>
                    </StyledPath>
                    <ArticleHeader header={currentArticle.header} description={currentArticle.description}
                                   articleCoverImg={currentArticle.mainImg || defaultCover}/>
                    <ContentWidget alignItems='center' justifyContent='end'>
                        <span>Content</span>
                        <IoChevronDown/>
                    </ContentWidget>
                    <ArticleText text={currentArticle.text}/>
                    <ArticleComments views={currentArticle.usersViewed?.length || 0}
                                     likes={currentArticle.usersLiked?.length || 0}
                                     dislikes={currentArticle.usersDisliked?.length || 0}
                                     commentsData={currentArticle.comments}/>
                    <TgButton/>
                </Content>
                : <Loader/>

        }
    </Wrapper>
};