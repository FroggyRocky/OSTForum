import styled from "styled-components";
import {Header} from "../Header/Header";
import {Main} from "./Main/Main";
import flipboardSVG from '../../assets/Flipboard.svg'
import lampSVG from '../../assets/Lamp.svg'
import lampMob from '../../assets/lampMob.svg'
import flipboardMob from '../../assets/flipboardMob.svg'
import curtainLeft from '../../assets/curtainLeft.png'
import curtainRight from '../../assets/curtainRight.png'
import curtainLeftMob from '../../assets/curtainLeftMob.png'
import curtainRightMob from '../../assets/curtainRightMob.png'
import {StyledImage, StyledWrapper} from "../../UIKit/BasicStyledComponents/basicStyledComponents";
import {Articles} from "./Articles/Articles";
import {Footer} from "../Footer/Footer";
import {useRef} from "react";
import {mediaSizes, firstPageMediaSizes} from "../../UIKit/mediaSizes.styled";
import {isMobile} from 'react-device-detect'

const FirstPageWrapper = styled.div`
  position: relative;
  overflow-x: clip;
`
const CurtainLeft = styled(StyledImage)`
  pointer-events:none;
  position:absolute;
  z-index:5;
  left: 0;
  top: 0;
  height: 100%;
 
@media(max-width: ${firstPageMediaSizes.laptop}) {
  background: #D9E3EC;
  opacity: 0.6;
  z-index: 1;
}
  @media(max-width:${firstPageMediaSizes.laptop}) {
    display: none;
  }
`
const CurtainRight = styled(StyledImage)`
  top:0;
  bottom: 0;
  pointer-events:none;
  position:absolute;
  z-index:5;
  right:0;
  height: 100%;
  @media(max-width: ${firstPageMediaSizes.laptop}) {
    z-index: 1;
    background: #D9E3EC;
    opacity: 0.6;
  }
  @media(max-width: ${firstPageMediaSizes.laptop}) {
   display: none;
  }
`
const CurtainLeftMob = styled(StyledImage)`
  pointer-events:none;
  position:absolute;
  z-index:5;
  left: 0;
  top: 0;
  height: 100%;
  display: none;
  @media (max-width: ${firstPageMediaSizes.laptop}) {
    display: block;
  }
`
const CurtainRightMob = styled(StyledImage)`
  top:0;
  pointer-events:none;
  position:absolute;
  z-index:5;
  right:0;
  height: 100%;
  display: none;
  @media (max-width: ${firstPageMediaSizes.laptop}) {
    display: block;
    right:0;
  }
`

const Lamp = styled(StyledImage)`
  pointer-events:none;
  position:absolute;
  z-index:10;
  bottom:0;
  right:0;
  @media (max-width: ${firstPageMediaSizes.desktopDisableVectors}) {
    display: none;
  }
`
const LampMob = styled(StyledImage)`
display: none;
  @media (max-width: ${mediaSizes.mobile}) {
    display: block;
    pointer-events:none;
    position:absolute;
    z-index:10;
    right: 0;
    bottom: 2%;
  }
`
const Flipboard = styled(StyledImage)`
  pointer-events:none;
  position:absolute;
  z-index:10;
  bottom:0;
  @media (max-width: ${firstPageMediaSizes.desktopDisableVectors}) { 
    display: none;
  }
`
const FlipboardMob = styled(StyledImage)`
display: none;
  @media (max-width: ${mediaSizes.mobile}) {
    display: block;
    position: absolute;
    z-index: 5;
    left: 0;
    bottom: 0;
  }
`
type Props = {};
export const Landing = (props: Props) => {
const articlesPageRef = useRef()

    return <div>
        <FirstPageWrapper>
            <CurtainLeft src={curtainLeft} alt='curtain'/>
            <CurtainLeftMob src={curtainLeftMob} alt='curtainLeftMobile' />
            <CurtainRight src={curtainRight} alt='curtain2'/>
            <CurtainRightMob src={curtainRightMob} alt='curtainRightMobile' />
            <Flipboard src={flipboardSVG} alt='flipboard'/>
            {isMobile ? <FlipboardMob src={flipboardMob} alt='mobile-flipboard'/> : <Flipboard src={flipboardSVG} alt='flipboard'/> }
            {isMobile ? <LampMob src={lampMob} alt='mobile_lamp' /> : <Lamp src={lampSVG} alt='lamp' /> }
            <Lamp src={lampSVG} alt='lamp' />
            <Header/>
            <Main articlesPageRef={articlesPageRef}/>
        </FirstPageWrapper>
        <StyledWrapper>
            <Articles articlesPageRef={articlesPageRef}/>
            <Footer/>
        </StyledWrapper>
    </div>
};