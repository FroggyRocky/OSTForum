import React, { useEffect} from "react";
import styled from "styled-components";
import {ReactComponent as Logo} from '../../assets/logo.svg'
import {Flex} from '../commonStyles/Flex.styled'
import {Search} from "./Search";
import {Avatar} from "./Avatar";
import {Content} from "../commonStyles/Content.styled";
import {Link} from "react-router-dom";
import {DashboardWidgets} from "./DashboardWidgets";
import {useAppDispatch, useAppSelector} from "../../redux/hooks/hooks";
import {fetchAccountData} from "../../redux/user/userThunks";
import {UserType} from "../../redux/user/userType";

const Wrapper = styled(Flex)`
  width: 100%;
  background-color: rgba(246, 251, 255, 0.5);
  height: 106px;
  display: flex;
  justify-content: center;
  z-index: 15;
  position: relative;
`
const LogoText = styled.span`
  font-family: var(--family-header);
  font-weight: 700;
  font-size: 30px;
  color: #58649C;
  margin-left: 20px;
  
`
const Main = styled(Content)`
  font-family: var(--family-text);
  font-size: 16px;
  color: #525252;
  font-weight: 400;
  line-height: 15px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`
const Navigation = styled(Flex)`
  width: 60%;

  & > span {
cursor: pointer;
  }
`

type Props = {

}

export function Header(props: Props) {

    const user:UserType | null = useAppSelector(state => state.user.user)
    const dipsatch = useAppDispatch()
    useEffect(() => {
        const token = window.localStorage.getItem('MyClickToken')
        if(token) {
            dipsatch(fetchAccountData())
        }
    }, [])

    return <Wrapper>
            <Main>
                <Flex>
                <Logo style={{backgroundColor: 'rgba(246, 251, 255, 0.5)', width:'35px', height:'35px'}}/>
                    <LogoText>MY CLICK</LogoText>
                </Flex>
                <Navigation justifyContent='space-between' alignItems='center'>
                    <span>Articles</span>
                    <span>Affiliate Programs</span>
                    <span>Network</span>
                    <span>Services</span>
                    <span>Cases</span>
                    <span>Knowledge</span>
                    <span>Vacancies</span>
                </Navigation>
                {!Object.entries(user) &&  <Search/>}
                <Flex justifyContent='space-between'>
                    {Object.entries(user) && <DashboardWidgets />}
                <Link to={`/login/${process.env.REACT_APP_SECRET_LOGIN_LINK}`}>
                    {Object.entries(user) ? <Avatar avatar={user.avatar}/> :
                        <Avatar />
                    }
                </Link>
                </Flex>
        </Main>
        </Wrapper>
}

