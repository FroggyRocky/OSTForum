import styled from 'styled-components'
import {Content} from "../common/commonStyles/Content.styled";
import {Flex} from "../../UIKit/StyledComponents/styledComponents";
import tg from '../../assets/tg.svg'
import inst from '../../assets/inst.svg'
import {ReactComponent as Logo} from '../../assets/logo.svg'
import {LogoText} from "../common/commonStyles/Logo.styled";
import {mediaSizes} from "../../mediaSizes.styled";
import { FaRedditSquare } from "react-icons/fa";
import {isMobile} from "react-device-detect";

const Wrapper = styled.div`
  font-family: var(--gotham);
  font-weight: 400;
  font-size: 16px;
  line-height: 15px;
  color: #525252;
  border-top: 2.5px solid #58649C;;
`

const StyledLogo = styled(Flex)`
  user-select: none;
    & > p {
      margin: 25px 0;
    }
  @media (max-width: ${mediaSizes.mobile}) {
    & > p {
      margin:9px 0 18px 0;
    }
  }
`
const P = styled.p`
    margin-top:30px;
  text-align:center;
  @media (max-width: ${mediaSizes.mobile}) {
    margin:18px 20px 0 20px
  }
`
const StyledIcon = styled(Logo)`
  background-color: rgba(246, 251, 255, 0.5);
  width:35px; 
  height:35px;
  margin-right: 15px;
  @media (max-width: ${mediaSizes.mobile}) {
    margin-right: 10px;
  }
`
const StyledUl = styled.ul`
list-style: none;
  & > li {
    &:nth-child(2) {
      margin: 20px 0;
    }
  }
`
const LinksContainer = styled(Flex)`
@media (max-width: ${mediaSizes.laptop}) {
  display: none;
}
`
const StyledLinks = styled(Flex)`
  align-items: center;
& img:nth-child(2) {
  margin: 0 30px;
}
  @media(max-width: ${mediaSizes.mobile}) {
    & img:nth-child(2) {
      margin:0 20px;
    }
 
  }
`
const FooterContainer = styled(Flex)`
  @media (max-width: 1357px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 0px;
  }
`

type Props = {};

export const Footer = (props: Props) => {
    return (
        <Wrapper>
            <Content style={{padding:'60px 0'}}>
        <FooterContainer justifyContent='space-between' alignItems='start'>
            <StyledLogo flexDirection='column'>
                <Flex>
                    <StyledIcon/>
                    <LogoText ismobile={isMobile}>MY CLICK</LogoText>
                </Flex>
                    <p>Every click has a story, be part of MyClick!</p>
        </StyledLogo>
            {/*<LinksContainer gap='70px' alignItems='start' >*/}
            {/*<StyledUl>*/}
            {/*    <li>Articles</li>*/}
            {/*    <li>Coope</li>*/}
            {/*    <li>NetWork</li>*/}
            {/*</StyledUl>*/}
            {/*<StyledUl>*/}
            {/*    <li>Services</li>*/}
            {/*    <li>Cases</li>*/}
            {/*    <li>Knowledge</li>*/}
            {/*</StyledUl>*/}
            {/*<StyledUl>*/}
            {/*    <li>Vacancies</li>*/}
            {/*</StyledUl>*/}
            {/*</LinksContainer>*/}
            <StyledLinks alignItems='start' justifyContent='start'>
                <a href="https://t.me/myclickmedia"><img src={tg} alt="telegram_icon"/></a>
                <img src={inst} alt="instagram_icon"/>
                <svg width="40" height="40">
                    <defs>
                        <linearGradient id="myGradient" gradientTransform="rotate(90)">
                            <stop offset="0%"  stopColor="#8492D1" />
                            <stop offset="100%" stopColor="#58649C" />
                        </linearGradient>
                    </defs>
                    <FaRedditSquare className='reddit_icon' size={39} style={{ fill: "url('#myGradient')"}}  />
                </svg>
            </StyledLinks>
        </FooterContainer>
                <P>© 2022 All rights reserved. Any copy of information without an active link to the source is prohibited </P>
            </Content>
        </Wrapper>
    );
};