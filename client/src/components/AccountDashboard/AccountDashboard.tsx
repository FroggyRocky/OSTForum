import {NavLink, Route, Routes, useNavigate} from "react-router-dom";
import {IUser} from "../../redux/user/userType";
import styled from "styled-components";
import {Flex} from "../../UIKit/StyledComponents/styledComponents";
import {useAppSelector} from "../../redux/hooks/hooks";
import {Layout} from "../../Layout";
import {CreateArticle} from "./AccountArticles/CreateArticle";
import {AccountArticles} from "./AccountArticles/AccountArticles";
import {useEffect} from "react";
import {BackgroundLoader} from "../common/BackgroundLoader";
import {mediaSizes} from "../../mediaSizes.styled";
import {TapLinkEditor} from "./TapLinkEditor/TapLinkEditor";
import {CreateContent} from "./CreateContent/CreateContent";

const H1 = styled.h1`
  padding: 60px 0;
  font-family: var(--gotham);
  font-weight: 400;
  font-size: 35px;
  line-height: 33px;
  color: #525252;

  & > b {
    color: black;
  }

  @media (max-width: ${mediaSizes.mobile}) {
    font-size: 25px;
    line-height: 33px;
  }
`
const Navigation = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  background-color: white;
  padding: 10px 0;

  & > span, & > span > a {
    font-family: var(--gotham);
    font-weight: 400;
    font-size: 16px;
    line-height: 15px;
    color: #525252;
    margin-right: 50px;
    &:last-child {
      margin-right: 0;
    }
  }
`


type Props = {};
export const AccountDashboard = (props: Props) => {

    const isArticleCreating = useAppSelector(state => state.articles.isArticleCreating)
    const navigate = useNavigate()
    const user: IUser = useAppSelector(state => state.user.userData)
    const isAuth = useAppSelector(state => state.authConfigs.isAuth)


    useEffect(() => {
        if (!isAuth) {
            navigate('/')
        }
    }, [isAuth])

    if (isArticleCreating) return <BackgroundLoader/>
    return <Layout>
        {Object.entries(user).length ? <>
                <Flex flexDirection='column'>
                    <H1>Welcome back, <b>{user.name}</b></H1>
                    <Navigation>
                        <span>Statistics</span>
                        <span><NavLink to={'/dashboard/articles/create'}>Add article</NavLink></span>
                        <span><NavLink to={'/dashboard/content/create'}>Add additional content</NavLink></span>
                            <span><NavLink to={'/dashboard/taplinks'}>Edit TapLinks</NavLink></span>
                        <span>Settings</span>
                    </Navigation>
                </Flex>

                <Routes>
                    <Route path='/articles' element={<AccountArticles articlesData={user.articles}/>}/>
                    <Route path='/articles/create' element={<CreateArticle/>}/>
                    <Route path='/content/create' element={<CreateContent />} />
                    <Route path='/taplinks' element={<TapLinkEditor/>}/>
                </Routes>

            </> :
            <p>Loading</p>
        }
    </Layout>
};