import styled, {css} from "styled-components";
import {mediaSizes, firstPageMediaSizes} from "../../commonStyles/MediaSizes";
import {Link} from "react-router-dom";

export const Wrapper = styled.div`
  z-index: 1;
  position: relative;
  min-width: 1358px;
  margin: auto auto;
  overflow-x: hidden;
  @media (max-width: ${firstPageMediaSizes.laptop}) {
    z-index: 10;
    margin: 0 0;
    width: 100%;
    min-width: 100%;
    max-width: 100%;
  }
`

export const CarouselContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`
export const CarouselWindow = styled.div<{isThereOnlyOneItem:boolean}>`
  width: 1230px; // (30 + 30 + 30)-->gaps + (570 + 570)--> two card
  display: flex;
  text-align: start;
  justify-content: center;
  gap: 30px;
  margin: auto auto;
  @media (max-width: ${mediaSizes.mobile}) {
    width: calc(30px + 280px); // gaps + one element 280 px
    gap: 0;
    justify-content: ${({isThereOnlyOneItem}) => isThereOnlyOneItem ? 'center' : 'flex-start'};
  }
`
export const StyledLink = styled(Link)<{ translation?: string | number }>`
  transform: translateX(${({translation}) => translation + '%'});
  transition: transform 900ms ease-in-out;
`
export const Card = styled.div<{ imgSrc: string, translation?: string | number,isThereOnlyOneItem:boolean}>`
  width: 570px;
  height: 288px;
  background-image: url("${({imgSrc}) => imgSrc}");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-color: rgba(0, 0, 0, 0.9);
  border-radius: 15px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;

  & > p {
    font-family: var(--family-text);
    font-weight: 700;
    font-size: 25px;
    line-height: 25px;
    color: #FFFFFF;
    padding: 0 0 20px 20px;
    margin-top: auto;
    border-bottom-left-radius: 15px;
    border-bottom-right-radius: 15px;
    background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.88) 100%);
  }

  @media (max-width: ${mediaSizes.mobile}) {
    width: 280px;
    height: 141px;
    &:nth-child(odd) {
      margin: ${({isThereOnlyOneItem}) => !isThereOnlyOneItem && '0 15px'};
    }
    & > p {
      font-size: 16px;
      line-height: 18px;
    }
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
     height: 3.5px;
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
    height: 2px;
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