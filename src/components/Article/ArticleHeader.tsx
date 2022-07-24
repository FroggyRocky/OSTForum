import image from "../../assets/ArticleCardBg.png";
import styled from "styled-components";

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
`
const ImageBackDrop = styled.div`
width: 100%;
  height: 100%;
  backdrop-filter: blur(4px);
  background-color: rgba(88, 100, 156, 0.5);
  position: relative;
  border-radius: 20px 20px 0 0;
  & > span {
    color: white;
    font-family: var(--family-header);
    font-weight: 700;
    font-size: 92px;
    line-height: 90px;
    text-shadow: 0px 4px 5px rgba(0, 0, 0, 0.25);
    padding: 20px;
  }
`
const HeaderText = styled.p`
background-color: white;
  padding: 20px;
  border-radius: 0 0 15px 15px;
`

type Props = {

};
export const ArticleHeader = (props: Props) => {
    return   <HeaderContainer>
        <HeaderBg image={image}>
            <ImageBackDrop>
                <span>Article's Header</span>
            </ImageBackDrop>
        </HeaderBg>
        <HeaderText>Этот мануал поможет вам быстро адаптировать видеокреативы на другое ГЕО. Будет актуально для
            тех, кто готовил ролики на РУ, а теперь вынужден заходить в бурж. В статье рассмотрим способы
            поменять В статье рассмотрим способы енять оменять
        </HeaderText>
    </HeaderContainer>
};