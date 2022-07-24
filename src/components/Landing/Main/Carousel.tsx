import styled from "styled-components";
import bg from '../../../assets/cardBg.png'
import activeArr from '../../../assets/activeArr.svg'
import unactiveArr from '../../../assets/unactiveArr.svg'
import {useState} from "react";
import {Link} from 'react-router-dom'

const Wrapper = styled.div`
  overflow-x: hidden;
  z-index: 1;
  position: relative;
  min-width: 1358px;
  margin: auto auto;
`
const CarouselWindow = styled.div`
  width: 100%;
  display: flex;
  text-align: start;
  justify-content: space-between;
  gap: 30px;
`
const Card = styled.div<{offSet?:string | number}>`
  width: 570px;
  height: 288px;
  background-image: url(${bg});
  background-size: contain;
  background-color: rgba(0, 0, 0, 0.9);
  border-radius: 15px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  transform: translateX(${({offSet}) => offSet + '%' || 0});
  transition: transform 900ms ease-in-out;
  

  & > p {
    font-family: var(--family-text);
    font-weight: 700;
    font-size: 25px;
    line-height: 25px;
    color: #FFFFFF;
    margin-top: auto;
    padding: 0 0 20px 20px;
    background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.88) 100%);
  }
`
const Controls = styled.div`
  margin-top: 60px;
  display: flex;
  gap: 30px;
  justify-content: center;
  align-items: center;
`


type Props = {};
export const Carousel = (props: Props) => {

    const [offSet,setOffSet] = useState(0)

    const articlesData = [
        {
            header:'Article header 1',
            id:1
        },
        {
            header:'Article header 2',
            id:2
        },
        {
            header:'Article header 3',
            id:3
        },
        {
            header:'Article header 4',
            id:4
        },
        {
            header:'Article header 5',
            id:5
        },
    ]

    const PAGEWIDTH = 100

    function handleLeftClick() {
        setOffSet(prev => {
            const newOffSet = Math.min(prev + PAGEWIDTH, 100)
            return newOffSet
        })
    }

    function handleRightClick() {
        setOffSet(prev => {
            const maxOffSet = -(PAGEWIDTH * (articlesData.length - 2)) //2 as carousel windows fits 2 articles
            return Math.max(prev - PAGEWIDTH, maxOffSet)
        })
    }

    const Articles = articlesData.map(el => {
        return <Link key={el.id} to={`/article/${el.id}`}><Card offSet={offSet}>
            <p>{el.header}</p>
        </Card>
        </Link>
    })

    return <Wrapper>
        <CarouselWindow>
            {Articles}
        </CarouselWindow>
        <Controls>
            <img src={unactiveArr} onClick={handleLeftClick} alt="unactive_arriw"/>
            <img src={activeArr} onClick={handleRightClick} alt="active_arrow"/>
        </Controls>
    </Wrapper>
};