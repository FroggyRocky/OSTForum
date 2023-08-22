import styled, {css} from "styled-components";
import {firstPageMediaSizes} from "../../../UIKit/mediaSizes.styled";
import {mediaSizes} from "../../../UIKit/mediaSizes.styled";
import {Link} from "react-router-dom";
export const Wrapper = styled.div`
  z-index: 1;
  position: relative;
  margin: auto auto;
  overflow-x: hidden;
  width: 100%;
  @media (max-width: ${firstPageMediaSizes.laptop}) {
    z-index: 10;
    margin: 0 0;
    width: 100%;
    min-width: 100%;
    max-width: 100%;
  }
  @media(max-width: ${mediaSizes.mobile}) {
   z-index: 2;
  }
`

export const CarouselContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`
export const CarouselWindow = styled.div<{isThereOnlyOneItem:boolean}>`
  display: flex;
  text-align: center;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  transition: transform 900ms ease-in-out;
  @media (max-width: ${mediaSizes.mobile}) {
    justify-content: ${({isThereOnlyOneItem}) => isThereOnlyOneItem ? 'center' : 'flex-start'};
  }
`
export const Card = styled(Link)<{ translation: string | number, maxtranslation:string | number}>`
  width: 570px;
  height: 288px;
  background-color: rgba(0, 0, 0, 0.9);
  border-radius: 15px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  overflow-y: hidden;
  transform: translateX(${({translation}) => translation + '%'});
  transition: transform 900ms ease-in-out;
  margin: auto 30px;
  @media screen and (min-width: 3500px) {
    margin: auto auto;
  }
  @media screen and (max-width: ${mediaSizes.mobile}) {
    width: 280px;
    height: 141px;
    margin: auto 5px auto 5px;
  }

`

export const Controls = styled.div`
  margin-top: 60px;
  margin-bottom: 20px;
  display: flex;
  gap: 30px;
  justify-content: center;
  align-items: center;
`


export const ArrContainer = styled.div<{unactive:boolean}>`
  padding: 10px;
${({unactive}) => !unactive && css`  
  cursor: pointer;
&:hover {
 & > div {
   width: 388px;
   height: 3.5px;
   &:after, &:before {
     content: "";
     background: #58649C;
     color: #58649C;
     position: absolute;
     height: 4px;
     width: 15px;
   }
 }
}
  &:active {
    & > div {
      background-color: #91A0E7;
      &:after, &:before {
        content: "";
        background: #91A0E7;
      }
  }
`
}
${({unactive}) => unactive && css`
& > div {
 width: 60px;
 transition: width ease-in-out 400ms;
  opacity: 0.5;
}
`}
`

export const StyledActiveArrLeft = styled.div`
  width: 340px;
  background-color: #58649C;
  height: 2px;
  position: relative;
  transition: width ease-in-out 400ms;
  &:after, &:before {
    content: "";
    background: #58649C;
    color: #58649C;
    position: absolute;
    height: 3px;
    width: 15px;
  }
  &:after {
    left: -3px;
    top: -5px;
    transform: rotate(-45deg);
  }
  &:before {
    left: -3px;
    bottom: -5px;
    transform: rotate(45deg);
  }
`

export const StyledActiveArrRight = styled.div`
  width: 340px;
  background-color: #58649C;
  height: 2px;
  position: relative;
  transition: width ease-in-out 400ms;
  &:after, &:before {
    content: "";
    background: #58649C;
    color: #58649C;
    position: absolute;
    height: 2px;
    width: 15px;
  }
 &:after {
   right: -3px;
   top: -5px;
   transform: rotate(45deg);
 }
  &:before {
    right: -3px;
    bottom: -5px;
    transform: rotate(-45deg);
  }
`