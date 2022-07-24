import styled from "styled-components";
import {Carousel} from "./Carousel";
import {IoChevronForwardOutline} from "react-icons/io5";
import {Articles} from "../Articles/Articles";

const Wrapper = styled.div`
  padding:102px 0 0px 0;
  text-align: center;
`
const H1 = styled.h1`
font-family: var(--family-header);
  font-weight: 700;
  font-size: 60px;
  line-height: 61px;
  color: #525252;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  margin-bottom: 90px;
`
const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`
const ButtonShadow = styled.div`
width: 110px;
  height: 5px;
  margin-top: 109px;
  background-color: var(--bg-main);
  border: none;
  box-shadow: inset -10px 0px 44px -35px #AD9C9D;
  border-radius: 50px;
`
const Button = styled.button`
width: 78px;
  height: 78px;
  margin-top: 99.5px;
  border: none;
  border-radius: 100px;
  background: linear-gradient(180deg, #8492D1 0%, #58649C 100%);
  color: white;
`

type Props = {
    
};
export const Main = (props: Props) => {
    return <Wrapper>
<H1>The Most Popular Articles</H1>
        <Carousel/>
        <ButtonContainer>
        <Button>
            <IoChevronForwardOutline size={50} style={{transform:'rotate(90deg)'}}/>
        </Button>
            <ButtonShadow />
        </ButtonContainer>
    </Wrapper>
};