import styled, {css} from 'styled-components'
import {StyledErrorMessage} from "../StyledComponents";

const Container = styled.div`

`
const InputContained = styled.div`
    position: relative;
`
const Input = styled.input`
  background: rgba(255, 255, 255, 0.3);
  box-shadow: 0px 4px 14px rgba(0, 0, 0, 0.15);
  border-radius: 10px;
  border: none;
  font-family: var(--gotham);
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

export const CustomInputWithCounter = (props: Props) => {
    return <Container>
    <InputContained>
        <Input name={props.name} value={props.value}  onChange={props.handleChange} placeholder={props.placeholder} maxLength={props.maxLength} />
        <Counter isLimitAchieved={props.currentValueLength === props.maxLength}>{props.currentValueLength}/{props.maxLength}</Counter>
    </InputContained>
        {props.error && <StyledErrorMessage style={{marginTop:'30px'}}>{props.error}</StyledErrorMessage>}
    </Container>
};