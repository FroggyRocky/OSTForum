import {StyledContent, StyledWrapper, StyledFlex} from "../../UIKit/BasicStyledComponents/basicStyledComponents";
import styled from "styled-components";
import {useLocation, useNavigate, useParams} from 'react-router-dom'
import {ArticleHeader} from "./ArticleHeader";
import {IoTimeOutline} from 'react-icons/io5'
import {ArticleText} from "./ArticleText";
import {ArticleComments} from "./ArticleComments";
import {TelegramBtn} from "../../UIKit/TelegramBtn/TelegramBtn";
import {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../../redux/storeHooks/storeHooks";
import {fetchCurrentArticle} from "../../redux/articles/articlesThunks";
import {IArticle, IEditingArticle} from "../../redux/articles/articleTypes";
import {PageLoader} from "../../UIKit/PageLoader/PageLoader";
import {calcDate} from "../../services/calcDate";
import {firstPageMediaSizes} from "../../UIKit/mediaSizes.styled";
import {mediaSizes} from "../../UIKit/mediaSizes.styled";
import {PathWidget} from "../../UIKit/PathWidget/PathWidget";
import {convertFromHTML} from "draft-js";
import {setCurrentArticle, setEditingArticle} from "../../redux/articles/articlesSlice";
import {ICategory} from "../../redux/auth/authConfigsTypes";
import {Layout} from "../../UIKit/GeneralLayout/Layout";

const ArticleContainer = styled(StyledWrapper)`
  padding-bottom: 40px;
  overflow-wrap: break-word;
  word-break: break-word;
`
const StyledPath = styled.div`
  font-family: var(--gotham);
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
const ContentWidget = styled(StyledFlex)`
  font-family: var(--gotham);
  font-weight: 400;
  font-size: 18px;
  line-height: 16px;
  color: #58649C;
  margin: 30px 0 10px 0;
  align-items: center;
  justify-content: flex-end;
  @media (max-width: ${mediaSizes.mobile}) {
    justify-content: space-between;
    margin: 10px 0 18px 0;
    font-family: var(--gotham);
    font-size: 9px;
    line-height: 9px;
    color: #58649C;
  }
`
const Date = styled(StyledFlex)`
  @media (max-width: ${mediaSizes.mobile}) {
    display: none;
  }
`
const DateMob = styled(StyledFlex)`
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


export const Article = () => {
    const dispatch = useAppDispatch()
    const currentArticle: IArticle | null = useAppSelector(state => state.articles.currentArticle)
    const categories: ICategory[] = useAppSelector(state => state.authConfigs.configs.categories)
    const isAuth = useAppSelector(state => state.authConfigs.isAuth)
    const userData = useAppSelector(state => state.user.userData)
    const navigate = useNavigate();
    const historyState = useLocation().state as Array<{ pathName: string, path: string }>
    const {id} = useParams()
    useEffect(() => {
        if (id) {
            dispatch(fetchCurrentArticle(+id))
        }
        return () => {
            dispatch(setCurrentArticle(null))
        }
    }, [id])

    function edit() {
        if (!currentArticle?.text) return
        const raw = convertFromHTML(currentArticle.text)
        const editingData: IEditingArticle = {
            editorState: raw,
            articleId: currentArticle.id,
            header: currentArticle.header,
            description: currentArticle.description,
            previewDescription: currentArticle.previewDescription,
            coverImg_withOutText: currentArticle.coverImg_withOutText,
            coverImg_withText: currentArticle.coverImg_withText,
            categoryIds: currentArticle.categoryIds
        }
        dispatch(setEditingArticle(editingData))
        navigate(`/dashboard/articles/create?id=${currentArticle.id}`)
    }

    if (!currentArticle) return <PageLoader/>
    return <Layout>
        <ArticleContainer>
            <StyledContent>
                <StyledPath>
                    <div>
                        <PathWidget historyPath={historyState} targetPath={currentArticle.header}/>
                    </div>
                    <Date>
                        <IoTimeOutline size={15} style={{marginRight: '5px'}}/>{calcDate(currentArticle.createdAt)}
                    </Date>
                </StyledPath>
                <ArticleHeader categories={categories} edit={edit} currentArticle={currentArticle}
                               userId={userData.id || undefined}/>
                <ContentWidget>
                    <DateMob>
                        <IoTimeOutline size={10} style={{marginRight: '5px'}}/>{calcDate(currentArticle.createdAt)}
                    </DateMob>
                </ContentWidget>
                <ArticleText text={currentArticle.text}/>
                <ArticleComments userAvatar={userData.avatar} articleId={currentArticle.id} userId={userData.id}
                                 isAuth={isAuth}
                                 articleHeader={currentArticle.header}
                                 views={currentArticle.usersViewed?.length || 0}
                                 likes={currentArticle.usersLiked?.length || 0}
                                 dislikes={currentArticle.usersDisliked?.length || 0}
                                 commentsData={currentArticle.comments}/>
                <TgButtonContainer>
                    <TelegramBtn/>
                </TgButtonContainer>
            </StyledContent>
        </ArticleContainer>
    </Layout>
}