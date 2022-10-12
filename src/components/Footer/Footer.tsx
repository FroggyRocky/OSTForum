import styled from 'styled-components'
import {Content} from "../commonStyles/Content.styled";
import {Flex} from "../commonStyles/Flex.styled";
import youtube from '../../assets/youtube.png'
import tg from '../../assets/tg.png'
import inst from '../../assets/inst.png'
import vk from '../../assets/vk.png'
import {ReactComponent as Logo} from '../../assets/logo.svg'
import {LogoText} from "../commonStyles/Logo.styled";
import {mediaSizes} from "../commonStyles/MediaSizes";

const Wrapper = styled.div`
  font-family: var(--family-text);
  font-weight: 400;
  font-size: 16px;
  line-height: 15px;
  color: #525252;
  border-top: 2.5px solid #58649C;;
`

const StyledLogo = styled(Flex)`
    & > p {
      margin-top: 21px;
    }
  @media (max-width: ${mediaSizes.mobile}) {
    & > p {
      margin:9px 0 18px 0;
    }
  }
`
const P = styled.p`
    margin-top:60px;
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
  margin-left:30px;
}
  & img:nth-child(3) {
    margin:0 30px;
  }
  @media(max-width: ${mediaSizes.mobile}) {
    & img:nth-child(2) {
      margin-left:20px;
    }
    & img:nth-child(3) {
      margin:0 20px;
    }
  }
`
const FooterContainer = styled(Flex)`
@media (max-width: ${mediaSizes.mobile}) {
  flex-direction: column;
  justify-content: center;
  align-items: center;
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
                    <LogoText>MY CLICK</LogoText>
                </Flex>
                    <p>Clicking with result</p>
        </StyledLogo>
            <LinksContainer gap='70px' alignItems='start' >
            <StyledUl>
                <li>Articles</li>
                <li>Coope</li>
                <li>NetWork</li>
            </StyledUl>
            <StyledUl>
                <li>Services</li>
                <li>Cases</li>
                <li>Knowledge</li>
            </StyledUl>
            <StyledUl>
                <li>Vacancies</li>
            </StyledUl>
            </LinksContainer>
            <StyledLinks alignItems='start' justifyContent='start'>
                <img src={youtube} alt="youtube_icon"/>
                <img src={tg} alt="telegram_icon"/>
                <img src={vk} alt="vk_icon"/>
                <img src={inst} alt="instagram_icon"/>
            </StyledLinks>
        </FooterContainer>
                <P>© 2022 All rights reserved. Any copy of information without an active link to the source is prohibited </P>
            </Content>
        </Wrapper>
    );
};