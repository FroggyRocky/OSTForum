import {Flex} from "../../../UIKit/StyledComponents/styledComponents";
import styled from "styled-components";
import {StatisticsPanel} from "../StatisticsPanel";
import {IoTimeOutline} from "react-icons/io5";

const StyledCard = styled.div`
  display: flex;
  background: #FFFFFF;
  box-shadow: 0px 4px 14px rgba(0, 0, 0, 0.15);
  border-radius: 15px;
  font-family: var(--gotham)
`
const Image = styled.img`
  border-radius: 15px;
`
const Info = styled.div`
  margin: 0 20px 22px 0;
  font-weight: 400;

  & h1 {
    margin-bottom: 10px;
    font-size: 35px;
    line-height: 33px;
    text-transform: uppercase;
    color: #58649C;
  }

  & p {
    font-size: 18px;
    line-height: 23px;
    color: #525252;
  }
`
const Date = styled.div`
  display: flex;
  align-items: center;
  color: #58649C;
  margin-right: 20px;
`
const Keys = styled(Flex)`
  font-family: var(--gotham);
  font-weight: 400;
  font-size: 14px;
  line-height: 23px;
  color: #525252;
`
const Key = styled.div`
  background: #FFFFFF;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;

  & > span {
    padding: 0 10px;
  }
`


type Props = {
    header: string,
    text: string,
    keys: Array<any>,
    img: string,
    views: number,
    comments: number,
    likes: number,
    dislikes: number,
    publishingDate: string
};


export const CardWithStatistics = (props: Props) => {
    const keys = props.keys.map((el, index) => {
        return <Key key={index}>
            <span>{el}</span>
        </Key>
    })

    return <StyledCard>
        <Image width='240px' height='240px' src={props.img} alt="card_image"/>
        <Flex style={{padding: '30px'}} flexWrap='nowrap' flexDirection='column' alignItems='start' justifyContent='space-between'>
            <Info>
                <h1>{props.header}</h1>
                <p>{props.text}</p>
            </Info>
            <Flex justifyContent='space-between' style={{width:'100%'}}>
                <Flex>
                <Date>
                    <IoTimeOutline style={{marginRight: '4px'}}/>
                    <span>{props.publishingDate}</span>
                </Date>
                <Keys gap='20px'>
                    {keys}
                </Keys>

                </Flex>
                <StatisticsPanel withRepost views={props.views} comments={props.comments} likes={props.likes}
                                 dislikes={props.dislikes}/>
            </Flex>
        </Flex>
    </StyledCard>
};