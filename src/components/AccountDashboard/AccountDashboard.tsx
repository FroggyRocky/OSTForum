import {NavLink, Route, Routes, useNavigate} from "react-router-dom";
import {IUser} from "../../redux/user/userType";
import styled from "styled-components";
import {Flex} from "../commonStyles/Flex.styled";
import {useAppSelector} from "../../redux/hooks/hooks";
import {Header} from "../Header/Header";
import {Footer} from "../Footer/Footer";
import {CreateArticlePage} from "./AccountArticles/CreateArticlePage";
import {AccountArticles} from "./AccountArticles/AccountArticles";
import {useEffect} from "react";
import {BackgroundLoader} from "../common/BackgroundLoader";

const Wrapper = styled.div`

`
const H1 = styled.h1`
  padding: 60px 0;
  font-family: var(--family-text);
  font-weight: 400;
  font-size: 35px;
  line-height: 33px;
  color: #525252;

  & > b {
    color: black;
  }
`
const Navigation = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  background-color: white;
  padding: 10px 0;

  & > span {
    font-family: var(--family-text);
    font-weight: 400;
    font-size: 16px;
    line-height: 15px;
    color: #525252;

    &:nth-child(2) {
      margin: 0px 50px;
    }
  }
`


type Props = {};
export const AccountDashboard = (props: Props) => {

    const isArticleCreating = useAppSelector(state => state.articles.isArticleCreating)
    const navigate = useNavigate()
    const user: IUser = useAppSelector(state => state.user.user)
    const isAuth = useAppSelector(state => state.auth.isAuth)


    useEffect(() => {
        if (!isAuth) {
            navigate('/')
        }
    }, [isAuth])


    return <Wrapper>
        {isArticleCreating && <BackgroundLoader/>}
        <Header/>
        {Object.entries(user).length ? <>
                <Flex flexDirection='column'>
                    <H1>Welcome back, <b>{user.name}</b></H1>
                    <Navigation>
                        <span>Statistics</span>
                        <span>
                   <NavLink to={'/dashboard/articles/create'}>Add article</NavLink>
               </span>
                        <span>Settings</span>
                    </Navigation>
                </Flex>

                <Routes>
                    <Route path='/articles' element={<AccountArticles articlesData={user.articles}/>}/>
                    <Route path='/articles/create' element={<CreateArticlePage/>}/>
                </Routes>

            </> :
            <p>Loading</p>
        }

        <Footer/>
    </Wrapper>
};