import {Flex} from "../commonStyles/Flex.styled";
import styled from "styled-components";
import {StatisticsPanel} from "../StatisticsPanel";
import {IoTimeOutline} from "react-icons/io5";
import { MdModeEditOutline } from "react-icons/md";


type CardImage = {
    src?: string
    alt: string
}
const Container = styled.div`
  background-color: white;
  border-radius: 15px;
  width: 570px;
`
const CardImage = styled.img<CardImage>`
  src: ${({src}) => src};
  alt: ${({alt}) => alt};
  width: 100%;
  height: 288px;
  margin: 0;
  border-radius: 15px 15px 0 0;
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
  src: ${({src}) => src};
  alt: ${({alt}) => alt};
  position: absolute;
  top: -5px;
  right: 0;
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


type Props = {
    categoryIds?:number[] | null,
    coverImg_withText:string,
    header:string,
    description:string,
    views:number,
    likes:number,
    dislikes:number,
    comments:number,
    createdAt:string
};


export const AccountArticleCard = (props: Props) => {



    return <Container>
        <CardImage src={props.coverImg_withText} alt='Article_head_image'/>
        <Info>
            {/*<Flag src={chooseFlag()} alt="flag"/>*/}
            <Text>
                <h1>{props.header}</h1>
                <p>
                    {props.description}
                </p>
            </Text>
            <Flex justifyContent='space-between'>
                <Date>
                    <IoTimeOutline style={{marginRight: '4px'}} color='#58649C'/>{'Yesterday'}
                    <Flex alignItems='center' style={{marginLeft:'15px', cursor:'pointer'}}>
                    <MdModeEditOutline />
                    <span>Edit</span>
                </Flex>
                    </Date>
                <StatisticsPanel views={props.views} comments={props.comments} likes={props.likes}
                                 dislikes={props.dislikes}/>
            </Flex>
        </Info>
    </Container>
};