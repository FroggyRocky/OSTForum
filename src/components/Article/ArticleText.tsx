import styled from "styled-components";
import image from '../../assets/articleContentImg.png'

const Container = styled.div`
  width: 100%;
  background-color: white;
  border-radius: 15px 15px 0 0;
`
const Content = styled.div`
  padding: 40px;
  font-family: var(--family-text);

  & > h1 {
    font-weight: 700;
    font-size: 30px;
    line-height: 30px;
    color: #58649C;
  }

  & > p {
    font-weight: 400;
    font-size: 18px;
    line-height: 32px;
    color: #525252;
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

  & > img {
    width: 100%;
    height: 100%;
  }
`

type Props = {};
export const ArticleText = (props: Props) => {
    return <Container>
        <Content>
            <h1>Как заменить музыку на видео: пошаговый гайд</h1>
            <p>
                Для работы воспользуемся профессиональным инструментом Adobe Premiere PRO. Этот софт существует в
                бесплатной версии как для Windows, так и для MacOS. Если используете другую программу (DaVinci, Canva,
                Crello) — суть не поменяется.
                Для начала возьмем классический креатив под условно-бесплатный трафик. Исходный вариант выглядит так:
                <a href="#">https://youtube.com/shorts/cAjf1_9qVuA?feature=share</a>
                Открываем Premiere и выбираем «New Project».
            </p>
            <img src={image} alt=""/>
            <h2>Как заменить музыку</h2>
            <p>
                Для работы воспользуемся профессиональным инструментом Adobe Premiere PRO. Этот софт существует в
                бесплатной версии как для Windows, так и для MacOS. Если используете другую программу (DaVinci, Canva,
                Crello) — суть не поменяется.
                Для начала возьмем классический креатив под условно-бесплатный трафик. Исходный вариант выглядит так:
                <a href="#">https://youtube.com/shorts/cAjf1_9qVuA?feature=share</a>
                Открываем Premiere и выбираем «New Project».
            </p>
        </Content>
    </Container>
};