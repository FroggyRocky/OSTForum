import {NavLink, Route, Routes, useNavigate} from "react-router-dom";
import {IUser} from "../../redux/user/userType";
import styled from "styled-components";
import {StyledFlex} from "../../UIKit/BasicStyledComponents/basicStyledComponents";
import {useAppSelector} from "../../redux/storeHooks/storeHooks";
import {Layout} from "../../UIKit/GeneralLayout/Layout";
import {CreateArticle} from "./Create/CreateArticle/CreateArticle";
import {AccountArticles} from "./AccountArticles/AccountArticles";
import {useEffect} from "react";
import {BackgroundLoader} from "../../UIKit/BackgroundLoader/BackgroundLoader";
import {mediaSizes} from "../../UIKit/mediaSizes.styled";
import {TapLinkEditor} from "./TapLinkEditor/TapLinkEditor";
import {CreateNav} from "./Create/CreateNav";

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
                <StyledFlex flexDirection='column'>
                    <H1>Welcome back, <b>{user.name}</b></H1>
                    <Navigation>
                        <span><NavLink to={'/dashboard/create'}>Add Content</NavLink></span>
                        <span><NavLink to={'/dashboard/taplinks'}>Edit TapLinks</NavLink></span>
                    </Navigation>
                </StyledFlex>
                <Routes>
                    <Route path='/articles' element={<AccountArticles articlesData={user.articles}/>}/>
                    <Route path='/create' element={<CreateNav/>}/>
                    <Route path='/taplinks' element={<TapLinkEditor/>}/>
                </Routes>

            </> :
            <p>Loading</p>
        }
    </Layout>
};