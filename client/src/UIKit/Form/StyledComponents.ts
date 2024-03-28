import styled, {css} from "styled-components";
import {StyledFlex} from "../BasicStyledComponents/basicStyledComponents";

export const StyledBreakingLine = styled.hr`
  width: 100%;
  border: 1px solid #58649C;
  position: absolute;
  align-self: start;
`
export const StyledFormContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  margin-top: 60px;
`
export const StyledCoversContainer = styled.div`
display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  border-radius: 15px;
  height: 288px;
  & > label {
    width: 50%;
    flex-grow: 1;
    flex-shrink: 0;
  }
`
const AddImgBtnBaseStyles = css<{ imgSrc: string, isAttaching: boolean }>`
  flex-grow: 1;
  height: 100%;
  justify-self: stretch;
  background: rgba(255, 255, 255, 0.3);
  box-shadow: 0px 4px 14px rgba(0, 0, 0, 0.15);
  color: #525252;
  position: relative;
  cursor: pointer;
  padding: 0 20px;
  ${({isAttaching}) => isAttaching && css`
    background: white;
  `}
  ${({imgSrc}) => imgSrc && css`
    background-image: url(${imgSrc});
    background-repeat: no-repeat;
    background-size: cover;
    margin: auto auto;
    align-self: center;
    background-position: center;
  `}
  & > p {
    opacity: 0.5;
    font-weight: 400;
    font-family: var(--gotham);
    transition: opacity ease-in-out 300ms;
  }

  & p:nth-child(3) {
    font-size: 25px;
    line-height: 24px;
    text-transform: uppercase;
    margin: 30px 0 10px 0;
  }

  & p:nth-child(4) {
    font-size: 20px;
    line-height: 19px;
  }

  &:hover {
    background-color: white;

    & > p {
      opacity: 1;
    }

    & > svg {
      opacity: 1;
      transition: opacity ease-in-out 300ms;
    }
  }
`
export const StyledAddImgWithTextBtn = styled(StyledFlex)<{ imgSrc: string, isAttaching: boolean }>`
  ${AddImgBtnBaseStyles};
  border-radius: 15px 0 0 15px;
  border-right: 1px solid #58649C;
`
export const StyledArticleEditorContainer = styled.div`
  margin: 60px 0
`
export const StyledAddImgWithOutTextBtn = styled(StyledFlex)<{ imgSrc: string, isAttaching: boolean }>`
  ${AddImgBtnBaseStyles};
  border-radius: 0 15px 15px 0;
`
export const StyledAddArticleButtonContainer = styled.div`
margin: 0 0 60px 0;
`
export const StyledAddArticleButton = styled.button`
  width: 100%;
  height: 244px;
  background: rgba(255, 255, 255, 0.3);
  box-shadow: 0px 4px 14px rgba(0, 0, 0, 0.15);
  border-radius: 15px;
  border: none;

  & > p {
    font-family: var(--gotham);
    font-weight: 400;
    font-size: 25px;
    line-height: 24px;
    text-transform: uppercase;
    color: #58649C;
    opacity: 0.5;
    margin-top: 18px;
    transition: opacity ease-in-out 300ms;
  }

  &:hover {
    background-color: white;

    & > p {
      opacity: 1;
    }

    & > svg {
      transition: opacity ease-in-out 300ms;
      opacity: 1;
    }
  }
`
export const StyledErrorMessage = styled.p`
color: #F05050;
  font-family: var(--gotham);
  font-weight: 400;
  font-size: 22px;
  line-height: 13px;
`