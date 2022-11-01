import {H1} from '../../common/commonStyles/H1.styled'
import styled from 'styled-components'
import {IoDocumentText} from "react-icons/io5";
import {Flex} from "../../common/commonStyles/Flex.styled";
import {IArticlesPreview} from "../../../redux/articles/articleTypes";
import {AccountArticleCard} from "../../common/Cards/AccountArticleCard";
import {Link} from "react-router-dom";
import {Content} from "../../common/commonStyles/Content.styled";

const Button = styled.button`
  width: 100%;
  height: 244px;
  border: none;
  border-radius: 15px;
  box-shadow: 0px 4px 14px rgba(0, 0, 0, 0.15);
  background: rgba(255, 255, 255, 0.3);
  text-align: center;
  align-items: center;
  margin: 40px 0 70px 0;
  cursor: pointer;

  & > p {
    font-family: var(--family-text);
    font-weight: 400;
    font-size: 25px;
    line-height: 24px;
    text-transform: uppercase;
    color: #525252;
    opacity: 0.5;
    margin-top: 30px;
  }
`

type Props = {
    articlesData: IArticlesPreview[]
};
export const AccountArticles = (props: Props) => {
    const articles = props.articlesData.map(el => {
        return <AccountArticleCard key={el.id} views={el.usersViewed.length} dislikes={el.usersDisliked.length}
                                   likes={el.usersLiked.length} header={el.header} description={el.description}
                                   comments={el.comments.length}
                                   createdAt={el.createdAt} coverImg_withText={el.coverImg_withText} category={el.category.name}/>
    })

    return <Content style={{padding: '30px 0 60px 0'}}>
        <H1 style={{textAlign: 'center'}}>My Articles</H1>
        <Link to='/dashboard/articles/create'>
            <Button>
                <IoDocumentText size={87} color='#525252' opacity={0.5}/>
                <p>Add new artlicles</p>
            </Button>
        </Link>
        <Flex gap='30px'>
            {articles}
        </Flex>
    </Content>
};