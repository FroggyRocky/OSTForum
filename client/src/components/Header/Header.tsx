import {useState} from "react";
import styled, {css} from "styled-components";
import {ReactComponent as Logo} from '../../assets/logo.svg'
import {Flex} from '../common/commonStyles/Flex.styled'
import {Avatar} from "./Avatar";
import {Content} from "../common/commonStyles/Content.styled";
import {Link, useLocation} from "react-router-dom";
import {useAppSelector} from "../../redux/hooks/hooks";
import {IUser} from "../../redux/user/userType";
import {FaTelegramPlane} from "react-icons/fa";
import {GoSearch} from "react-icons/go"
import {Search} from "./Search";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import {mediaSizes} from "../common/commonStyles/MediaSizes";
import {TransparentHyperLink} from "../common/commonStyles/CommonStyles";
import {isMobile} from "react-device-detect";
import { AiOutlineClose } from "react-icons/ai";

const Wrapper = styled(Flex)<{ismobile:boolean}>`
  width: 100%;
  background-color: rgba(246, 251, 255, 0.5);
  height: 106px;
  display: flex;
  z-index: 15;
  position: relative;
  @media (max-width: ${mediaSizes.laptop}) {
    ${({ismobile}) => ismobile && css`
      height: 46px;
    `}
  }
`
const HeaderStyledLogo = styled(Logo)<{isMobile:boolean}>`
  width: 35px;
  height: 35px;
  margin-right: 20px;
  @media (max-width: ${mediaSizes.mobile}) {
    ${({isMobile}) => isMobile && css`
      width: 20px;
      height: 20px;
    `}
    margin-right: 10px;
  }
`
const HeaderLogoText = styled.span<{ismobile:boolean, isSearchOpened:boolean}>`
  font-family: var(--family-header);
  font-weight: 700;
  font-size: 30px;
  color: #58649C;
  @media (max-width: ${mediaSizes.mobile}) {
    ${({isSearchOpened}) => isSearchOpened && css`
      display: none;
    `}
    ${({ismobile}) => ismobile && css`
      font-size: 20px;
    `}
    font-size: 23px;
  }
`
const Main = styled(Content)`
  font-family: var(--family-text);
  font-size: 16px;
  color: #525252;
  font-weight: 400;
  line-height: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  @media (max-width: ${mediaSizes.laptop}) {
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
  @media (max-width: ${mediaSizes.laptop}) {
    display: none;
  }
`

const TelegramButton = styled.button<{ismobile:boolean}>`
  border-radius: 100%;
  background: linear-gradient(180deg, #8492D1 0%, #58649C 100%), #58649C;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 45px;
  height: 45px;
  ${({ismobile}) => ismobile && css`
    width: 35px;
    height: 35px;
  `}
`
const SearchContainer = styled.div`
  margin-right: 20px;
  @media (max-width: ${mediaSizes.laptop}) {
    display: none;
  }
`
const MobileSearch = styled.div`
  display: none;
  @media (max-width: ${mediaSizes.laptop}) {
    display: block;
    margin: 0 10px 0 15px;
  }
`
const SearchButton = styled.button<{ismobile:boolean}>`
  width: 45px; 
  height: 45px;
  border-radius: 15px;
  background: linear-gradient(180deg, #8492D1 0%, #58649C 100%), #58649C;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  ${({ismobile}) => ismobile && css`
    width: 35px;
    height: 35px;
  `}
`
const AvatarContainer = styled.div`
  @media (max-width: ${mediaSizes.laptop}) {
    display: none;
  }
`
const ActionPanelMob = styled.div`
  display: none;
  @media (max-width: ${mediaSizes.laptop}) {
    display: flex;
    justify-content: space-between;
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
  @media (max-width: ${mediaSizes.laptop}) {
    display: block;
    width: 285px;
    z-index: 100;
    top:100%;
    right: 0;
    margin-top:20px;
    position: absolute;
    background-color: white;
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
  @media (${mediaSizes.mobile}) {
    width: 150px;
  }
`
const UsersWidgets = styled.div`
  display: flex;
  z-index: 200;
  align-items: center;
  @media (max-width: ${mediaSizes.laptop}) {
    display: none;
  }
`

type Props = {}

export function Header(props: Props) {


    const {pathname} = useLocation()
    const path = pathname.split('/')[1]
    const isAuth = useAppSelector(state => state.authConfigs.isAuth)
    const user: IUser | null = useAppSelector(state => state.user.userData)
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

    return <Wrapper ismobile={isMobile}>
        <Main>
                <Link style={{zIndex: 150}} to='/'>
                    <Flex justifyContent='flex-start' alignItems='center'>
                        <HeaderStyledLogo isMobile={isMobile ? true : false}/>
                        <HeaderLogoText isSearchOpened={isMobSearchOpen} ismobile={isMobile}>MY CLICK</HeaderLogoText>
                    </Flex>
                </Link>
                <ActionPanelMob>
                    {!isMobSearchOpen &&
                        <TransparentHyperLink href='https://t.me/myclickmedia' target={'_blank'}>
                            <TelegramButton ismobile={isMobile}>
                                <FaTelegramPlane style={{margin:'2px 3px 0 0'}} size={isMobile ? 15 : 30} color='white'/>
                            </TelegramButton>
                        </TransparentHyperLink>
                    }
                    <MobileSearch>
                        {isMobSearchOpen ?
                            <Search mob={true} onToggleMobSearch={onToggleMobSearch}/>
                            :
                            <SearchButton ismobile={isMobile} onClick={() => onToggleMobSearch(true)}>
                                <GoSearch size={isMobile ? 15 : 30} color='white'/>
                            </SearchButton>
                        }
                    </MobileSearch>
                    {!isMobNavigationPanelOpen && !isMobSearchOpen && isAuth && <>
                        <svg width="0" height="0">
                            <linearGradient id="blue-gradient" x1="100%" y1="100%" x2="0%" y2="0%">
                                <stop stopColor="#8492D1" offset="0%" />
                                <stop stopColor="#58649C" offset="100%" />
                            </linearGradient>
                        </svg>
                        <HiOutlineMenuAlt3 size={isMobile ? 35 : 48} style={{ stroke: "url(#blue-gradient)"}} onClick={() => onToggleMobileNavigationPanel(true)}/>
                    </>
                    }
                    {isMobNavigationPanelOpen && <>
                        <svg width="0" height="0">
                            <linearGradient id="blue-gradient" x1="100%" y1="100%" x2="0%" y2="0%">
                                <stop stopColor="#8492D1" offset="0%" />
                                <stop stopColor="#58649C" offset="100%" />
                            </linearGradient>
                        </svg>
                        <AiOutlineClose  size={isMobile ? 35 : 48}  style={{ fill: "url(#blue-gradient)" }} onClick={() => onToggleMobileNavigationPanel(false)}/>
                        <NavigationMob>
                            <UserIdMob>
                                <Link to={`/dashboard`}>
                                    <Flex justifyContent='flex-start'>
                                        <Avatar avatar={user.avatar}/>
                                        <UserName>{user.name || 'Anonymous'}</UserName>
                                    </Flex>
                                </Link>
                            </UserIdMob>
                        </NavigationMob>
                    </>
                    }
                </ActionPanelMob>
                <UsersWidgets>
                    {path !== 'dashboard' && <SearchContainer>
                        <Search />
                    </SearchContainer>}
                    <AvatarContainer>
                        {isAuth && <Link to={`/dashboard`}><Avatar avatar={user.avatar}/></Link>}
                    </AvatarContainer>
                </UsersWidgets>
        </Main>
    </Wrapper>
}

