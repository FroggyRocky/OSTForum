import {StyledH1, StyledContent, StyledFlex} from '../../../UIKit/BasicStyledComponents/basicStyledComponents'
import './accountArticles.scss'
import {IoDocumentText} from "react-icons/io5";
import {IArticlesPreview} from "../../../redux/articles/articleTypes";
import {AccountArticleCard} from "../../../UIKit/Cards/AccountArticleCard";
import {Link} from "react-router-dom";


type Props = {
    articlesData: IArticlesPreview[]
};
export const AccountArticles = (props: Props) => {
    const articles = props.articlesData.map(el => {
        return <AccountArticleCard key={el.id} views={el.usersViewed.length} dislikes={el.usersDisliked.length}
                                   likes={el.usersLiked.length} header={el.header} description={el.description}
                                   comments={el.comments.length}
                                   createdAt={el.createdAt} coverImg_withText={el.coverImg_withText} categoryIds={el.categoryIds}/>
    })

    return <div className={'accountArticles'}>
    <StyledContent style={{padding: '30px 0 60px 0'}}>
        <StyledH1 style={{textAlign: 'center'}}>My Articles</StyledH1>
        <Link to='/dashboard/articles/create'>
            <div className={'accountArticles__button'}>
                <IoDocumentText size={87} color='#525252' opacity={0.5}/>
                <p>Add new artlicles</p>
            </div>
        </Link>
        <StyledFlex gap='30px'>
            {articles}
        </StyledFlex>
    </StyledContent>
    </div>
};