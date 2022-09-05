import {Flex} from "../commonStyles/Flex.styled";
import {IoArrowRedo, IoEyeSharp, IoThumbsDown, IoThumbsUp} from "react-icons/io5";
import styled from "styled-components";
import {mediaSizes} from "../commonStyles/MediaSizes";

const Action = styled(Flex)<{ color: string }>`
  display: flex;
  align-items: center;
  color: #58649C;

  &:hover {
    color: ${({color}) => color}
  }

  & span {
    font-family: var(--family-text);
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 15px;
    color: #58649C;
    margin-left: 5px;
    &:hover {
      color: ${({color}) => color}
    }
    @media (max-width: ${mediaSizes.mobile}) {
      font-size: 9px;
      line-height: 9px;
    }
  }

  &:nth-child(2) {
    margin: 0 15px;
  }

  &:nth-child(4) {
    margin-left: 15px;
  }
`
const RepostBtn = styled(IoArrowRedo)`
  width: 19px;
  height: 19px;
  @media (max-width: ${mediaSizes.mobile}) {
    width: 12px;
    height: 12px;
  }
}
`
const ViewsBtn = styled(IoEyeSharp)`
  width: 19px;
  height: 19px;
  @media (max-width: ${mediaSizes.mobile}) {
    width: 12px;
    height: 12px;
  }
`
const LikesBtn = styled(IoThumbsUp)`
  width: 19px;
  height: 19px;
  @media (max-width: ${mediaSizes.mobile}) {
    width: 12px;
    height: 12px;
  }
`
const DislikesBtn = styled(IoThumbsDown)`
  width: 19px;
  height: 19px;
  @media (max-width: ${mediaSizes.mobile}) {
    width: 12px;
    height: 12px;
  }
`
type Props = {
    likes: number,
    views: number,
    dislikes: number,

};
export const ActionPanel = (props: Props) => {
    return <Flex>
        <Action color='#58649C'>
            <RepostBtn color='#58649C'/>
        </Action>
        <Action color='#58649C'>
            <ViewsBtn color='#58649C'/>
            <span>{props.views}</span>
        </Action>
        <Action color='#6FCB57' style={{cursor: 'pointer'}}>
            <LikesBtn/>
            <span>{props.likes}</span>
        </Action>
        <Action color='#F05050' style={{cursor: 'pointer'}}>
            <DislikesBtn/>
            <span>{props.dislikes}</span>
        </Action>
    </Flex>
};