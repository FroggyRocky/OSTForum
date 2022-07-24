import {Flex} from "../commonStyles/Flex.styled";
import {IoArrowRedo, IoChatbubbleEllipsesSharp, IoEyeSharp, IoThumbsDown, IoThumbsUp} from "react-icons/io5";
import styled from "styled-components";



const StatIndex = styled(Flex)`
  align-items: center;
  color:#58649C;
  &:nth-child(2) {
    margin: 0 15px;
  }

  &:nth-child(4) {
    margin:0 15px;
  }
`

type Props = {
    views: number,
    comments: number,
    likes: number,
    dislikes: number,
    withRepost?:boolean | undefined,
};
export const StatisticsPanel = (props: Props) => {
    return <Flex justifyContent='' alignItems=''>
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
    </Flex>

};