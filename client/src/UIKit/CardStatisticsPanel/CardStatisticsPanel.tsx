import {StyledFlex} from "../BasicStyledComponents/basicStyledComponents";
import {IoArrowRedo, IoChatbubbleEllipsesSharp, IoEyeSharp, IoThumbsDown, IoThumbsUp} from "react-icons/io5";
import styled from "styled-components";
import {mediaSizes} from "../mediaSizes.styled";



const StatIndex = styled(StyledFlex)`
  align-items: center;
  color:#58649C;
  &:nth-child(2) {
    margin: 0 15px;
  }

  &:nth-child(4) {
    margin:0 15px;
  }
  @media (max-width: ${mediaSizes.mobile}) {
    font-family: var(--gotham);
    font-style: normal;
    font-weight: 400;
    font-size: 9px;
    line-height: 9px;
    color: #58649C;
  }
`

type Props = {
    views: number | string,
    comments: number | string,
    likes: number | string,
    dislikes: number | string,
    withRepost?:boolean | undefined,
};
export const CardStatisticsPanel = (props: Props) => {
    return <StyledFlex justifyContent='' alignItems=''>
        {props.withRepost &&
            <StatIndex>
                <IoArrowRedo />
        </StatIndex>}
        <StatIndex>
            <IoEyeSharp style={{marginRight: '3px'}}/>{props.views}
        </StatIndex>
        <StatIndex>
            <IoChatbubbleEllipsesSharp style={{marginRight: '3px'}}/>{props.comments}
        </StatIndex>
        <StatIndex>
            <IoThumbsUp style={{marginRight: '3px'}}/>{props.likes}
        </StatIndex>
        <StatIndex>
            <IoThumbsDown style={{marginRight: '3px'}}/>{props.dislikes}
        </StatIndex>
    </StyledFlex>

};