import styled from "styled-components";
import {ReactComponent as UnactiveArrRightMob} from '../../../assets/unactiveArrRightMob.svg'
import {ReactComponent as ActiveArrRightMob} from '../../../assets/activeArrRightMob.svg'
import {ReactComponent as UnactiveArrLeftMob} from '../../../assets/unactiveArrLeftMob.svg'
import {ReactComponent as ActiveArrLeftMob} from '../../../assets/activeArrLeftMob.svg'
import {ReactComponent as ActiveArrLeft} from '../../../assets/activeArrLeft.svg'
import {ReactComponent as UnactiveArrLeft} from '../../../assets/unactiveArrLeft.svg'
import {ReactComponent as ActiveArrRight} from '../../../assets/activeArrRight.svg'
import {ReactComponent as UnactiveArrRight} from '../../../assets/unactiveArrRight.svg' // change to one arrow from react-icons and change its width dynamically
import {useEffect, useRef, useState} from "react";
import {Link} from 'react-router-dom'
import {useAppSelector} from "../../../redux/hooks/hooks";
import {mediaSizes} from "../../commonStyles/MediaSizes";

const Wrapper = styled.div`
  z-index: 1;
  position: relative;
  min-width: 1358px;
  margin: auto auto;
  overflow-x: hidden;
  @media (max-width: ${mediaSizes.laptop}) {
    z-index: 10;
    margin: 0 0;
    width: 100%;
    min-width: 100%;
    max-width: 100%;
  }
`
const CarouselContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`
const CarouselWindow = styled.div`
  width: 1230px; // (30 + 30 + 30)-->gaps + (570 + 570)--> two card
  display: flex;
  text-align: start;
  justify-content: center;
  gap: 30px;
  margin: auto auto;
  @media (max-width: ${mediaSizes.laptop}) {
    width: calc(30px + 280px); // gaps + one element 280 px
    gap: 15px;
    justify-content: flex-start;
  }
`
const StyledLink = styled(Link)<{ translation?: string | number }>`
  transform: translateX(${({translation}) => translation + 'px'});
  transition: transform 900ms ease-in-out;
  @media (max-width: ${mediaSizes.laptop}) {
    transform: translateX(${({translation}) => translation + '%'});
    transition: transform 900ms ease-in-out;
  }
`
const Card = styled.div<{ imgSrc: string, translation?: string | number }>`
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
    padding: 0 0 20px 20px;
    margin-top: auto;
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
    background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.88) 100%);
  }

  @media (max-width: ${mediaSizes.laptop}) {
    width: 280px;
    height: 141px;
    & > p {
      font-size: 16px;
      line-height: 18px;
    }
  }
`
const Controls = styled.div`
  margin-top: 60px;
  display: flex;
  gap: 30px;
  justify-content: center;
  align-items: center;
  @media (max-width: ${mediaSizes.laptop}) {
    display: none;
  }
`
const ControlsMob = styled.div`
  display: none;
  @media (max-width: ${mediaSizes.laptop}) {
    position: relative;
    z-index: 10;
    display: flex;
    gap: 10px;
    margin: 16px 15px 0 15px;
    justify-content: center;
    align-items: center;

  }
`
type Props = {};
export const Carousel = (props: Props) => {
        const [isFirstArticleVisible, setFirstArticleVisibility] = useState<boolean>()
        const [isLastArticleVisible, setLastArticleVisibility] = useState<boolean>()
        const lastArticleRef = useRef() as React.MutableRefObject<HTMLAnchorElement>;
        const firstArticleRef = useRef() as React.MutableRefObject<HTMLAnchorElement>;
        const observerFramesRef = useRef() as React.MutableRefObject<HTMLDivElement>
        const [translation, setTranslation] = useState(0)
        const articlesData = useAppSelector(state => state.articles.articles)
        const [PAGEWIDTH, setPageWidth] = useState(1230) // px - two elements plus their gaps for desktop

        const observerOptions = {
            root: observerFramesRef.current,
            threshold: 1.0
        }

        useEffect(() => {
                const width = window.innerWidth

                if (+width <= 1650) { //MediaSizes.ts - laptop
                    setPageWidth(105)
                }
                else {
                    setPageWidth(1230)
                }
            }, [window.innerWidth]
        )


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
        }, [firstArticleRef, lastArticleRef, translation])

        function handleLeftClick(e: any) {
            console.log(e)
            if (e.detail === 1) {
                setTranslation(prev => prev + PAGEWIDTH)
            }
        }

        function handleRightClick(e: any) {
            console.log(e.detail)
            if (e.detail === 1) {
                setTranslation(prev => prev - PAGEWIDTH)
            }
        }
    function handleLeftClickMob(e: any) {
        setTranslation(prev => {
            const newTranslation = Math.min(prev + PAGEWIDTH, 0)
            return newTranslation
        })
    }

    function handleRightClickMob(e: any) {
        setTranslation(prev => {
            const maxTranslation = -(PAGEWIDTH * (articlesData.length - 1))
            const newTranslation = Math.max(prev - PAGEWIDTH, maxTranslation)
            return newTranslation
        })

    }

        const Articles = articlesData.map((el, index) => {
            if (index === +articlesData.length - 1) {
                return <StyledLink translation={translation} ref={lastArticleRef} key={el.id} to={`/article/${el.id}`}>
                    <Card id={`${el.id}`} imgSrc={el.mainImg}>
                        <p>{el.header}</p>
                    </Card>
                </StyledLink>
            } else if (index === 0) {
                return <StyledLink translation={translation} ref={firstArticleRef} key={el.id} to={`/article/${el.id}`}>
                    <Card id={`${el.id}`} imgSrc={el.mainImg}>
                        <p>{el.header}</p>
                    </Card>
                </StyledLink>
            } else {
                return <StyledLink  translation={translation} key={el.id} to={`/article/${el.id}`}>
                    <Card id={`${el.id}`} imgSrc={el.mainImg}>
                        <p>{el.header}</p>
                    </Card>
                </StyledLink>
            }
        })
        return <Wrapper>
            <CarouselContainer>
                <CarouselWindow ref={observerFramesRef}>
                    {Articles}
                </CarouselWindow>
            </CarouselContainer>
            <ControlsMob>
                {isFirstArticleVisible ? <UnactiveArrLeftMob/> : <ActiveArrLeftMob  style={{cursor:'pointer'}} onClick={handleLeftClickMob}  />}
                {isLastArticleVisible ? <UnactiveArrRightMob/> : <ActiveArrRightMob style={{cursor:'pointer'}} onClick={handleRightClickMob}/>}
            </ControlsMob>
            <Controls>
                {isFirstArticleVisible ? <UnactiveArrLeft/> : <ActiveArrLeft style={{cursor:'pointer'}} onClick={handleLeftClick}/>}
                {isLastArticleVisible ? <UnactiveArrRight/> : <ActiveArrRight style={{cursor:'pointer'}} onClick={handleRightClick}/>}
            </Controls>

        </Wrapper>
    }
;