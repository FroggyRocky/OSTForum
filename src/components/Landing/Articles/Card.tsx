import styled from "styled-components";
import {Flex} from '../../commonStyles/Flex.styled'
import {IoTimeOutline} from 'react-icons/io5'
import flag from '../../../assets/instFlag.png';
import imageEx from '../../../assets/ArticleCardBg.png'
import {StatisticsPanel} from "../../common/StatisticsPanel";

type CardImage = {
    src?:string
    alt:string
}
const Container = styled.div`
  background-color: white;
  border-radius: 15px;
`
const CardImage = styled.img<CardImage>`
src: ${({src}) => src};
  alt:${({alt}) => alt};
  width:100%;
  margin: 0;
`
const Info = styled.div`
    padding: 20px;
  position: relative;
`
const Text = styled.div`
max-width: 486px;
  & h1 {
    font-family: var(--family-text);
    font-weight: 700;
    font-size: 25px;
    line-height: 25px;
    color: #58649C;
  }
  & p {
    font-family: var(--family-text);
    font-weight: 400;
    font-size: 18px;
    line-height: 23px;
    color: #525252;
    margin: 10px 0 24px 0;
  }
`
const Flag = styled.img`
src:${({src}) => src};
  alt:${({alt}) => alt};
  position:absolute;
  top:-5px;
  right:0;
  margin: 0;
  flex-shrink: 0;
`
const Date = styled(Flex)`
  font-family: var(--family-text);
  font-weight: 400;
  font-size: 16px;
  line-height: 15px;
  color: #58649C;

`


type Props = {};

export const Card = (props: Props) => {
    return <Container>
        <CardImage src={imageEx} alt='Article_head_image' />
        <Info>
            <Flag src={flag} alt="flag" />
        <Text>
        <h1>Article's Header</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias animi consequuntur earum fuga</p>
        </Text>
        <Flex justifyContent='space-between'>
            <Date>
                <IoTimeOutline style={{marginRight:'4px'}} color='#58649C' />{'Yesterday'}
            </Date>
            <StatisticsPanel views={10} comments={30} likes={40} dislikes={20} />
        </Flex>
        </Info>
    </Container>
};