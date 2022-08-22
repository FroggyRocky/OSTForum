import styled from 'styled-components'
import {Content} from "../commonStyles/Content.styled";
import {Flex} from "../commonStyles/Flex.styled";
import youtube from '../../assets/youtube.png'
import tg from '../../assets/tg.png'
import inst from '../../assets/inst.png'
import vk from '../../assets/vk.png'
import {ReactComponent as Logo} from '../../assets/logo.svg'
import {LogoText} from "../commonStyles/Logo.styled";


const Wrapper = styled.div`
  font-family: var(--family-text);
  font-weight: 400;
  font-size: 16px;
  line-height: 15px;
  color: #525252;
  border-top: 2.5px solid #58649C;;
`

const StyledLogo = styled.div`
    & > p {
      margin-top: 21px;
    }
`
const P = styled.p`
    margin-top:60px;
  text-align:center;
`

const StyledUl = styled.ul`
list-style: none;
  & > li {
    &:nth-child(2) {
      margin: 20px 0;
    }
  }
`

type Props = {};

export const Footer = (props: Props) => {
    return (
        <Wrapper>
            <Content style={{padding:'60px 0'}}>
        <Flex justifyContent='space-between' alignItems='start'>
            <StyledLogo>
                <Flex>
                    <Logo style={{backgroundColor: 'rgba(246, 251, 255, 0.5)', width:'35px', height:'35px'}}/>
                    <LogoText>MY CLICK</LogoText>
                </Flex>
                    <p>Slogan of the company</p>
            </StyledLogo>
            <Flex gap='70px' alignItems='start' >
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
            </Flex>
            <Flex alignItems='start' justifyContent='start'>
                <img src={youtube} alt="youtube_icon"/>
                <img src={tg} style={{marginLeft:'30px'}} alt="telegram_icon"/>
                <img src={vk} style={{margin:'0 30px'}} alt="vk_icon"/>
                <img src={inst} alt="instagram_icon"/>
            </Flex>
        </Flex>
                <P>© 2022 All rights reserved. Any copy of information without an active link to the source is prohibited </P>
            </Content>
        </Wrapper>
    );
};