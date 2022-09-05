import {FaTelegramPlane} from "react-icons/fa";
import styled from "styled-components";
import {Flex} from "../commonStyles/Flex.styled";
import {mediaSizes} from "../commonStyles/MediaSizes";


const TelegramLinkContainer = styled(Flex)`
position: absolute;
  bottom: 0%;
  right: -15%;
  & > p {
    margin-top: 15px;
    font-family: var(--family-text)
    font-weight: 400;
    font-size: 16px;
    line-height: 15px;
    text-align: center;
    text-transform: uppercase;
    color: #58649C
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
export const TgButton = (props: Props) => {
    return      <TelegramLinkContainer flexDirection='column'>
        <TelegramButton>
            <FaTelegramPlane style={{marginLeft:'10px'}} size={35} color='white' />
        </TelegramButton>
        <p>SITEBLOG</p>
    </TelegramLinkContainer>
};