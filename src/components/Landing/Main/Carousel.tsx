import styled from "styled-components";
import {ReactComponent as ActiveArrLeft} from '../../../assets/activeArrLeft.svg'
import {ReactComponent as UnactiveArrLeft} from '../../../assets/unactiveArrLeft.svg'
import {ReactComponent as ActiveArrRight} from '../../../assets/activeArrRight.svg'
import {ReactComponent as UnactiveArrRight} from '../../../assets/unactiveArrRight.svg'
import {useEffect, useRef, useState} from "react";
import {Link} from 'react-router-dom'
import {useAppSelector} from "../../../redux/hooks/hooks";


const Wrapper = styled.div`
  overflow-x: hidden;
  z-index: 1;
  position: relative;
  min-width: 1358px;
  margin: auto auto;
`
const CarouselContainer = styled.div`
width: 75%;
  margin: auto auto;
`
const CarouselWindow = styled.div<{offSet?: string | number}>`
  width: 1200px;
  display: flex;
  text-align: start;
  justify-content: center;
  gap: 30px;
  margin: auto auto;
   transform: translateX(${({offSet}) => offSet + '%'});
  transition: transform 900ms ease-in-out;
`
const Card = styled.div<{ imgSrc: string }>`
  width: 570px;
  height: 288px;
  background-image: url("${({imgSrc}) => imgSrc}");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-color: rgba(0, 0, 0, 0.9);
  border-radius: 15px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;


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

    const [isFirstArticleVisible, setFirstArticleVisibility] = useState<boolean>()
    const [isLastArticleVisible, setLastArticleVisibility] = useState<boolean>()
    const lastArticleRef = useRef() as React.MutableRefObject<HTMLAnchorElement>;
    const firstArticleRef = useRef() as React.MutableRefObject<HTMLAnchorElement>;
    const observerFramesRef = useRef() as React.MutableRefObject<HTMLDivElement>
    const [offSet, setOffSet] = useState(0)
    const articlesData = useAppSelector(state => state.articles.articles)
    const PAGEWIDTH = 70

    const observerOptions = {
        root:observerFramesRef.current,
        threshold:1.0,
    }
    useEffect(() => {
        const firstArticleObserver = new IntersectionObserver((entries) => {
            setFirstArticleVisibility(entries[0].isIntersecting)
        }, observerOptions)
        const lastArticleObserver = new IntersectionObserver((entries) => {
            setLastArticleVisibility(entries[0].isIntersecting)
        }, observerOptions)
        if (firstArticleRef.current || lastArticleRef.current) {
            firstArticleObserver.observe(firstArticleRef.current);
            lastArticleObserver.observe(lastArticleRef.current)
        }
    }, [firstArticleRef, lastArticleRef, offSet])

    function handleLeftClick(e:any) {
        if(e.detail === 1) {
            setOffSet(prev => prev + PAGEWIDTH)
        }
    }

    function handleRightClick(e:any) {
        if(e.detail === 1) {
            setOffSet(prev => prev - PAGEWIDTH)
        }
    }

    const Articles = articlesData.map((el, index) => {
        if (index === +articlesData.length - 1) {
            return <Link ref={lastArticleRef} key={el.id} to={`/article/${el.id}`}>
                <Card id={`${el.id}`} imgSrc={el.mainImg} >
                    <p>{el.header}</p>
                </Card>
            </Link>
        } else if (index === 0) {
            return <Link ref={firstArticleRef} key={el.id} to={`/article/${el.id}`}>
                <Card id={`${el.id}`} imgSrc={el.mainImg}>
                    <p>{el.header}</p>
                </Card>
            </Link>
        } else {
            return <Link key={el.id} to={`/article/${el.id}`}>
                <Card id={`${el.id}`} imgSrc={el.mainImg}>
                    <p>{el.header}</p>
                </Card>
            </Link>
        }
    })
    return <Wrapper>
        <CarouselContainer ref={observerFramesRef}>
        <CarouselWindow offSet={offSet}>
            {Articles}
        </CarouselWindow>
        </CarouselContainer>
        <Controls>
            {isFirstArticleVisible ? <UnactiveArrLeft/> : <ActiveArrLeft onClick={handleLeftClick}/>}
            {isLastArticleVisible ? <UnactiveArrRight/> : <ActiveArrRight onClick={handleRightClick}/>}
        </Controls>
    </Wrapper>
};