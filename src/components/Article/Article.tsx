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
import {calcDate} from "../../services/calcDate";
import defaultCover from "../../assets/ArticleCardBg.png";
import {mediaSizes} from "../commonStyles/MediaSizes";
import { useLocation } from 'react-router-dom';
import {PathWidget} from "../common/PathWidget";
import * as DOMPurify from 'dompurify';

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
const PathWidgetContainer = styled.div`
  @media (max-width: ${mediaSizes.mobile}) {
    display: none;
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
    const location = useLocation()
    const historyState = location.state as Array<{pathName:string,path:string}>
    const {header} = useParams()
    useEffect(() => {
        if (header) {
            dispatch(fetchCurrentArticle(header))
        }
    }, [])

    return <Wrapper style={{paddingBottom:'40px'}}>
        {
            currentArticle ? <Content>
                    <StyledPath>
                        <PathWidgetContainer>
                        <PathWidget historyPath={historyState} targetPath={currentArticle.header} />
                        </PathWidgetContainer>
                        <Date>
                            <IoTimeOutline size={15} style={{marginRight: '5px'}}/>{calcDate(currentArticle.createdAt)}
                        </Date>
                    </StyledPath>
                    <ArticleHeader header={currentArticle.header} description={currentArticle.description}
                                   articleCoverImg={currentArticle.mainImg || defaultCover} />
                    <ContentWidget>
                        {/*<span>Content</span>*/}
                        {/*<IoChevronDown/>*/}
                        <DateMob>
                            <IoTimeOutline size={10} style={{marginRight: '5px'}}/>{calcDate(currentArticle.createdAt)}
                        </DateMob>
                    </ContentWidget>
                    <ArticleText text={DOMPurify.sanitize(currentArticle.text, { USE_PROFILES: { html: true }})} />
                    <ArticleComments userAvatar={userData.avatar} articleId={currentArticle.id} userId={userData.id}
                                     isAuth={isAuth}
                                     views={currentArticle.usersViewed?.length || 0}
                                     likes={currentArticle.usersLiked?.length || 0}
                                     dislikes={currentArticle.usersDisliked?.length || 0}
                                     commentsData={currentArticle.comments} />
                    <TgButton/>
                </Content>
                : <Loader/>

        }
    </Wrapper>
};