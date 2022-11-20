import styled from "styled-components";
import {Flex} from '../../common/commonStyles/Flex.styled'
import {IoTimeOutline} from 'react-icons/io5'
import instFbFlag from '../../../assets/instFbFlag.png'
import affiliateFlag from '../../../assets/affiliateFlag.png'
import casesFlag from '../../../assets/casesFlag.png'
import cryptoFlag from '../../../assets/cryptoFlag.png';
import tikTokFlag from '../../../assets/tikTokFlag.png'
import eCommerceFlag from '../../../assets/eCommerceFlag.png'
import {NavLink} from "react-router-dom";
import {calcDate} from "../../../services/calcDate";
import {mediaSizes} from "../../common/commonStyles/MediaSizes";
import defaultCardCover from '../../../assets/defaultCardCover.png'
type CardImage = {
    src?: string
    alt: string
}
const Link = styled(NavLink)`
@media (max-width: 550px) {
  flex-grow: 1;
}
`
const Container = styled.div`
  background-color: white;
  border-radius: 15px;
  width: 550px;
  height: 490px;
  @media (max-width: ${mediaSizes.laptop}) {
    margin: 15px 0;
  }
  @media (max-width: 550px) {
    width: 100%;
    flex-shrink: 0;
    flex-grow: 1;
    position: relative;
    height: auto;
  }
`
const CardImageContainer = styled.div`
  position: relative;
  height: 288px;
  margin: 0;
  @media (max-width: ${mediaSizes.mobile}) {
    height: 50%;
  }
`
const CardImage = styled.img<CardImage>`
  alt: ${({alt}) => alt};
  src:${({src}) => src && src};
  height: 100%;
  border-radius: 15px 15px 0 0;
  width: 100%;
  @media(max-width: ${mediaSizes.mobile}) {
    width: 100%;
  }
`
const Info = styled.div`
  padding: 20px;
  position: relative;
  display: flex;
  flex-direction: column;
  height: 40%;
  justify-content: space-between;
  @media (max-width: ${mediaSizes.mobile}) {
    padding: 10px;
  }

`
const Text = styled.div`
  word-wrap: break-word;

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
  }

  @media (max-width: 1200px) {
    & h1 {
      font-size: 20px;
      line-height: 20px;
    }
  }
  @media (max-width: ${mediaSizes.mobile}) {
    word-break: break-all;
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
  width: 38px;
  height: 52px;
  position: absolute;
  top: 0px;
  right: 0;
  margin: 0;
  flex-shrink: 0;
  @media (max-width: ${mediaSizes.mobile}) {
    display: none;
  }
`
const FlagMob = styled.img`
  display: none;
  @media (max-width: ${mediaSizes.mobile}) {
    display: block;
    position: absolute;
    right: 0%;
    top: 0;
    width: 22px;
    height: 30px;
    z-index: 50;
  }
`
const Date = styled(Flex)`
  font-family: var(--family-text);
  font-weight: 400;
  font-size: 16px;
  line-height: 15px;
  color: #58649C;
  @media (max-width: ${mediaSizes.mobile}) {
    font-size: 9px;
    line-height: 9px;
  }

`

type Props = {
    id: number,
    category: string,
    coverImg_withText: string,
    header: string,
    description: string,
    previewDescription: string,
    views: number,
    likes: number,
    dislikes: number,
    comments: number,
    createdAt: string,
    historyPath?: Array<{ pathName: string, path: string }>
};

export const Card = (props: Props) => {
    const chooseFlag = () => {
        switch (props.category) {
            case 'facebook':
                return instFbFlag;
            case 'instagram':
                return instFbFlag;
            case 'affiliate':
                return affiliateFlag
            case 'cases':
                return casesFlag
            case 'crypto':
                return cryptoFlag
            case 'tikTok':
                return tikTokFlag
            case 'e-commerce':
                return eCommerceFlag
            default:
                break;
        }
    }


    return <Link to={`/article/${props.id}`} state={props.historyPath}>
        <Container>
            <CardImageContainer>
                <CardImage src={props.coverImg_withText} alt='Article_head_image'/>
            {props.category && <FlagMob src={chooseFlag()} alt="flag"/>}
            </CardImageContainer>
            <Info>
                {props.category && <Flag src={chooseFlag()} alt="flag"/>}
                <Text>
                    <h1>{props.header}</h1>
                </Text>
                <Text>
                    <p>{props.previewDescription}</p>
                </Text>
                <Flex justifyContent='space-between'>
                    <Date>
                        <IoTimeOutline style={{marginRight: '4px'}} color='#58649C'/>{`${calcDate(props.createdAt)}`}
                    </Date>
                    {/*<StatisticsPanel views={props.views > 100 ? '100+' : props.views}*/}
                    {/*                 comments={props.comments > 100 ? '100+' : props.comments}*/}
                    {/*                 likes={props.likes > 100 ? '100+' : props.likes}*/}
                    {/*                 dislikes={props.dislikes > 100 ? '100+' : props.dislikes}/>*/}
                </Flex>
            </Info>
        </Container>
    </Link>
};