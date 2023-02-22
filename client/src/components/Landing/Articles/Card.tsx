import {
    ArticleCardLink,
    CardImage,
    CardImageContainer,
    CategoryContainer,
    CategoryFlag,
    Container,
    Date,
    Info,
    Text
} from './articles.styles'
import {filterCategoriesForFlags, setPathToFlagImg} from "../../../services/categoryFlags";
import {Flex} from '../../common/commonStyles/Flex.styled'
import {IoTimeOutline} from 'react-icons/io5'
import {calcDate} from "../../../services/calcDate";
import {ICategory} from "../../../redux/auth/authConfigsTypes";
import {ImgWithLoader} from "../../common/ImgWithLoader";
import defaultImg from '../../../assets/defaultCardCover.png'
type Props = {
    id: number,
    coverImg_withText: string,
    header: string,
    description: string,
    previewDescription: string,
    views: number,
    likes: number,
    dislikes: number,
    comments: number,
    createdAt: string,
    historyPath?: Array<{ pathName: string, path: string }>
    categories: Array<ICategory> | undefined
};

export const Card = (props: Props) => {

    function setFlags() {
        if(!props.categories || props.categories.length === 0) return;
        const filteredCategories = filterCategoriesForFlags(props.categories)
        return filteredCategories?.map(category => {
            return <CategoryFlag key={category} src={setPathToFlagImg(category)}
                                 alt='category_flag '/>
        })
    }

    return <ArticleCardLink to={`/article/${props.id}`} state={props.historyPath}>
        <Container>
            <CardImageContainer>
                <CategoryContainer>
                    {setFlags()}
                </CategoryContainer>
                <CardImage>
                    <ImgWithLoader src={props.coverImg_withText} defaultSrc={defaultImg} width={'100%'} height={'100%'} alt={'article_head_image'}  />
                </CardImage>
            </CardImageContainer>
            <Info>
                <Text>
                    <h1>{props.header}</h1>
                </Text>
                <Text>
                    <p>{props.previewDescription}</p>
                </Text>
                <Flex justifyContent='space-between'>
                    <Date>
                        <IoTimeOutline style={{marginRight: '4px'}} color='#58649C'/>{`${calcDate(props.createdAt)}`}
                    </Date>
                </Flex>
            </Info>
        </Container>
    </ArticleCardLink>
};