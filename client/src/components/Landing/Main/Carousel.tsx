import {
    ArrContainer,
    Card,
    CarouselContainer,
    CarouselWindow,
    Controls,
    StyledActiveArrLeft,
    StyledActiveArrRight,
    Wrapper
} from './Carousel.styles'
import {useEffect, useState} from "react";
import {useAppSelector} from "../../../redux/hooks/hooks";
import {isMobile} from 'react-device-detect'
import {ImgWithLoader} from "../../common/ImgWithLoader";
import defaultImg from '../../../assets/defaultCardCover.png'


const CAROUSEL_MAX_ARTICLES = 6

type Props = {};
export const Carousel = (props: Props) => {
        const [translation, setTranslation] = useState(0);
        const [touchPosition, setTouchPosition] = useState<null | number>(null);
        const articlesData = useAppSelector(state => state.articles.articles).slice(0, CAROUSEL_MAX_ARTICLES);
        const PAGEWIDTH = isMobile ? 100 : 88;
        const maxTranslation = -(PAGEWIDTH * (articlesData.length - 1));

        useEffect(() => {
            if(!isMobile) {
                const intervalId = setInterval(() => {
                    handleRightAutoScroll();
                }, 4000)
                return () => clearInterval(intervalId)
            }
        }, [translation])


        function handleRightAutoScroll() {
            setTranslation(prev => {
                if(translation === maxTranslation) {
                    setTranslation(PAGEWIDTH)
                }
                const newTranslation = Math.max(prev - PAGEWIDTH, maxTranslation)
                return newTranslation
            })
        }

        function handleLeftClick(e: any) {
            if (e.detail === 1) {
                setTranslation(prev => {
                    const newTranslation = Math.min(prev + PAGEWIDTH, PAGEWIDTH)
                    return newTranslation
                })

            }
        }

        function handleRightClick(e: any) {
            if (e.detail === 1) {
                setTranslation(prev => {
                    const maxTranslation = -(PAGEWIDTH * (articlesData.length - 1))
                    const newTranslation = Math.max(prev - PAGEWIDTH, maxTranslation)
                    return newTranslation
                })
            }
        }

        function handleLeftClickMob() {
            if (isMobile) {
                setTranslation(prev => {
                    const newTranslation = Math.min(prev + PAGEWIDTH, 0)
                    return newTranslation
                })
            }
        }

        function handleRightClickMob() {
            setTranslation(prev => {
                const maxTranslation = -(PAGEWIDTH * (articlesData.length - 1))
                const newTranslation = Math.max(prev - PAGEWIDTH, maxTranslation)
                return newTranslation
            })

        }

        function handleTouchStart(e: any) {
            document.body.style.overflowY = "hidden";
            const touchDown = e.touches[0].clientX
            setTouchPosition(touchDown)
        }

        function handleTouchMove(e: any) {
            document.body.style.overflowY = "hidden";
            const touchDown = touchPosition

            if (touchDown === null) {
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
            if (isMobile) {
                document.body.style.overflowY = "auto";
            }
        }
        const Articles = articlesData.map((el, index) => {
            const pathData = [{
                pathName: 'Home',
                path: '/'
            },
            ]
            return <Card translation={translation} maxTranslation={maxTranslation} key={el.id} to={`/article/${el.id}`} state={pathData}>
                <ImgWithLoader src={el.coverImg_withText || el.coverImg_withOutText} defaultSrc={defaultImg} alt={'article_cover'}
                               width={'100%'} height={'100%'} />
            </Card>
        })

        return <Wrapper>
            <CarouselContainer onTouchEnd={handleTouchEnd} onTouchStart={handleTouchStart} onTouchMove={handleTouchMove}>
                <CarouselWindow isThereOnlyOneItem={articlesData.length <= 1}>
                    {Articles}
                </CarouselWindow>
            </CarouselContainer>
            {(articlesData.length > 1 && !isMobile) && <Controls>
                <ArrContainer onClick={handleLeftClick}
                              unactive={translation === PAGEWIDTH}>
                    <StyledActiveArrLeft/>
                </ArrContainer>
                <ArrContainer onClick={handleRightClick}
                              unactive={maxTranslation === translation}>
                    <StyledActiveArrRight/>
                </ArrContainer>
            </Controls>
            }

        </Wrapper>
    }
;