import {FlexType} from "./types.styled";
import {mediaSizes} from "../mediaSizes.styled";
import styled from 'styled-components'
import bg from '../assets/fabricBg.svg'

export const StyledFlex = styled.div<FlexType>`
  display: flex;
  justify-content: ${({justifyContent}) => justifyContent || 'center'};
  flex-direction: ${({flexDirection}) => flexDirection || 'row'};
  align-items: ${({alignItems}) => alignItems || 'center'};
  gap: ${({gap}) => gap};
  flex-wrap: ${({flexWrap}) => flexWrap || 'wrap'};
`


export const StyledRoundBtn = styled.div<{ radius?: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  background: linear-gradient(180deg, #8492D1 0%, #58649C 100%), #58649C;
  border-radius: ${props => props.radius || '100%'};
  @media screen and (max-width: ${mediaSizes.mobile}) {
    width: 24px;
    height: 24px;
  }
`
export const StyledContent = styled.div`
  width: 65%;
  margin: auto auto;
  position: relative;
  @media (max-width: ${mediaSizes.laptop}) {
    width: 95%;
  }
  @media(max-width: ${mediaSizes.mobile}) {
    width: 100%;
    padding: 0 20px;
  }
`
export const StyledH1 = styled.h1`
  font-family: var(--roadRadio);
  font-weight: 700;
  font-size: 72px;
  line-height: 73px;
  background: linear-gradient(180deg, #8492D1 0%, #58649C 100%), #58649C;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent;
  @media screen and (max-width:${mediaSizes.mobile}) {
    font-size: 24px;
    line-height: 28px;
  }
`

type ImageStyledType = {
    src:string,
    top?:string,
    left?:string,
    right?:string,
    bottom?:string,
    position?:string
    zIndex?:string,
    alt:string,
    pointerEvents?:string
}

export const StyledImage = styled.img<ImageStyledType>`
src:${({src}) => src};
  position:${({position}) => position || 'static'};
  top: ${({top}) => top};
  left: ${({left}) => left};
  right: ${({right}) => right};
  bottom: ${({bottom}) => bottom};
  z-index: ${({zIndex}) => zIndex};
  alt: ${({alt}) => alt};
  pointer-events: ${({pointerEvents}) => pointerEvents || 'auto'};
`

export const StyledWrapper = styled.div`
width: 100%;
  background-image: url(${bg});
  background-size: cover;
  height: 100%;
`