import styled, {css, keyframes} from "styled-components";
import {IoChevronDown} from 'react-icons/io5'
import avatarEx from '../../assets/avatarEx.png'
import {Flex} from "../commonStyles/Flex.styled";
import {IComments} from "../../redux/articles/articleTypes";
import {mediaSizes} from "../commonStyles/MediaSizes";
import {calcDate} from "../../services/calcDate";
import {ActionPanel} from "../common/ActionPanel";
import {AiOutlineClose} from "react-icons/ai";
import {useFormik} from "formik";
import {useCreateCommentMutation, useDeleteCommentMutation, useGetArticleCommentsQuery} from "../../api/commentsAPI";
import {ICreateCommentData} from "../../api/apiTypes";
import {useState} from "react";
import * as Yup from 'yup';

const Container = styled.div`
  width: 100%;
  background-color: white;
  border-top: 1px solid #58649C;
  border-radius: 0 0 20px 20px;
`
const Content = styled.div`
  width: 100%;
  padding: 40px;
  @media (max-width: ${mediaSizes.mobile}) {
    padding: 30px;
  }
`
const Actions = styled(Flex)`
  justify-content: space-between;
  align-items: center;

  & > h1 {
    font-family: var(--family-text);
    font-weight: 700;
    font-size: 30px;
    line-height: 29px;
    color: #58649C;
    margin-bottom: 30px;
    display: flex;
    align-items: center;
  }

  @media (max-width: ${mediaSizes.mobile}) {
    justify-content: initial;
    & > h1 {
      font-weight: 700;
      font-size: 12px;
      line-height: 18px;
      color: #58649C;
      margin-top: 20px;
    }
  }
}

@media (max-width: ${mediaSizes.mobile}) {
  flex-direction: column-reverse;
}
`
const unfoldAnim = keyframes`
  0% {
    transform: translateY(-200px);
  }
  100% {
    transform: translateY(0px);
    opacity: 1;
    position: static;
    z-index: 1;
  }
`
const foldAnim = keyframes`
  100% {
    transform: translateY(-200px);
    opacity: 0;
    z-index: -1;
    position: absolute;
  }
`
const Cards = styled.div<{isCommentsFolded:boolean}>`
  ${({isCommentsFolded}) => isCommentsFolded && css`
  animation: ${unfoldAnim} 500ms ease-in forwards;
  `}
  ${({isCommentsFolded}) => !isCommentsFolded && css`
  animation: ${foldAnim} 500ms ease-in-out forwards;
  `}
`
const Card = styled.div`
  width: 100%;
  box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.15);
  border-radius: 15px;
  margin-bottom: 20px;
  position: relative;
`
const CardContent = styled.div`
  padding: 20px;
  display: flex;
`
const Avatar = styled.img<{ src: string, display?: string }>`
  src: ${({src}) => src};
  width: 72px;
  height: 72px;
  border-radius: 100%;
  margin-right: 20px;
  @media (max-width: ${mediaSizes.mobile}) {
    ${({display}) => display && css`
      display: ${display};
    `}
    width: 39px;
    height: 39px;
  }
`
const Info = styled.div`
  font-family: var(--family-text);
  margin-top: 4px;

  & header {
    display: flex;

    & h1 {
      font-weight: 700;
      font-size: 18px;
      line-height: 16px;
      color: #58649C;
      @media (max-width: ${mediaSizes.mobile}) {
        font-size: 12px;
        line-height: 12px;
      }
    }

    & span {
      font-weight: 400;
      font-size: 12px;
      line-height: 16px;
      color: rgba(82, 82, 82, 0.5);
      @media (max-width: ${mediaSizes.mobile}) {
        font-size: 9px;
        line-height: 9px;
      }
    }
  }

  & main {
    margin-top: 10px;

    & p {
      font-weight: 400;
      font-size: 16px;
      line-height: 16px;
      color: #000000;
      @media (max-width: ${mediaSizes.mobile}) {
        font-size: 12px;
        line-height: 18px;
      }
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
`
const DeleteBtn = styled(AiOutlineClose)`
  position: absolute;
  right: 5%;
  top: 10%;
`
const ButtonContainer = styled(Flex)`
  position: relative;
  & button {
    text-align: center;
    line-height: 15px;
    color: #272727;
    width: 168px;
    height: 39px;
    background-color: white;
    border-radius: 4px;
    margin-top: 20px;

    &:disabled {
      background-color: grey;
    }
  }

  @media (max-width: ${mediaSizes.mobile}) {
    justify-content: center;
  }
`
const Err = styled.span`
  color: #F05050;
  font-family: var(--family-header);
  font-weight: 500;
  font-size: 16px;
  line-height: 25px;
  position: absolute;
  left: 12%;
`
type Props = {
    commentsData: IComments[],
    views: number,
    likes: number,
    dislikes: number,
    isAuth: boolean,
    userId: number,
    userAvatar: string,
    articleId: number
};
export const ArticleComments = (props: Props) => {

    const [createComment, {isError: isCreateErr, isLoading: isCreateLoading}] = useCreateCommentMutation()
    const [deleteComment, {isError: isDeleteErr, isLoading: isDeleteLoading}] = useDeleteCommentMutation();
    const [isCommentsFolded, setCommentsSectionState] = useState(false)


    const commentsValidation = Yup.object().shape({
        comment:Yup.string()
            .required('Required')
            .min(2)

    })

    const {isError: isFetchErr, isLoading: isFetchLoading} = useGetArticleCommentsQuery(props.articleId)
    const formik = useFormik({
        initialValues: {
            comment: ''
        },
        validateOnChange:false,
        validateOnBlur:true,
        validationSchema:commentsValidation,
        onSubmit: (values, {resetForm}) => {
            const commentData: ICreateCommentData = {
                text: values.comment,
                articleId: props.articleId,
                userId: props.userId
            }
            createComment(commentData).unwrap()
                .then(() => resetForm())
        }
    })

    async function handleCommentDelete(commentId: number) {
        deleteComment(commentId).unwrap();
    }

    function toggleCommentsSection() {
        setCommentsSectionState(prev => !prev)
    }
function handleBlur() {
    if (!formik.values.comment) {
        formik.setTouched({'comment':false})
    }
}
    const comments = props.commentsData.map(el => {
        const dateDifference = calcDate(el.createdAt)
        return <Card key={el.id}>
            {props.userId === el.user.id &&
                <DeleteBtn onClick={() => handleCommentDelete(el.id)} color='#525252' size={15}/>}
            <CardContent>
                <Avatar src={el.user.avatar}/>
                <Info>
                    <header>
                        <h1>{el.user.name}</h1>
                        <span>&nbsp;|&nbsp;{dateDifference}</span>
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
            <Actions>
                <h1 onClick={toggleCommentsSection}>Comments ({props.commentsData.length})
                    {props.commentsData.length !==0 && <IoChevronDown style={{marginLeft: '3px', transform: `rotate(${isCommentsFolded ? '0deg' : '180deg'})`}}/> }
                </h1>
                <ActionPanel likes={props.likes} dislikes={props.dislikes} views={props.views}/>
            </Actions>
            {/*{!isCommentsFolded &&*/}
                <Cards isCommentsFolded={isCommentsFolded}>
                    {comments}
                </Cards>
            {/*}*/}
            {props.isAuth && <StyledTextArea>
                <main>
                    <Avatar display={'none'} src={props.userAvatar || avatarEx}/>
                    <textarea onChange={formik.handleChange} value={formik.values.comment} placeholder='Leave a comment'
                              name="comment" cols={30} onBlur={handleBlur}
                              rows={10}></textarea>
                </main>
                <ButtonContainer justifyContent='end' alignItems={'center'}>
                    {(formik.errors.comment && formik.touched.comment) && <Err>{formik.errors.comment}</Err>}
                    {(isCreateErr || isFetchErr) && <Err>{'Something went wrong, try to publish the post later'}</Err>}
                <button onClick={formik.submitForm} style={{cursor:'pointer'}}
                        disabled={isFetchLoading || isCreateLoading}>{isFetchLoading || isCreateLoading ? 'Loading...' : 'Post'}</button>
            </ButtonContainer>
            </StyledTextArea>
            }
        </Content>
    </Container>
};