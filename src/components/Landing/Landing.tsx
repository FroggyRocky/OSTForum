import styled from "styled-components";
import {Header} from "../Header/Header";
import {Main} from "./Main/Main";
import flipboardSVG from '../../assets/Flipboard.svg'
import lampSVG from '../../assets/Lamp.svg'
import lampMob from '../../assets/lampMob.png'
import flipboardMob from '../../assets/flipboardMob.png'
import curtainLeft from '../../assets/curtainLeft.png'
import curtainRight from '../../assets/curtainRight.png'
import curtainLeftMob from '../../assets/curtainLeftMob.png'
import curtainRightMob from '../../assets/curtainRightMob.png'
import {Image} from "../commonStyles/Image.styled";
import {Articles} from "./Articles/Articles";
import {Wrapper} from "../commonStyles/Wrapper.styled";
import {Footer} from "../Footer/Footer";
import {useAppDispatch} from "../../redux/hooks/hooks";
import {useEffect} from "react";
import {fetchArticles} from "../../redux/articles/articlesThunks";
import {mediaSizes} from "../commonStyles/MediaSizes";


const FirstPageWrapper = styled.div`
  position: relative;
`
const CurtainLeft = styled(Image)`
  pointer-events:none;
  position:absolute;
  z-index:5;
  left: 0;
  top: 0;
  height: 100%;
 
@media(max-width: ${mediaSizes.laptop}) {
  background: #D9E3EC;
  opacity: 0.6;
  z-index: 1;
}
  @media(max-width: ${mediaSizes.laptop}) {
    display: none;
  }
`
const CurtainRight = styled(Image)`
  top:0;
  bottom: 0;
  pointer-events:none;
  position:absolute;
  z-index:5;
  right:0;
  height: 100%;
  @media(max-width: ${mediaSizes.laptop}) {
    z-index: 1;
    background: #D9E3EC;
    opacity: 0.6;
  }
  @media(max-width: ${mediaSizes.laptop}) {
   display: none;
  }
`
const CurtainLeftMob = styled(Image)`
  pointer-events:none;
  position:absolute;
  z-index:5;
  left: 0;
  top: 0;
  height: 100%;
  display: none;
  @media (max-width: ${mediaSizes.laptop}) {
    display: block;
  }
`
const CurtainRightMob = styled(Image)`
  top:0;
  pointer-events:none;
  position:absolute;
  z-index:5;
  right:0;
  height: 100%;
  display: none;
  @media (max-width: ${mediaSizes.laptop}) {
    display: block;
    right:0;
  }
`

const Lamp = styled(Image)`
  pointer-events:none;
  position:absolute;
  z-index:10;
  bottom:0;
  right:0;
  @media (max-width: ${mediaSizes.laptop}) {
    display: none;
  }
`
const LampMob = styled(Image)`
display: none;
  @media (max-width: ${mediaSizes.laptop}) {
    display: block;
    pointer-events:none;
    position:absolute;
    z-index:10;
    right: 0;
    bottom: 10%;
  }
`
const Flipboard = styled(Image)`
  pointer-events:none;
  position:absolute;
  z-index:10;
  bottom:0;
  @media (max-width: ${mediaSizes.laptop}) { 
    display: none;
  }
`
const FlipboardMob = styled(Image)`
display: none;
  @media (max-width: ${mediaSizes.laptop}) {
    display: block;
    position: absolute;
    z-index: 5;
    left: 0;
    bottom: 0;
  }
`


type Props = {};
export const Landing = (props: Props) => {

    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(fetchArticles())
    }, [])

    return <div>
        <FirstPageWrapper>
            <CurtainLeft src={curtainLeft} alt='curtain'/>
            <CurtainLeftMob src={curtainLeftMob} alt='curtainLeftMobile' />
            <CurtainRight src={curtainRight} alt='curtain2'/>
            <CurtainRightMob src={curtainRightMob} alt='curtainRightMobile' />
            <Flipboard src={flipboardSVG} alt='flipboard'/>
            <FlipboardMob src={flipboardMob} alt='mobile-flipboard'/>
            <LampMob src={lampMob} alt='mobile_lamp' />
            <Lamp src={lampSVG} alt='lamp' />
            <Header/>
            <Main/>
        </FirstPageWrapper>
        <Wrapper>
            <Articles/>
            <Footer/>
        </Wrapper>
    </div>
};