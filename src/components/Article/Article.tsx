import {Wrapper} from "../commonStyles/Wrapper.styled";
import {Content} from "../commonStyles/Content.styled";
import styled from "styled-components";
import {Link, useParams} from 'react-router-dom'
import {ArticleHeader} from "./ArticleHeader";
import {IoTimeOutline} from 'react-icons/io5'
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
import {mediaSizes} from "../commonStyles/MediaSizes";

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
  align-items: center;
  justify-content: end;
  @media (max-width: ${mediaSizes.mobile}) {
    justify-content: space-between;
    margin: 10px 0 18px 0;
    font-family: var(--family-text);
    font-size: 9px;
    line-height: 9px;
    color: #58649C;
  }

`
const Date = styled(Flex)`
  @media (max-width: ${mediaSizes.mobile}) {
    display: none;
  }
`
const DateMob = styled(Flex)`
  display: none;
  @media (max-width: ${mediaSizes.mobile}) {
    display: flex;
    align-items: center;
  }
`
type Props = {};

export const Article = (props: Props) => {
    const dispatch = useAppDispatch()
    const currentArticle: IArticle | null = useAppSelector(state => state.articles.currentArticle)
    const isAuth = useAppSelector(state => state.auth.isAuth)
    const userData = useAppSelector(state => state.user.user)

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
                        <Date>
                            <IoTimeOutline size={15} style={{marginRight: '5px'}}/>{calcDate(currentArticle.createdAt)} ago
                        </Date>
                    </StyledPath>
                    <ArticleHeader header={currentArticle.header} description={currentArticle.description}
                                   articleCoverImg={currentArticle.mainImg || defaultCover}/>
                    <ContentWidget>
                        {/*<span>Content</span>*/}
                        {/*<IoChevronDown/>*/}
                        <DateMob>
                            <IoTimeOutline size={10} style={{marginRight: '5px'}}/>{calcDate(currentArticle.createdAt)} ago
                        </DateMob>
                    </ContentWidget>
                    <ArticleText text={currentArticle.text}/>
                    <ArticleComments userAvatar={userData.avatar} articleId={currentArticle.id} userId={userData.id}
                                     isAuth={isAuth}
                                     views={currentArticle.usersViewed?.length || 0}
                                     likes={currentArticle.usersLiked?.length || 0}
                                     dislikes={currentArticle.usersDisliked?.length || 0}
                                     commentsData={currentArticle.comments}/>
                    <TgButton/>
                </Content>
                : <Loader/>

        }
    </Wrapper>
};