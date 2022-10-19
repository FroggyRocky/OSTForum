import {
    Card,
    CarouselContainer,
    CarouselWindow,
    Controls,
    StyledActiveArrLeft,
    StyledActiveArrRight,
    StyledLink,
    Wrapper,
    ArrContainer
} from './Carousel.styles'
import {useEffect, useRef, useState} from "react";
import {useAppSelector} from "../../../redux/hooks/hooks";
import {isMobile} from 'react-device-detect'

type Props = {};
export const Carousel = (props: Props) => {
        const [isFirstArticleVisible, setFirstArticleVisibility] = useState<boolean>()
        const [isLastArticleVisible, setLastArticleVisibility] = useState<boolean>()
        const lastArticleRef = useRef() as React.MutableRefObject<HTMLAnchorElement>;
        const firstArticleRef = useRef() as React.MutableRefObject<HTMLAnchorElement>;
        const observerFramesRef = useRef() as React.MutableRefObject<HTMLDivElement>
        const [translation, setTranslation] = useState(0)
    const [touchPosition, setTouchPosition] = useState<null | number>(null)
        const articlesData = useAppSelector(state => state.articles.articles)
        const PAGEWIDTH = 100

        useEffect(() => {
            if (articlesData.length === 0) return
            const observerOptions = {
                root: observerFramesRef.current,
                threshold: 1.0
            }
            const firstArticleObserver = new IntersectionObserver((entries) => {
                setFirstArticleVisibility(entries[0].isIntersecting)
            }, observerOptions)
            const lastArticleObserver = new IntersectionObserver((entries) => {
                setLastArticleVisibility(entries[0].isIntersecting)
            }, observerOptions)
            if (firstArticleRef.current) {
                firstArticleObserver.observe(firstArticleRef.current);
            }
            if (lastArticleRef.current) {
                lastArticleObserver.observe(lastArticleRef.current)
            }
            return () => {
                if (firstArticleRef.current) {
                    firstArticleObserver.unobserve(firstArticleRef.current);
                }
                if (lastArticleRef.current) {
                    lastArticleObserver.unobserve(lastArticleRef.current)
                }
            }
        }, [firstArticleRef.current, lastArticleRef.current, translation, observerFramesRef.current])

        function handleLeftClick(e: any) {
            if (e.detail === 1) {
                setTranslation(prev => prev + PAGEWIDTH)
            }
        }

        function handleRightClick(e: any) {
            console.log(e.detail);
            if (e.detail === 1) {
                setTranslation(prev => prev - PAGEWIDTH)
            }
        }

        function handleLeftClickMob() {
            setTranslation(prev => {
                const newTranslation = Math.min(prev + PAGEWIDTH, 0)
                return newTranslation
            })
        }

        function handleRightClickMob() {
            setTranslation(prev => {
                const maxTranslation = -(PAGEWIDTH * (articlesData.length - 1))
                const newTranslation = Math.max(prev - PAGEWIDTH, maxTranslation)
                return newTranslation
            })

        }
        function handleTouchStart(e:any) {
            document.body.style.overflowY = "hidden";
            const touchDown = e.touches[0].clientX
            setTouchPosition(touchDown)
        }
function handleTouchMove(e:any) {
    const touchDown = touchPosition

    if(touchDown === null) {
        return
    }

    const currentTouch = e.touches[0].clientX
    const diff = touchDown - currentTouch

    if (diff > 5) {
        handleRightClickMob()
    }

    if (diff < -5) {
        handleLeftClickMob()
    }

    setTouchPosition(null)
}
function handleTouchEnd() {
    document.body.style.overflowY = "auto";
}
        const Articles = articlesData.map((el, index) => {
            const pathData = [{
                pathName: 'Home',
                path: '/'
            },
            ]
            if (index === +articlesData.length - 1) {
                return <StyledLink translation={translation} ref={lastArticleRef} key={el.id} to={`/article/${encodeURI(el.header)}`}
                                   state={pathData}>
                    <Card isThereOnlyOneItem={articlesData.length <= 1} id={`${el.id}`} imgSrc={el.mainImg}>
                        <p>{el.header}</p>
                    </Card>
                </StyledLink>
            } else if (index === 0) {
                return <StyledLink translation={translation} ref={firstArticleRef} key={el.id} to={`/article/${encodeURI(el.header)}`}
                                   state={pathData}>
                    <Card isThereOnlyOneItem={articlesData.length <= 1} id={`${el.id}`} imgSrc={el.mainImg}>
                        <p>{el.header}</p>
                    </Card>
                </StyledLink>
            } else {
                return <StyledLink translation={translation} key={el.id} to={`/article/${encodeURI(el.header)}`} state={pathData}>
                    <Card isThereOnlyOneItem={articlesData.length <= 1} id={`${el.id}`} imgSrc={el.mainImg}>
                        <p>{el.header}</p>
                    </Card>
                </StyledLink>
            }
        })

        return <Wrapper>
            <CarouselContainer onTouchEnd={handleTouchEnd} onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} >
                <CarouselWindow isThereOnlyOneItem={articlesData.length <= 1} ref={observerFramesRef}>
                    {Articles}
                </CarouselWindow>
            </CarouselContainer>
            {(articlesData.length > 1 && !isMobile) && <Controls>
             <ArrContainer onClick={!isFirstArticleVisible ? handleLeftClick : undefined} unactive={isFirstArticleVisible === true}>
                    <StyledActiveArrLeft />
             </ArrContainer>
                <ArrContainer onClick={!isLastArticleVisible ? handleRightClick : undefined} unactive={isLastArticleVisible === true}>
                    <StyledActiveArrRight />
                </ArrContainer>
            </Controls>
            }

        </Wrapper>
    }
;