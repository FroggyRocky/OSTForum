import {Flex} from "./commonStyles/Flex.styled";
import {IoArrowRedo, IoEyeSharp, IoThumbsDown, IoThumbsUp} from "react-icons/io5";
import styled from "styled-components";
import {mediaSizes} from "./commonStyles/MediaSizes";
import {Dispatch, SetStateAction} from "react";

const Action = styled(Flex)<{ color: string }>`
  display: flex;
  align-items: center;
  color: #58649C;

  &:hover {
    & {
      color: ${({color}) => color}
    }

    & > span {
      color: ${({color}) => color}
    }
  }

  & span {
    font-family: var(--family-text);
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 15px;
    color: #58649C;
    margin-left: 5px;
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
  width: 30px;
  height: 30px;
  @media (max-width: ${mediaSizes.mobile}) {
    display: none;
  }
}
`
const RepostBtnMobile = styled(IoArrowRedo)`
  display: none;
  @media (max-width: ${mediaSizes.mobile}) {
    display: block;
    width: 12px;
    height: 12px;
  }
}
`


type Props = {
    likes: number,
    views: number,
    dislikes: number,
    setShareDropDownState: Dispatch<SetStateAction<boolean>>,
    setShareMobileModalState: Dispatch<SetStateAction<boolean>>
};
export const ActionPanel = (props: Props) => {

    function setShareBtnState() {
        props.setShareDropDownState(prev => !prev)
        props.setShareMobileModalState(true)
    }

return <Flex>
    <Action color='#91A0E7' onClick={setShareBtnState} style={{cursor: 'pointer'}}>
        <RepostBtn/>
        <RepostBtnMobile/>
    </Action>
</Flex>
}
;