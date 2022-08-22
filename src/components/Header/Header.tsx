import React from "react";
import styled from "styled-components";
import {ReactComponent as Logo} from '../../assets/logo.svg'
import {Flex} from '../commonStyles/Flex.styled'
import {Search} from "./Search";
import {Avatar} from "./Avatar";
import {Content} from "../commonStyles/Content.styled";
import {Link, useLocation} from "react-router-dom";
import {DashboardWidgets} from "./DashboardWidgets";
import {useAppSelector} from "../../redux/hooks/hooks";
import {IUser} from "../../redux/user/userType";
import {LogoText} from "../commonStyles/Logo.styled";


const Wrapper = styled(Flex)`
  width: 100%;
  background-color: rgba(246, 251, 255, 0.5);
  height: 106px;
  display: flex;
  justify-content: center;
  z-index: 15;
  position: relative;
  width: 100%;
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
  @media (max-width: 1561px) {
    width: 100%;
  }
`
const Navigation = styled(Flex)`
  width: 60%;

  & > span {
    cursor: pointer;
  }

  @media (max-width: 1020px) {
    display: none;
  }
`
const BurgerNav = styled.div`
  display: none;
  @media (max-width: 1020px) {
    display: block;
  }
`

type Props = {}

export function Header(props: Props) {


    const {pathname} = useLocation()
    const path = pathname.split('/')[1]
    const isAuth = useAppSelector(state => state.auth.isAuth)
    const user: IUser | null = useAppSelector(state => state.user.user)


    return <Wrapper>
        <Main>
            <Flex>
                <Logo style={{backgroundColor: 'rgba(246, 251, 255, 0.5)', width: '35px', height: '35px'}}/>
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
            {path !== 'dashboard' && <Search/>}
            <Flex justifyContent='space-between'>
                {path === 'dashboard' && <DashboardWidgets/>}
                <Link to={`/dashboard`}>
                    {isAuth && <Avatar avatar={user.avatar}/>}
                </Link>
            </Flex>
        </Main>
    </Wrapper>
}

