import {FaTelegramPlane} from "react-icons/fa";
import styled from "styled-components";
import {StyledFlex} from "../BasicStyledComponents/basicStyledComponents";
import {firstPageMediaSizes, mediaSizes} from "../mediaSizes.styled";
import {Link} from 'react-router-dom'

const TelegramLinkContainer = styled(StyledFlex)`
position: absolute;
  bottom: 1.5%;
  right: -20%;
  user-select: none;
  & > p {
    margin-top: 15px;
    font-family: var(--gotham);
    font-weight: 400;
    font-size: 16px;
    line-height: 15px;
    text-align: center;
    text-transform: uppercase;
    color: #58649C
  }
  @media(max-width: ${firstPageMediaSizes.desktopDisableVectors}) {
    right: 0;
  }
  @media(max-width: ${mediaSizes.mobile}) {
    display: none;
  }
`
const TelegramButton = styled.button`
  width: 60px;
  height: 60px;
  border-radius: 50px;
  background: linear-gradient(180deg, #8492D1 0%, #58649C 100%), #58649C;
  border: none;
  display: flex;
  align-items: center;
`

type Props = {

};
export const TelegramBtn = (props: Props) => {
    return  <Link to='https://t.me/myclickmedia' target={'_blank'} >
        <TelegramLinkContainer flexDirection='column'>
        <TelegramButton>
            <FaTelegramPlane style={{marginLeft:'10px'}} size={35} color='white' />
        </TelegramButton>
        <p>myclickmedia</p>
    </TelegramLinkContainer>
    </Link>
};