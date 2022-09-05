import styled from "styled-components";
import {Flex} from '../../commonStyles/Flex.styled'
import {IoTimeOutline} from 'react-icons/io5'
import inst from '../../../assets/instFlag.png';
import fb from '../../../assets/instFlag.png';
import {StatisticsPanel} from "../../common/StatisticsPanel";
import {NavLink} from "react-router-dom";
import {calcDate} from "../../common/services/calcDate";
import {mediaSizes} from "../../commonStyles/MediaSizes";

type CardImage = {
    src?: string
    alt: string
}
const Container = styled.div`
  background-color: white;
  border-radius: 15px;
  width: 570px;
  @media (max-width: ${mediaSizes.mobile}) {
    width: 100%;
    flex-shrink: 0;
    flex-grow: 1;
    position: relative;
  }
`
const CardImage = styled.img<CardImage>`
  src: ${({src}) => src};
  alt: ${({alt}) => alt};
  width: 100%;
  height: 288px;
  margin: 0;
  border-radius: 15px 15px 0 0;
  @media (max-width: ${mediaSizes.mobile}) {
    height: 50%;
  }
`
const Info = styled.div`
  padding: 20px;
  position: relative;
  @media(max-width: ${mediaSizes.mobile}) {
padding: 10px;
  }
  
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
  @media(max-width: ${mediaSizes.mobile}) {
    & h1 {
      font-size: 16px;
      line-height: 18px;
      color: #58649C;
    }
   & p {
     font-size: 12px;
     line-height: 16px;
     color: #525252;
     margin: 5px 0 10px 0;
   }
  }
`
const Flag = styled.img`
  src: ${({src}) => src};
  alt: ${({alt}) => alt};
  position: absolute;
  top: -3px;
  right: 0;
  margin: 0;
  flex-shrink: 0;
  @media(max-width: ${mediaSizes.mobile}) {
    display: none;
  }
`
const FlagMob = styled.img`
display: none;
  @media(max-width: ${mediaSizes.mobile}) {
    display: block;
    position: absolute;
    right: 10%;
    top: 0;
  }
`
const Date = styled(Flex)`
  font-family: var(--family-text);
  font-weight: 400;
  font-size: 16px;
  line-height: 15px;
  color: #58649C;
  @media(max-width: ${mediaSizes.mobile}) {
    font-size: 9px;
    line-height: 9px;
  }
 
`


type Props = {
    id: number,
    category: string,
    mainImg: string,
    header: string,
    description: string,
    views: number,
    likes: number,
    dislikes: number,
    comments: number,
    createdAt: string
};

export const Card = (props: Props) => {


    const chooseFlag = () => {
        switch (props.category) {
            case 'facebook':
                return inst;
            case 'instagram':
                return fb;
            default:
                break;
        }
    }



    return <NavLink to={`/article/${props.id}`}><Container>
        <CardImage src={props.mainImg} alt='Article_head_image'/>
        {props.category && <FlagMob src={chooseFlag()} alt="flag"/>}
        <Info>
            {props.category && <Flag src={chooseFlag()} alt="flag"/>}
            <Text>
                <h1>{props.header}</h1>
                <p>
                    {props.description}
                </p>
            </Text>
            <Flex justifyContent='space-between'>
                <Date>
                    <IoTimeOutline style={{marginRight: '4px'}} color='#58649C'/>{`${calcDate(props.createdAt)} ago`}
                </Date>
                <StatisticsPanel views={props.views} comments={props.comments} likes={props.likes}
                                 dislikes={props.dislikes}/>
            </Flex>
        </Info>
    </Container>
    </NavLink>
};