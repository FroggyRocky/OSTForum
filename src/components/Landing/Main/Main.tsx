import styled, {css} from "styled-components";
import {Carousel} from "./Carousel";
import {IoChevronForwardOutline} from "react-icons/io5"
import {mediaSizes} from "../../common/commonStyles/MediaSizes";
import {useLocation} from "react-router-dom";
import {useEffect} from "react";
import {isMobile} from 'react-device-detect'

const Wrapper = styled.div<{isMobile:boolean}>`
  padding: 102px 0;
  text-align: center;
  overflow-x:hidden;
  @media (max-width: ${mediaSizes.laptop}) {
  height: initial;  
    padding: 102px 0;
  }
  ${({isMobile}) => isMobile && css`
  height: 100vh;
    padding: 30px 0 0 0;
  `};
`
const H1 = styled.h1`
  position: relative;
  z-index: 5;
  font-family: var(--family-header);
  font-weight: 700;
  font-size: 60px;
  line-height: 61px;
  color: #525252;
  margin-bottom: 60px;
  background: linear-gradient(180deg, #8492D1 0%, #58649C 100%), #58649C;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-fill-color: transparent;
  width: 100%;
  @media (max-width: ${mediaSizes.laptop}) {
    margin-bottom: 20px;
    font-weight: 700;
    font-size: 40px;
    line-height: 40px;
    padding: 0 10px;
    z-index: 2;
  }
`
const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;


`
const ButtonShadow = styled.div`
  width: 110px;
  height: 5px;
  margin-top: 109px;
  background-color: var(--bg-main);
  border: none;
  box-shadow: inset -10px 0px 44px -35px #AD9C9D;
  border-radius: 50px;
  position: absolute;
  z-index: 5;
  bottom: 5%;

  @media (max-width: ${mediaSizes.mobile}) {
    width: 50px;
    position: absolute;
    bottom: 0;
    height: 2px;
  }
`
const Button = styled.button`
  width: 78px;
  height: 78px;
  margin-top: 99.5px;
  border: none;
  border-radius: 100px;
  background: linear-gradient(180deg, #8492D1 0%, #58649C 100%);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 10;
  cursor: pointer;
  @media (max-width: ${mediaSizes.mobile}) {
    width: 48px;
    height: 48px;
  }

  &:hover {
    background: linear-gradient(180deg, #ABB6EB 0%, #838EC5 100%);
    box-shadow: none;
  }

  &:active {
    background: linear-gradient(180deg, #58649C 0%, #8492D1 100%);
    box-shadow: none;
  }
`
const StyledArrowDown = styled(IoChevronForwardOutline)`
  transform: rotate(90deg);
  width: 35px;
  height: 35px;
  @media (max-width: ${mediaSizes.mobile}) {
    width: 30px;
    height: 30px;
  }
`

type Props = {
    articlesPageRef: any
};
export const Main = (props: Props) => {
    const hash = useLocation().hash
    useEffect(() => {
        const timeout = setTimeout(() => {
            if (!hash) return
            const articlesPageRef = props.articlesPageRef.current
            if (!articlesPageRef) return
            articlesPageRef.scrollIntoView({behavior: "smooth", block: "start", inline: "start"})
        }, 0)
        return () => {
            window.scrollTo(0, 0)
            clearTimeout(timeout)
        }
    }, [])


    return <Wrapper isMobile={isMobile ? true : false}>
        <H1>The Most Popular Articles</H1>
        <Carousel/>
        <ButtonContainer>
            <a href={'#articles__main'}>
                <Button>
                    <StyledArrowDown/>
                </Button>
            </a>
            <ButtonShadow/>
        </ButtonContainer>
    </Wrapper>
};