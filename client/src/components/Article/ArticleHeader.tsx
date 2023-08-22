import styled, {css} from "styled-components";
import {useEffect, useState} from 'react'
import {mediaSizes} from "../../UIKit/mediaSizes.styled";
import {AiOutlineEdit} from "react-icons/ai";
import {filterCategoriesForFlags, findCategoryObjById, setPathToFlagImg} from "../../services/categoryFlags";
import defaultArticleCover from '../../assets/defaultArticleCover.png'
import {IArticle} from "../../redux/articles/articleTypes";
import {ICategory} from "../../redux/auth/authConfigsTypes";
import loader from '../../assets/loader.gif'
const HeaderContainer = styled.div`
  width: 100%;
  font-family: var(--gotham);
  font-size: 25px;
  line-height: 35px;
  color: #272727;
  margin-top: 30px;
  position: relative;
`
const HeaderBg = styled.div<{ image: string, backgroundImageState:boolean | undefined}>`
  width: 100%;
  height: 439px;
  ${({backgroundImageState, image}) => !backgroundImageState && image && css `
     background-image: url(${loader});
    background-size: auto;
    background-position: center;
    background-repeat: no-repeat;
   `}
  background-image: url(${({image}) => image ? image : defaultArticleCover});
  background-size: cover;
  background-repeat: no-repeat;
  position: relative;
  border-radius: 20px 20px 0 0;
  @media (max-width: 1400px) {
    height: 100%;
  }
  @media (max-width: ${mediaSizes.mobile}) {
    height: 142px;
    width: 100%;
    background-size: cover;
    background-position: top left;
  }
`
const ImageBackDrop = styled.div`
  width: 100%;
  height: 100%;
  backdrop-filter: blur(4px);
  background-color: rgba(88, 100, 156, 0.5);
  position: relative;
  border-radius: 20px 20px 0 0;

`
const Header = styled.div`
  color: white;
  font-family: var(--roadRadio);
  font-weight: 700;
  font-size: 92px;
  line-height: 90px;
  text-shadow: 0px 4px 5px rgba(0, 0, 0, 0.25);
  padding: 20px;
  word-break: break-word;
  @media (max-width: ${mediaSizes.laptop}) {
    font-size: 82px;
  }
  @media (max-width: ${mediaSizes.mobile}) {
    font-weight: 700;
    font-size: 25px;
    line-height: 26px;
    padding: 10px;
  }

`
const Description = styled.p`
  font-family: var(--gotham);
  background-color: white;
  padding: 20px;
  border-radius: 0 0 15px 15px;
  @media (max-width: ${mediaSizes.mobile}) {
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 16px;
    color: #272727;
  }
`
const Edit = styled(AiOutlineEdit)`
  position: absolute;
  z-index: 100;
  right: 2%;
  top: 0%;
  color: darkred;
  cursor: pointer;

  &:hover {
    color: #F05050;
  }
`
const Flags = styled.div`
  position: absolute;
  right: 8%;
  top: 0;
  z-index: 10;
`
const Flag = styled.img`
  width: 35px;
  height: 45px;
  margin: 0 10px;
`
type Props = {
    currentArticle: IArticle,
    categories: ICategory[],
    userId: number | undefined,
    edit: () => void
};

export const ArticleHeader = (props: Props) => {
    const [backgroundImageState, setBackgroundImgState] = useState<boolean>(false)
    useEffect(() => {
        const img = new window.Image()
        const src = props.currentArticle.coverImg_withOutText || props.currentArticle.coverImg_withText
        img.src = src;
        img.onload = () => {
            setBackgroundImgState(true)
        };
        img.onerror = () => {
            setBackgroundImgState(false)
        };


    }, [props.currentArticle.coverImg_withOutText, props.currentArticle.coverImg_withText])

    function setFlags() {
        if (!props.currentArticle || !props.currentArticle?.categoryIds || props.currentArticle.categoryIds.length === 0) return
        const categoriesObj = findCategoryObjById(props.currentArticle.categoryIds, props.categories)
        const filteredCategories = filterCategoriesForFlags(categoriesObj)
        return filteredCategories.map(category => {
            return <Flag src={setPathToFlagImg(category)}
                         alt='category_flag '/>
        })

    }

    return <HeaderContainer>
        <Flags>
            {setFlags()}
        </Flags>
        <HeaderBg
            image={props.currentArticle.coverImg_withOutText || props.currentArticle.coverImg_withText} backgroundImageState={backgroundImageState}>
            {props.userId && +props.userId === +props.currentArticle.user?.id &&
                <Edit onClick={props.edit} size={45}/>
            }
            <ImageBackDrop>
                <Header>
                    <span>{props.currentArticle.header}</span>
                </Header>
            </ImageBackDrop>
        </HeaderBg>
        <Description>
            {props.currentArticle.description}
        </Description>
    </HeaderContainer>
};