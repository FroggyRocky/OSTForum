import styled from "styled-components";
import {Flex} from '../../commonStyles/Flex.styled'
import {Wrapper} from "../../commonStyles/Wrapper.styled";
import {Content} from "../../commonStyles/Content.styled";
import {ReactElement, useState} from "react";
import {TgButton} from "../../common/TgButton";

const H1 = styled.h1`
  font-family: var(--family-header);
  font-weight: 700;
  font-size: 60px;
  line-height: 61px;
  background: linear-gradient(180deg, #8492D1 0%, #58649C 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent;
  margin-bottom: 40px;
`
const H2 = styled.h2`
    font-family: var(--family-text);
    font-weight: 400;
    font-size: 35px;
    line-height: 33px;
    text-align: center;
    color: #525252;
  margin:90px 0 60px 0;
`
const Category = styled.div`
  min-width: 254px;
  height: 51px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: var(--family-text);
  font-weight: 400;
  font-size: 20px;
  line-height: 19px;
  color: #000000;
  background: rgba(255, 255, 255, 0.3);
  box-shadow: 0px 4px 14px rgba(0, 0, 0, 0.15);
  border-radius: 15px;
  border:none;
  margin-bottom: 31px;
`

type Props = {
header:string,
categoriesList:Array<any>, /// change it later
children:ReactElement[];
};
export const Categories = (props: Props) => {
const [currentCategory, setCategory] = useState('Gambling and casino')

    const categories = props.categoriesList.map((el, index) => { /// get also from props
     return <Category key={index}>
            {el}
        </Category>
    })

    return <Wrapper style={{padding:'40px 0 120px 0'}}>
        <Content>
        <H1>{props.header}</H1>
        <Flex gap='51' justifyContent='space-between'>
            {categories}
        </Flex>
         <H2>{currentCategory}</H2>
            <Flex gap='48px' flexDirection='column'>
            {props.children}
            </Flex>
            <TgButton />
        </Content>
    </Wrapper>
};