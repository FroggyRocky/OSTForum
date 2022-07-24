import {Wrapper} from "../commonStyles/Wrapper.styled";
import {Content} from "../commonStyles/Content.styled";
import styled from "styled-components";
import {Link} from 'react-router-dom'
import {ArticleHeader} from "./ArticleHeader";
import {IoTimeOutline} from 'react-icons/io5'
import {IoChevronDown} from 'react-icons/io5'
import {Flex} from "../commonStyles/Flex.styled";
import {ArticleText} from "./ArticleText";
import {ArticleComments} from "./ArticleComments";
import {TgButton} from "../common/TgButton";

const StyledPath = styled.p`
  font-family: var(--family-text);
  font-weight: 400;
  font-size: 16px;
  line-height: 15px;
  color: #525252;
  display: flex;
  justify-content: space-between;
  & > p {
    display: flex;
    align-items: center;
  }

  & > a {
    text-decoration: underline;
    &:visited {
      color: #525252;
    }
  }
`
const ContentWidget = styled(Flex)`
  font-family: var(--family-text);
  font-weight: 400;
  font-size: 18px;
  line-height: 16px;
  color: #58649C;
`

type Props = {};
export const Article = (props: Props) => {


    return <Wrapper style={{padding:'40px 0 120px 0'}}>
        <Content>
            <StyledPath>
               <p><Link to='/'>Home</Link>{' > '}<Link to='/'>Articles</Link> {' > '} Article's Header</p>
                <p><IoTimeOutline /> {'Yesterday'}</p>
            </StyledPath>
            <ArticleHeader />
            <ContentWidget alignItems='center' justifyContent='end'>
               <span>Content</span>
                <IoChevronDown/>
            </ContentWidget>
            <ArticleText />
            <ArticleComments />
            <TgButton />
        </Content>
    </Wrapper>
};