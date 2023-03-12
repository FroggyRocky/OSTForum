import {Flex} from "../../../UIKit/StyledComponents/styledComponents";
import styled from "styled-components";

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
const Button = styled.button`
  width: 243px;
  height: 50px;
  font-family: var(--gotham);
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-transform: uppercase;
  color: #FFFFFF;
  background: linear-gradient(160.75deg, #8492D1 12.87%, #58649C 78.31%);
  box-shadow: 0px 2px 0px #1A265B, inset 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 5px;
  border: none;
`
type Props = {
    header:string,
    text:string,
    keys:Array<any>,
    img:string
};

export const CardWithRegistration = (props: Props) => {

    const keys = props.keys.map((el, index) => {
        return <Key key={index}>
            <span>{el}</span>
        </Key>
    })

    return <StyledCard>
        <Image width='240px' height='240px' src={props.img} alt="card_image"/>
        <div style={{padding:'30px'}}>
                <Info>
                    <h1>{props.header}</h1>
                    <p>{props.text}</p>
                </Info>
            <Flex justifyContent='space-between' alignItems=''>
                <Keys gap='20px'>
                    {keys}
                </Keys>
                <Button>
                    <span>Sign Up</span>
                </Button>
            </Flex>
        </div>
    </StyledCard>
};