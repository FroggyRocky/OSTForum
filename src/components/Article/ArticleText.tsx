import styled from "styled-components";
import {mediaSizes} from "../commonStyles/MediaSizes";
const Container = styled.div`
  width: 100%;
  background-color: white;
  border-radius: 15px 15px 0 0;
`
const Content = styled.div`
  padding: 30px;
  font-family: var(--family-text);
& > h1, h2, h3 {
  margin: 20px 0;
  @media(max-width: ${mediaSizes.mobile}) {
    margin: 15px 0 15px 0;
  }
}
  & > h1 {
    font-weight: 700;
    font-size: 30px;
    line-height: 30px;
    color: #58649C;
    @media(max-width: ${mediaSizes.mobile}) {
      font-size: 18px;
      line-height: 22px;
    }
  }
  & > ul {
    margin: 16px 0 16px 1%;
    
  }
& > ul > li {
  font-family: var(--family-text);
  font-weight: 700;
  margin-left: 2%;
  font-size: 18px;
  line-height: 32px;
  color:#525252;
  @media(max-width: ${mediaSizes.mobile}) {
    font-size: 12px;
    line-height: 18px;
  }
}
  & > p {
    font-weight: 400;
    font-size: 18px;
    line-height: 32px;
    color: #000000;
    font-family: var(--family-text);
    @media(max-width: ${mediaSizes.mobile}) {
      font-size: 12px;
      line-height: 18px;
    }
  }
    & > figure pre img {
      width: 100%;
      height: 100%;
      margin: 20px 0;
      border-radius: 15px;
      display: block;
      padding-right: 15px;
      object-fit: contain;
    }

  & > h2, h3 {
    font-weight: 700;
    font-size: 25px;
    line-height: 28px;
    color: #525252;
    @media(max-width: ${mediaSizes.mobile}) {
      font-weight: 700;
      font-size: 18px;
      line-height: 22px;
    }
  }

  & > a {
    color: #58649C;
    text-decoration: underline;
    font-weight: 400;
    font-size: 18px;
    line-height: 32px;
  }


`

type Props = {
    text:string
};
export const ArticleText = (props: Props) => {
    return <Container>
        <Content dangerouslySetInnerHTML={{__html:props.text}}>

        </Content>
    </Container>
};