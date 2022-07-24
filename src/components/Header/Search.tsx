// @flow 
import * as React from 'react';
import {IoSearch} from 'react-icons/io5'
import {Flex} from "../commonStyles/Flex.styled";
import styled from "styled-components";

const Container = styled(Flex)`

`
const IconContainer = styled(Flex)`
width: 30px;
  height: 30px;
  background-color: #D9E3EC;
  border-radius: 5px;
`
const Input = styled.input`
border: none;
  height: 30px;
  border-radius: 5px;
  padding-left: 10px;
  &::placeholder {
    font-family: 'Gotham Pro',sans-serif;
    font-weight: 400;
    font-size: 14px;
    line-height: 15px;
    color: #D9D9D9;
  }
  &:focus {
    outline: none;
  }
`

type Props = {
    
};
export const Search = (props: Props) => {
    return (
        <Container>
            <Input type="text" placeholder='Search'/>
            <IconContainer>
            <IoSearch/>
            </IconContainer>
        </Container>
    );
};