import { MdOutlineNotificationsActive } from "react-icons/md";
import { IoChatboxEllipsesOutline } from "react-icons/io5";
import styled from "styled-components";
import {Flex} from "../commonStyles/Flex.styled";

const Icon = styled.div`
&:nth-child(2) {
  margin: 0 26px 0 28px;
}
`

type Props = {

};
export const DashboardWidgets = (props: Props) => {
    return <Flex alignItems='center'>
<Icon>
    <IoChatboxEllipsesOutline size={18} color='#58649C'/>
</Icon>
        <Icon>
            <MdOutlineNotificationsActive color='#58649C' size={20} />
        </Icon>
    </Flex>
};