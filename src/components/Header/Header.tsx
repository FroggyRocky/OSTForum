import {useState} from "react";
import styled, {css} from "styled-components";
import {ReactComponent as Logo} from '../../assets/logo.svg'
import {Flex} from '../commonStyles/Flex.styled'
import {Avatar} from "./Avatar";
import {Content} from "../commonStyles/Content.styled";
import {Link, useLocation} from "react-router-dom";
import {useAppSelector} from "../../redux/hooks/hooks";
import {IUser} from "../../redux/user/userType";
import {LogoText} from "../commonStyles/Logo.styled";
import {FaTelegramPlane} from "react-icons/fa";
import {ReactComponent as Close} from "../../assets/closeBurger.svg";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import {ReactComponent as MenuBurger} from "../../assets/menuBurger.svg";
import {mediaSizes} from "../commonStyles/MediaSizes";
import {TransparentLink} from "../common/CommonStyles";
import {isMobile} from "react-device-detect";
import { AiOutlineClose } from "react-icons/ai";
const Wrapper = styled(Flex)<{isMobile:boolean}>`
  width: 100%;
  background-color: rgba(246, 251, 255, 0.5);
  height: 106px;
  display: flex;
  justify-content: center;
  z-index: 15;
  position: relative;
  @media (max-width: ${mediaSizes.laptop}) {
    ${({isMobile}) => isMobile && css`
      height: 46px;
    `}
  }
`
const StyledLogo = styled(Logo)<{isMobile:boolean}>`
  width: 35px;
  height: 35px;
  margin-right: 20px;
  @media (max-width: ${mediaSizes.laptop}) {
    ${({isMobile}) => isMobile && css`
      width: 20px;
      height: 20px;
      margin-right: 10px;
    `}
  }
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
  @media (max-width: 1650px) {
    width: 100%;
    justify-content: space-between;
    margin: 0 20px;
  }
  @media (max-width: ${mediaSizes.mobile}) {
    margin: 0 0;
  }
`
const Navigation = styled(Flex)`
  width: 60%;

  & > span {
    cursor: pointer;
  }

  @media (max-width: 1182px) {
    display: none;
  }
`

const TelegramButton = styled.button<{isMobile:boolean}>`
  border-radius: 100%;
  background: linear-gradient(180deg, #8492D1 0%, #58649C 100%), #58649C;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 15px;
  width: 45px;
  height: 45px;
  ${({isMobile}) => isMobile && css`
    width: 35px;
    height: 35px;
  `}
`
const SearchContainer = styled.div`
  @media (max-width: 1182px) {
    display: none;
  }
`
const MobileSearch = styled.div`
  display: none;
  @media (max-width: 1182px) {
    display: block;
  }
`
const SearchButton = styled.button`
  width: 24px;
  height: 24px;
  border-radius: 15px;
  background: linear-gradient(180deg, #8492D1 0%, #58649C 100%), #58649C;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 15px;
`
const AvatarContainer = styled.div`
  @media (max-width: 1182px) {
    display: none;
  }
`
const ActionPanelMob = styled.div`
  align-items: center;
  justify-content: space-between;
  display: none;
  @media (max-width: 1182px) {
    position: relative;
    display: flex;
    z-index: 5;
  }
`
const UserIdMob = styled.div`
  padding: 15px;
  border-bottom: 1px solid #58649C;

  & > span {
    font-family: var(--family-text);
    font-weight: 400;
    font-size: 16px;
    line-height: 20px;
    color: #58649C;
    margin-left: 15px
  }
`
const UserName = styled.span`
  font-family: var(--family-text);
  font-weight: 400;
  font-size: 16px;
  line-height: 20px;
  color: #58649C;
  margin-left: 15px
`
const NavigationMob = styled.div`
  display: none;
  @media (max-width: ${mediaSizes.mobile}) {
    display: block;
    width: 285px;
    z-index: 100;
    position: absolute;
    background-color: white;
    top: 38px;
    left: -164%;
    box-shadow: 0px 4px 14px rgba(0, 0, 0, 0.25);
    border-radius: 15px;
    & > span {
      font-family: var(--family-text);
      padding: 15px;
      font-weight: 400;
      font-size: 14px;
      line-height: 13px;
      display: flex;
      align-items: center;
      color: #525252;
    }
  }
`
const UsersWidgets = styled.div`
  @media (max-width: ${mediaSizes.mobile}) {
    display: none;
  }
`

type Props = {}

export function Header(props: Props) {


    const {pathname} = useLocation()
    const path = pathname.split('/')[1]
    const isAuth = useAppSelector(state => state.auth.isAuth)
    const user: IUser | null = useAppSelector(state => state.user.user)
    const [isMobNavigationPanelOpen, toggleMobileNavigationPanel] = useState(false)
    const [isMobSearchOpen, toggleMobSearchState] = useState(false)

    function onToggleMobileNavigationPanel(state: boolean) {
        toggleMobileNavigationPanel(state)
        if (state) {
            toggleMobSearchState(false)
        }
    }

    function onToggleMobSearch(state: boolean) {
        toggleMobSearchState(state)
        if (state) {
            toggleMobileNavigationPanel(false)
        }
    }

    return <Wrapper isMobile={isMobile}>
        <Main>
            <Link to='/'>
                <Flex justifyContent='flex-start' alignItems='center'>
                    <StyledLogo isMobile={isMobile}/>
                    <LogoText isMobile={isMobile}>MY CLICK</LogoText>
                </Flex>
            </Link>
            <Navigation justifyContent='space-between' alignItems='center'>
                {/*<span>Articles</span>*/}
                {/*<span>Affiliate Programs</span>*/}
                {/*<span>Network</span>*/}
                {/*<span>Services</span>*/}
                {/*<span>Cases</span>*/}
                {/*<span>Knowledge</span>*/}
                {/*<span>Vacancies</span>*/}
            </Navigation>
            {/*{path !== 'dashboard' && <SearchContainer>*/}
            {/*    <Search/>*/}
            {/*</SearchContainer>}*/}
            <Flex justifyContent='space-between'>
                <ActionPanelMob>
                    {!isMobSearchOpen &&
                        <TransparentLink href='t.me/myclickmedia' target={'_blank'}>
                            <TelegramButton isMobile={isMobile}>
                                <FaTelegramPlane size={isMobile ? 15 : 30} color='white'/>
                            </TelegramButton>
                        </TransparentLink>
                    }
                    {/*<MobileSearch>*/}
                    {/*    {isMobSearchOpen ?*/}
                    {/*        <Search mob={true} onToggleMobSearch={onToggleMobSearch}/>*/}
                    {/*        :*/}
                    {/*        <SearchButton onClick={() => onToggleMobSearch(true)}>*/}
                    {/*            <GoSearch size={15} color='white'/>*/}
                    {/*        </SearchButton>*/}
                    {/*    }*/}
                    {/*</MobileSearch>*/}
                    {(!isMobNavigationPanelOpen && !isMobSearchOpen && isAuth) && <>
                        <svg width="0" height="0">
                            <linearGradient id="blue-gradient" x1="100%" y1="100%" x2="0%" y2="0%">
                                <stop stopColor="#8492D1" offset="0%" />
                                <stop stopColor="#58649C" offset="100%" />
                            </linearGradient>
                        </svg>
                        {/*//40*/}
                        <HiOutlineMenuAlt3 size={isMobile ? 35 : 40} style={{ stroke: "url(#blue-gradient)" }} onClick={() => onToggleMobileNavigationPanel(true)}/>
                    </>
                    }
                    {isMobNavigationPanelOpen && <>
                        <AiOutlineClose  size={isMobile ? 35 : 40}  style={{ fill: "url(#blue-gradient)" }} onClick={() => onToggleMobileNavigationPanel(false)}/>
                        <NavigationMob>
                            {isAuth && <UserIdMob>
                                <Link to={`/dashboard`}>
                                    <Flex justifyContent='flex-start'>
                                        <Avatar avatar={user.avatar}/>
                                        <UserName>{user.name || 'Danila Kuznetsov'}</UserName>
                                    </Flex>
                                </Link>
                            </UserIdMob>}
                            {/*<span>Articles</span>*/}
                            {/*<span>Affiliate Programs</span>*/}
                            {/*<span>Network</span>*/}
                            {/*<span>Services</span>*/}
                            {/*<span>Cases</span>*/}
                            {/*<span>Knowledge</span>*/}
                            {/*<span>Vacancies</span>*/}
                        </NavigationMob>
                    </>
                    }
                </ActionPanelMob>
                <UsersWidgets>
                    {/*{path === 'dashboard' && <DashboardWidgets/>}*/}
                    <AvatarContainer>
                        {isAuth && <Link to={`/dashboard`}><Avatar avatar={user.avatar}/></Link>}
                    </AvatarContainer>
                </UsersWidgets>
            </Flex>
        </Main>
    </Wrapper>
}

