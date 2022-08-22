import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  background-color: white;
  border-radius: 15px 15px 0 0;
`
const Content = styled.div`
  padding: 40px;
  font-family: var(--family-text);
& > h1, h2, h3 {
  margin: 40px 0 20px 0;
}
  & > h1 {
    font-weight: 700;
    font-size: 30px;
    line-height: 30px;
    color: #58649C;
  }
& > ul > li {
  font-weight: 700;
  margin-left: 1.2%;
}
  & > p {
    font-weight: 400;
    font-size: 18px;
    line-height: 32px;
   color: #525252;
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

  & > h2 {
    font-weight: 700;
    font-size: 25px;
    line-height: 28px;
    color: #525252;
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