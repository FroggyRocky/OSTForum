import styled, {css} from "styled-components";
import {StyledFlex} from "../../../UIKit/BasicStyledComponents/basicStyledComponents";
import {mediaSizes} from "../../../UIKit/mediaSizes.styled";
import {NavLink} from "react-router-dom";

export const CategoriesContainer = styled(StyledFlex)`
  padding: 0 0 41px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  @media (max-width: ${mediaSizes.mobile}) {
    display: flex;
    padding: 0;
    justify-content: start;
  }
`
export const Category = styled.span<{ isSelected: boolean }>`
  font-family: var(--gotham);
  font-weight: 400;
  font-size: 20px;
  line-height: 19px;
  text-decoration-line: underline;
  color: #272727;
  cursor: pointer;
  text-transform: capitalize;
  user-select: none;
  @media (max-width: ${mediaSizes.mobile}) {
    padding-bottom: 20px;
    padding-right: 5px;
    &:nth-child(2) {
      margin: 0 0;
    }

    &:nth-child(4), &:nth-child(5), &:nth-child(6) {
      display: none;
    }
  }
  ${({isSelected}) => isSelected && css`
    color: #58649C;
    font-weight: bold;
  `}

`

export const ArticlesContainer = styled(StyledFlex)`
  margin-bottom: 50px;
  position: relative;
  gap: 30px;
  @media (max-width: ${mediaSizes.laptop}) {
    gap: 0;
  }
`

///Styles for Articles Cards///
type CardImage = {
    src?: string
    alt: string
}
export const CategoryContainer = styled.div`
  position: absolute;
  right: 3%;
  top: 0;
  display: flex;
  gap: 10px;
  visibility: hidden;
  transform: translateY(-100%);
  transition: transform 600ms ease-in-out, visibility 600ms ease-in-out;
  @media (max-width: ${mediaSizes.mobile}) {
    visibility: visible;
    transform: translateY(0%);
  }
`
export const CategoryFlag = styled.img`
  width: 38px;
  height: 52px;
`
export const ArticleCardLink = styled(NavLink)`
  overflow-y: clip;
  &:hover ${CategoryContainer} {
    transform: translateY(0%);
    visibility: visible;
  }
  @media (max-width: 550px) {
    flex-grow: 1;
    
  }
`
export const Container = styled.div`
  background-color: white;
  border-radius: 15px;
  width: 550px;
  height: 490px;
  @media (max-width: ${mediaSizes.laptop}) {
    margin: 15px 0;
  }
  @media (max-width: 550px) {
    width: 100%;
    flex-shrink: 0;
    flex-grow: 1;
    position: relative;
    height: auto;
  }
`
export const CardImageContainer = styled.div`
  position: relative;
  height: 288px;
  margin: 0;
  @media (max-width: ${mediaSizes.mobile}) {
    height: 50%;
  }
`
export const CardImage = styled.div`
  height: 100%;
  border-radius: 15px 15px 0 0;
  width: 100%;
  @media (max-width: ${mediaSizes.mobile}) {
    width: 100%;
  }
`
export const Info = styled.div`
  padding: 20px;
  position: relative;
  display: flex;
  flex-direction: column;
  height: 40%;
  justify-content: space-between;
  @media (max-width: ${mediaSizes.mobile}) {
    padding: 10px;
  }

`
export const Text = styled.div`
  word-wrap: break-word;

  & h1 {
    font-family: var(--gotham);
    font-weight: 700;
    font-size: 25px;
    line-height: 25px;
    color: #58649C;
  }

  & p {
    font-family: var(--gotham);
    font-weight: 400;
    font-size: 18px;
    line-height: 23px;
    color: #525252;
  }

  @media (max-width: 1200px) {
    & h1 {
      font-size: 20px;
      line-height: 20px;
    }
  }
  @media (max-width: ${mediaSizes.mobile}) {
    word-break: break-all;
    & h1 {
      font-size: 16px;
      line-height: 18px;
      color: #58649C;
    }

    & p {
      font-size: 12px;
      line-height: 16px;
      color: #525252;
      margin: 5px 0 10px 0;
    }
  }
`
export const Date = styled(StyledFlex)`
  font-family: var(--gotham);
  font-weight: 400;
  font-size: 16px;
  line-height: 15px;
  color: #58649C;
  @media (max-width: ${mediaSizes.mobile}) {
    font-size: 9px;
    line-height: 9px;
  }
`

