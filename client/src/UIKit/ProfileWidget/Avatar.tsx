import * as React from 'react';
import {Flex} from "../StyledComponents/styledComponents";
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
            {/*<IoChevronDownOutline/>*/}
        </Flex>
    );
};