import styled from "styled-components";
import {Header} from "../Header/Header";
import {Main} from "./Main/Main";
import curtain from '../../assets/curtain.png'
import curtain2 from '../../assets/curtain2.png'
import flipboard from '../../assets/flipboard.png'
import lamp from '../../assets/lamp.png'
import {Image} from "../commonStyles/Image.styled";
import {Articles} from "./Articles/Articles";
import {Wrapper} from "../commonStyles/Wrapper.styled";
import {Footer} from "../Footer/Footer";

const FirstPageWrapper = styled.div`
  position: relative;
`


type Props = {};
export const Landing = (props: Props) => {
    return <div>
        <FirstPageWrapper>
            <Image pointerEvents='none' position='absolute' zIndex='5' src={curtain} alt='curtain'/>
            <Image pointerEvents='none' position='absolute' zIndex='5' src={curtain2} right='0' alt='curtain2'/>
            <Image pointerEvents='none' position='absolute' zIndex='10' bottom='0' src={flipboard} alt='flipboard'/>
            <Image pointerEvents='none' position='absolute' zIndex='10' bottom='0' right='0' src={lamp} alt='lamp'/>
            <Header/>
            <Main/>
        </FirstPageWrapper>
        <Wrapper>
            <Articles/>
            <Footer/>
        </Wrapper>
    </div>
};