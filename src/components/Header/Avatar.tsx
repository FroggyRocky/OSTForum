// @flow 
import * as React from 'react';
import {IoChevronDownOutline} from 'react-icons/io5'
import {Flex} from "../commonStyles/Flex.styled";
import styled from "styled-components";
import {IoPersonOutline} from 'react-icons/io5';

const Img = styled.img`
width: 40px;
  height: 40px;
  border-radius: 100%;
`

type Props = {
    avatar?:string | null
};
export const Avatar = (props: Props) => {
    return (
        <Flex>
            {props.avatar ? <Img src={props.avatar} alt='avatar' />  : <IoPersonOutline/> }
            <IoChevronDownOutline/>
        </Flex>
    );
};