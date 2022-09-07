import styled, {css} from "styled-components";
import {Flex} from "../../commonStyles/Flex.styled";

export const BreakingLine = styled.hr`
  width: 100%;
  border: 1px solid #58649C;
  position: absolute;
  align-self: start;
`
export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 30px;
  margin-top: 60px;
`
export const Input = styled.input`
  background: rgba(255, 255, 255, 0.3);
  box-shadow: 0px 4px 14px rgba(0, 0, 0, 0.15);
  border-radius: 10px;
  border: none;
  font-family: var(--family-text);
  height: 84px;
  color: #525252;
  font-size: 30px;
  line-height: 29px;
  font-weight: 700;
  display: block;
  width: 100%;
  padding: 30px;

  &:focus {
    outline: none;
  }
`
export const TextArea = styled.textarea`
  background: rgba(255, 255, 255, 0.3);
  box-shadow: 0px 4px 14px rgba(0, 0, 0, 0.15);
  border-radius: 10px;
  border: none;
  font-family: var(--family-text);
  height: 240px;
  color: #272727;
  font-size: 25px;
  line-height: 35px;
  font-weight: 400;
  display: block;
  width: 100%;
  padding: 30px;
  resize: none;

  &:focus {
    outline: none;
  }
`
export const AddImgBtn = styled(Flex)<{ imgSrc: string }>`
  height: 253px;
  border: none;
  background: rgba(255, 255, 255, 0.3);
  box-shadow: 0px 4px 14px rgba(0, 0, 0, 0.15);
  border-radius: 15px;
  color: #525252;
  position: relative;

  ${({imgSrc}) => imgSrc && css`
    background-image: url(${imgSrc});
    background-repeat: no-repeat;
    background-size: cover;
    width: 1170px;
    height: 439px;
    margin: auto auto;
    align-self: center;
    background-position: center;
  `}
  & > p {
    opacity: 0.5;
    font-weight: 400;
    font-family: var(--family-text);
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
`
export const AddArticleButton = styled.button`
  width: 100%;
  height: 244px;
  background: rgba(255, 255, 255, 0.3);
  box-shadow: 0px 4px 14px rgba(0, 0, 0, 0.15);
  border-radius: 15px;
  border: none;
  margin: 0px 0 60px 0;

  & > p {
    font-family: var(--family-text);
    font-weight: 400;
    font-size: 25px;
    line-height: 24px;
    text-transform: uppercase;
    color: #58649C;
    opacity: 0.5;
    margin-top: 18px;
  }
`