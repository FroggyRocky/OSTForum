import styled from 'styled-components'
import {FlexType} from "./types.styled";
import {mediaSizes} from "../../mediaSizes.styled";

export const Flex = styled.div<FlexType>`
  display: flex;
  justify-content: ${({justifyContent}) => justifyContent || 'center'};
  flex-direction: ${({flexDirection}) => flexDirection || 'row'};
  align-items: ${({alignItems}) => alignItems || 'center'};
  gap: ${({gap}) => gap};
  flex-wrap: ${({flexWrap}) => flexWrap || 'wrap'};
`


export const RoundBtn = styled.div<{ radius?: string }>`
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