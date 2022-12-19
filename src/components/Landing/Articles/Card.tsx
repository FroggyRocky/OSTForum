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

import {Flex} from '../../common/commonStyles/Flex.styled'
import {IoTimeOutline} from 'react-icons/io5'
import {calcDate} from "../../../services/calcDate";
import {ICategory} from "../../../redux/auth/authConfigsTypes";
import instFb from '../../../assets/categoryFlags/instFb.png'
import crypto from '../../../assets/categoryFlags/crypto.png'
import ecommerce from '../../../assets/categoryFlags/eCommerce.png'
import cases from '../../../assets/categoryFlags/cases.png'
import affiliate from '../../../assets/categoryFlags/affiliate.png'
import tiktok from '../../../assets/categoryFlags/tikTok.png'
import {ReactElement} from "react";

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
    function setPathToFlagImg(flagName: string) {
        switch (flagName) {
            case 'crypto':
                return crypto
            case 'e-commerce':
                return ecommerce
            case 'tikTok':
                return tiktok
            case 'affiliate':
                return affiliate
            case 'cases':
                return cases
        }
    }

    function setFlags() {
        let flags:any | ReactElement[] = []
        if (props.categories && props.categories.length !== 0) {
            if(props.categories.find(el => el.name === 'instagram') || props.categories.find(el => el.name === 'facebook')) {
                flags = [...flags,  <CategoryFlag src={instFb}
                                                  alt='category_flag '/>]
            }
            flags = [...flags, ...props.categories.map(category => {
                if(category.name === 'facebook' || category.name === 'instagram') return null
               return <CategoryFlag src={setPathToFlagImg(category.name)}
                              alt='category_flag '/>
            })]
        }
        return flags
    }

    return <ArticleCardLink to={`/article/${props.id}`} state={props.historyPath}>
        <Container>
            <CardImageContainer>
                <CategoryContainer>
                    {setFlags()}
                </CategoryContainer>
                <CardImage src={props.coverImg_withText} alt='Article_head_image'/>
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
                    {/*<StatisticsPanel views={props.views > 100 ? '100+' : props.views}*/}
                    {/*                 comments={props.comments > 100 ? '100+' : props.comments}*/}
                    {/*                 likes={props.likes > 100 ? '100+' : props.likes}*/}
                    {/*                 dislikes={props.dislikes > 100 ? '100+' : props.dislikes}/>*/}
                </Flex>
            </Info>
        </Container>
    </ArticleCardLink>
};