// @flow 
import * as React from 'react';
import {IoChevronDownOutline} from 'react-icons/io5'
import {Flex} from "../commonStyles/Flex.styled";
import styled from "styled-components";
import {IoPersonOutline} from 'react-icons/io5';


type Props = {
    
};
export const Avatar = (props: Props) => {
    return (
        <Flex>
            <IoPersonOutline/>
            <IoChevronDownOutline/>
        </Flex>
    );
};