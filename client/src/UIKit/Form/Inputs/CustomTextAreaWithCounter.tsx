import styled, {css} from 'styled-components'
import {StyledErrorMessage} from "../StyledComponents";

const Container = styled.div`

`
const TextAreaContained = styled.div`
    position: relative;
`
const TextArea = styled.textarea`
  background: rgba(255, 255, 255, 0.3);
  box-shadow: 0px 4px 14px rgba(0, 0, 0, 0.15);
  border-radius: 10px;
  border: none;
  font-family: var(--gotham);
  height: 240px;
  color: #272727;
  font-size: 25px;
  line-height: 35px;
  font-weight: 400;
  display: block;
  width: 100%;
  padding: 30px;
  resize: none;
  position: relative;
  &:focus {
    outline: none;
  }
`
const Counter = styled.span<{isLimitAchieved:boolean}>`
  position:absolute;
  bottom: 0;
  right: 0.5%;
  ${({isLimitAchieved}) => isLimitAchieved && css`
  color: #F05050;
  ` }
`

type Props = {
    name:string,
    handleChange:(e:any) => void,
    placeholder:string,
    maxLength:number,
    inputType?:string,
    currentValueLength:number,
    value:string,
    error:string | undefined
};
export const CustomTextAreaWithCounter = (props: Props) => {
    return <Container>
        <TextAreaContained>
        <TextArea name={props.name} value={props.value} maxLength={props.maxLength} onChange={props.handleChange} placeholder={props.placeholder} />
        <Counter isLimitAchieved={props.currentValueLength === props.maxLength}>{props.currentValueLength}/{props.maxLength}</Counter>
    </TextAreaContained>
        {props.error && <StyledErrorMessage style={{marginTop:'30px'}}>{props.error}</StyledErrorMessage>}
    </Container>
};