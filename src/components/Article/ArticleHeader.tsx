
import styled from "styled-components";
import {mediaSizes} from "../commonStyles/MediaSizes";

const HeaderContainer = styled.div`
  width: 100%;
  font-family: var(--family-text);
  font-size: 25px;
  line-height: 35px;
  color: #272727;
`
const HeaderBg = styled.div<{ image?: string }>`
  width: 100%;
  height: 439px;
  background-image: url(${({image}) => image});
  background-size: cover;
  background-repeat: no-repeat;
  position: relative;
  border-radius: 20px 20px 0 0;
  @media(max-width: ${mediaSizes.mobile}) {
    height: 142px;
    width:100%;
    background-size: cover;
    background-position: top left;
  }
`
const ImageBackDrop = styled.div`
width: 100%;
  height: 100%;
  backdrop-filter: blur(4px);
  background-color: rgba(88, 100, 156, 0.5);
  position: relative;
  border-radius: 20px 20px 0 0;

`
const Header = styled.div`
  color: white;
  font-family: var(--family-header);
  font-weight: 700;
  font-size: 92px;
  line-height: 90px;
  text-shadow: 0px 4px 5px rgba(0, 0, 0, 0.25);
  padding: 20px;
  word-break: break-word;
  @media(max-width: ${mediaSizes.laptop}) {
    font-size: 82px;
  }
  @media(max-width: ${mediaSizes.mobile}) {
    font-weight: 700;
    font-size: 25px;
    line-height: 26px;
    padding: 10px;
  }
  
`
const Description = styled.p`
  font-family:var(--family-text);
background-color: white;
  padding: 20px;
  border-radius: 0 0 15px 15px;
  @media(max-width: ${mediaSizes.mobile}) {
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 16px;
    color: #272727;
  }
`

type Props = {
header:string,
    description:string
    articleCoverImg:string
};
export const ArticleHeader = (props: Props) => {
    return   <HeaderContainer>
        <HeaderBg image={props.articleCoverImg}>
            <ImageBackDrop>
                <Header>
                    <span>{props.header}</span>
                </Header>
            </ImageBackDrop>
        </HeaderBg>
        <Description>
            {props.description}
        </Description>
    </HeaderContainer>
};