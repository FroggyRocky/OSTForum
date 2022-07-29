import styled from "styled-components";
import {IoArrowRedo, IoChevronDown, IoEyeSharp, IoThumbsDown, IoThumbsUp} from 'react-icons/io5'
import avatarEx from '../../assets/avatarEx.png'
import {Flex} from "../commonStyles/Flex.styled";
import {CommentsType} from "../../redux/articles/articleTypes";

const Container = styled.div`
  width: 100%;
  background-color: white;
  border-top: 1px solid #58649C;
  border-radius: 0 0 20px 20px;
`
const Content = styled.div`
  width: 100%;
  padding: 40px;
`
const Actions = styled(Flex)`
  & > h1 {
    font-family: var(--family-text);
    font-weight: 700;
    font-size: 30px;
    line-height: 29px;
    color: #58649C;
    margin-bottom: 30px;
  }
`
const Action = styled(Flex)<{color:string}>`
  align-items: center;
  color: ${({color}) => color || '#58649C'};
  & span {
    margin-left: 2px;
  }
  &:nth-child(2) {
    margin: 0 15px;
  }

  &:nth-child(4) {
    margin-left: 15px;
  }
`
const Cards = styled.div`
`
const Card = styled.div`
  width: 100%;
  box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.15);
  border-radius: 15px;
  margin-bottom: 20px;
`
const CardContent = styled.div`
  padding: 20px;
  display: flex;
`
const Avatar = styled.img<{src:string}>`
src:${({src}) => src};
  width: 72px;
  height: 72px;
  border-radius: 100%;
  margin-right: 20px;
`
const Info = styled.div`
  font-family: var(--family-text);
  margin-top:4px;
    & header {
      display: flex;
      & h1 {
        font-weight: 700;
        font-size: 18px;
        line-height: 16px;
        color: #58649C;
      }
      & span {
        font-weight: 400;
        font-size: 12px;
        line-height: 16px;
        color: rgba(82, 82, 82, 0.5);
      }
    }
  & main {
    margin-top: 10px;
    & p {
      font-weight: 400;
      font-size: 16px;
      line-height: 16px;
      color: #000000;
    }
  }
`
const StyledTextArea = styled.div`
  font-family: var(--family-text);
  font-weight: 400;
  font-size: 16px;
  line-height: 16px;
  position: relative;
& main {
  display: flex;
}
  & textarea {
    width: 100%;
    background: #F5F5F5;
    border-radius: 15px;
    border: none;
    padding: 20px 0 0 20px;
    height: 136px;
    color: #000000;
    &:focus {
      outline-color: #58649C
    }
  }
  & button {
    text-align: center;
    line-height: 15px;
    color: #272727;
    width: 168px;
    height: 39px;
    background-color: white;
    border-radius: 4px;
    margin-top: 20px;
  }
`
type Props = {
commentsData:CommentsType[],
    views:number,
    likes:number,
    dislikes:number
};
export const ArticleComments = (props: Props) => {



    const comments = props.commentsData.map(el => {
        const date = new Date()
        const date2 = new Date(el.createdAt)
        let dateDifference: number | string = Math.floor((date.getTime() - date2.getTime()) / (1000 * 3600 * 24));
        if(dateDifference === 0) {
            dateDifference = 'Today'
        }
        else if(dateDifference >= 7) {
            dateDifference = Math.ceil((dateDifference % 365) / 7)
            if(dateDifference === 0) {
                dateDifference = '1 week'
            } else {
                dateDifference = dateDifference + ' weeks'
            }
        } else if (dateDifference >= 365) {
            dateDifference = Math.ceil(dateDifference / 365)
            if(dateDifference === 0) {
                dateDifference = '1 year'
            } else {
                dateDifference = dateDifference + ' years'
            }
        } else if (dateDifference < 7) {
            dateDifference = dateDifference + ' days'
        }
        return <Card key={el.id}>
            <CardContent>
                <Avatar src={el.user.avatar} />
<Info>
    <header>
        <h1>{el.user.name}</h1>
        <span>&nbsp;|&nbsp;{dateDifference + ' ago'}</span>
    </header>
    <main>
        <p>{el.text}</p>
    </main>
</Info>
            </CardContent>
        </Card>
    })


    return <Container>
        <Content>
            <Actions justifyContent='space-between' alignItems='center'>
                <h1>Comments ({props.commentsData.length}) <IoChevronDown/></h1>
                <Flex>
                    <Action color='#58649C'>
                        <IoArrowRedo size={19} color='#58649C'/>
                    </Action>
                    <Action color='#58649C'>
                        <IoEyeSharp size={19} color='#58649C'/>
                        <span>{props.views}</span>
                    </Action>
                    <Action color='#6FCB57'>
                        <IoThumbsUp size={19} />
                        <span>{props.likes}</span>
                    </Action>
                    <Action color='#F05050'>
                        <IoThumbsDown size={19}/>
                        <span>{props.dislikes}</span>
                    </Action>
                </Flex>
            </Actions>
            <Cards>
                {comments}
            </Cards>
            <StyledTextArea>
<main>
    <Avatar src={avatarEx} />
    <textarea placeholder='Leave a comment' name="comment"  cols={30} rows={10}></textarea>
</main>
<Flex justifyContent='end'>
                <button>Post</button>
</Flex>
            </StyledTextArea>
        </Content>
    </Container>
};