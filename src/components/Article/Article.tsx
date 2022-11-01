import {Wrapper} from "../common/commonStyles/Wrapper.styled";
import {Content} from "../common/commonStyles/Content.styled";
import styled from "styled-components";
import {useParams} from 'react-router-dom'
import {ArticleHeader} from "./ArticleHeader";
import {IoTimeOutline} from 'react-icons/io5'
import {Flex} from "../common/commonStyles/Flex.styled";
import {ArticleText} from "./ArticleText";
import {ArticleComments} from "./ArticleComments";
import {TgButton} from "../common/TgButton";
import {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../redux/hooks/hooks";
import {fetchCurrentArticle} from "../../redux/articles/articlesThunks";
import {IArticle, IEditingArticle} from "../../redux/articles/articleTypes";
import {Loader} from "../common/Loader";
import {calcDate} from "../../services/calcDate";
import defaultCover from "../../assets/ArticleCardBg.png";
import {firstPageMediaSizes, mediaSizes} from "../common/commonStyles/MediaSizes";
import { useLocation, useNavigate } from 'react-router-dom';
import {PathWidget} from "../common/PathWidget";
import * as DOMPurify from 'dompurify';
import {convertFromHTML} from "draft-js";
import {setEditingArticle} from "../../redux/articles/articlesSlice";

const StyledPath = styled.div`
  font-family: var(--family-text);
  font-weight: 400;
  font-size: 16px;
  line-height: 15px;
  color: #525252;
  display: flex;
  justify-content: space-between;
  padding-top: 40px;
  margin-bottom: 40px;
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
  @media (max-width: ${mediaSizes.mobile}) {
    display: none;
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
const TgButtonContainer = styled.div`
@media (max-width: ${firstPageMediaSizes.desktopDisableVectors}) {
  display: none;
}
`



type Props = {};

export const Article = (props: Props) => {
    const dispatch = useAppDispatch()
    const currentArticle: IArticle | null = useAppSelector(state => state.articles.currentArticle)
    const isAuth = useAppSelector(state => state.auth.isAuth)
    const userData = useAppSelector(state => state.user.userData)
    const location = useLocation()
    const navigate = useNavigate();
    const historyState = location.state as Array<{pathName:string,path:string}>
    const {header} = useParams()
    useEffect(() => {
        if (header) {
            dispatch(fetchCurrentArticle(header))
        }
    }, [header])

     function edit() {
        if(!currentArticle?.text) return
        const raw = convertFromHTML(currentArticle.text)
         const editingData:IEditingArticle = {
            editorState: raw,
             coverImg_withOutText:currentArticle.coverImg_withOutText,
             coverImg_withText:currentArticle.coverImg_withText
         }
        dispatch(setEditingArticle(editingData))
         navigate(`/dashboard/articles/create?id=${currentArticle.id}`)
    }

    return <Wrapper style={{paddingBottom:'40px'}}>
        {
            currentArticle ? <Content>
                    <StyledPath>
                        <div>
                        <PathWidget historyPath={historyState} targetPath={currentArticle.header} />
                        </div>
                        <Date>
                            <IoTimeOutline size={15} style={{marginRight: '5px'}}/>{calcDate(currentArticle.createdAt)}
                        </Date>
                    </StyledPath>
                    <ArticleHeader edit={edit} header={currentArticle.header} description={currentArticle.description}
                                   articleCoverImg={currentArticle.coverImg_withText || defaultCover} userId={userData?.id} articleCreatorId={currentArticle.user?.id} />
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
                                     articleHeader={currentArticle.header}
                                     views={currentArticle.usersViewed?.length || 0}
                                     likes={currentArticle.usersLiked?.length || 0}
                                     dislikes={currentArticle.usersDisliked?.length || 0}
                                     commentsData={currentArticle.comments} />
                <TgButtonContainer>
                    <TgButton/>
                </TgButtonContainer>
                </Content>
                : <Loader/>
        }
    </Wrapper>
};