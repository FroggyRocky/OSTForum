import {Flex} from "../commonStyles/Flex.styled";
import styled from "styled-components";




const StyledCard = styled.div`
  display: flex;
  background: #FFFFFF;
  box-shadow: 0px 4px 14px rgba(0, 0, 0, 0.15);
  border-radius: 15px;
  font-family: var(--family-text)
`
const Image = styled.img`
    border-radius: 15px;
`
const Info = styled.div`
    margin:0 20px 22px 0;
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
const Price = styled.div`
  font-family: var(--family-text);
    & h1 {
      font-weight: 700;
      font-size: 84px;
      line-height: 84px;
      background: linear-gradient(160.75deg, #8492D1 12.87%, #58649C 78.31%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      text-fill-color: transparent;
      margin: 0;
    }
  & p {
    font-weight: 400;
    font-size: 16px;
    line-height: 14px;
    color: #525252;
  }
`
const Link = styled.div`
`
const Keys = styled(Flex)`
  font-family: var(--family-text);
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
    header:string,
    text:string,
    keys:Array<any>,
    payment:number,
    link:string,
    img:string
};
export const CardWithPrice = (props: Props) => {


        const keys = props.keys.map((el, index) => {
            return <Key key={index}>
                <span>{el}</span>
            </Key>
        })

        return <StyledCard>
            <Image width='240px' height='240px' src={props.img} alt="card_image"/>
            <div style={{padding:'30px'}}>
                <Flex flexWrap='nowrap' justifyContent='space-between' alignItems='start'  >
                    <Info>
                        <h1>{props.header}</h1>
                        <p>{props.text}</p>
                    </Info>
                    <Price>
                        <h1>
                            {props.payment + '$'}
                        </h1>
                        <p>Payment</p>
                    </Price>
                </Flex>
                <Flex justifyContent='space-between' alignItems=''>
                    <Keys gap='20px'>
                        {keys}
                    </Keys>
                    <Link>
                        <a href={props.link}>Go to the Website</a>
                    </Link>
                </Flex>
            </div>
        </StyledCard>
};