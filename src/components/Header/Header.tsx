import styled from "styled-components";
import {IoLogoTux} from 'react-icons/io5'
import {Flex} from '../commonStyles/Flex.styled'
import {Search} from "./Search";
import {Avatar} from "./Avatar";
import {Content} from "../commonStyles/Content.styled";

const Wrapper = styled(Flex)`
  width: 100%;
  background-color: rgba(246, 251, 255, 0.5);
  height: 106px;
  display: flex;
  justify-content: center;
  z-index: 15;
  position: relative;
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
      
    }
`


export function Header(props: {}) {

    return (
        <Wrapper>
            <Main>
                <IoLogoTux style={{backgroundColor: 'rgba(246, 251, 255, 0.5)'}}/>
                <Navigation justifyContent='space-between' alignItems='center'>
                    <span>Articles</span>
                    <span>Affiliate Programs</span>
                    <span>Network</span>
                    <span>Services</span>
                    <span>Cases</span>
                    <span>Knowledge</span>
                    <span>Vacancies</span>
                </Navigation>
               <Search />
                <Avatar/>
            </Main>
        </Wrapper>
    )
}

