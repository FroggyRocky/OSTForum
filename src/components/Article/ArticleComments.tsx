import styled, {css, keyframes} from "styled-components";
import {IoChevronDown, IoLogoFacebook} from 'react-icons/io5'
import {Flex} from "../common/commonStyles/Flex.styled";
import {IComments} from "../../redux/articles/articleTypes";
import {mediaSizes} from "../common/commonStyles/MediaSizes";
import {calcDate} from "../../services/calcDate";
import {ActionPanel} from "../common/ActionPanel";
import {useFormik} from "formik";
import {useCreateCommentMutation, useDeleteCommentMutation, useGetArticleCommentsQuery} from "../../api/commentsAPI";
import {ICreateCommentData} from "../../api/apiTypes";
import {useState} from "react";
import * as Yup from 'yup';
import {AiFillTwitterCircle, AiOutlineClose} from "react-icons/ai";
import {FaReddit} from "react-icons/fa";
import {BiLinkAlt} from "react-icons/bi";
import {useClickOutside} from "../../services/useClickOutside";


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
const Cards = styled.div<{ isCommentsFolded: boolean }>`
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
    flex-direction: column;
  }
`
const Err = styled.p`
  color: #F05050;
  font-family: var(--family-header);
  font-weight: 500;
  font-size: 16px;
  line-height: 25px;
  position: absolute;
  left: 12%;
  @media (max-width: ${mediaSizes.mobile}) {
    position: static;
    margin-top: 15px;
  }
`
const ShareDropDown = styled.div`
  background: #FFFFFF;
  box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.15);
  border-radius: 15px;
  padding: 15px;
  font-family: var(--family-text);
  font-style: normal;
  font-weight: 400;
  font-size: 24px;
  line-height: 13px;
  color: #525252;
  position: absolute;
  z-index: 20;
  margin-top: 10px;
  user-select: none;
  & > a {
    display: flex;
    align-items: center;
    padding: 15px 0;
    cursor: pointer;
    color: #525252;
&:visited {
  color: #525252;
}
    & > p {
      padding-left: 10px;
    }
  }
  @media (max-width: ${mediaSizes.mobile}) {
    display:none
  }
`
const ShareModal = styled.div`
  display: none;
  @media(max-width: ${mediaSizes.mobile}) {
    display: flex;
    position: fixed;
    width:100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7);
    z-index: 200;
    top: 0;
    left: 0;
    justify-content: center;
    align-items: center;
    overflow-y: hidden;
    
  }
`
const ShareModalContent = styled.div`
background-color: white;
  font-family: var(--family-text);
  font-weight: 400;
  font-size: 14px;
  line-height: 13px;
  color: #525252;
  height: 200px;
  width: 90%;
  padding:0 15px;
  box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.15);
  border-radius: 10px;
  & > a {
    padding: 15px 0;
    color: #525252;
    display: flex;
    align-items: center;
    cursor:pointer;
    & > p {
      margin-left: 10px;
    }
    &:visited {
      color: #525252;
    }
  }
  
`

type Props = {
    commentsData: IComments[],
    views: number,
    likes: number,
    dislikes: number,
    isAuth: boolean,
    userId: number,
    userAvatar: string,
    articleId: number,
    articleHeader: string,
};
export const ArticleComments = (props: Props) => {

    const [createComment, {isError: isCreateErr, isLoading: isCreateLoading}] = useCreateCommentMutation()
    const [deleteComment, {isError: isDeleteErr, isLoading: isDeleteLoading}] = useDeleteCommentMutation();
    const [isShareDropDownOpen, setShareDropDownState] = useState(false)
    const [isShareMobileModalOpen, setShareMobileModalState] = useState(false)
    const [isLinkCopied, setLinkCopyState] = useState(false)
    const [isCommentsFolded, setCommentsSectionState] = useState(false)
    const clickOutsideRef = useClickOutside(closeShareDropDown)
    const commentsValidation = Yup.object().shape({
        comment: Yup.string()
            .required('Required')
            .min(2)

    })
    function copyLink() {
        try {
            const url = window.location.href
            navigator.clipboard.writeText(url);
            setLinkCopyState(true)
        } catch (e) {
            console.log(e)
        }
    }
    function closeShareModal(e:any) {
        console.log(e.target.id === 'shareModal_bg')
        if(e.target.id === 'shareModal_bg') {
            setShareMobileModalState(false)
        }
    }
    function closeShareDropDown() {
        setShareDropDownState(false)
    }
    const {isError: isFetchErr, isLoading: isFetchLoading} = useGetArticleCommentsQuery(props.articleId)
    const formik = useFormik({
        initialValues: {
            comment: ''
        },
        validateOnChange: false,
        validateOnBlur: true,
        validationSchema: commentsValidation,
        onSubmit: (values, {resetForm}) => {
            const commentData: ICreateCommentData = {
                text: values.comment,
                articleId: props.articleId,
            }
            createComment(commentData).unwrap()
                .then(() => resetForm())
        }
    })


    function toggleCommentsSection() {
        setCommentsSectionState(prev => !prev)
    }
    // async function handleCommentDelete(commentId: number) {
    //     deleteComment(commentId).unwrap();
    // }
    // function handleBlur() {
    //     if (!formik.values.comment) {
    //         formik.setTouched({'comment': false})
    //     }
    // }
    // const comments = props.commentsData.map(el => {
    //     const dateDifference = calcDate(el.createdAt)
    //     return <Card key={el.id}>
    //         {props.userId === el.user.id &&
    //             <DeleteBtn onClick={() => handleCommentDelete(el.id)} color='#525252' size={15}/>}
    //         <CardContent>
    //             <Avatar src={el.user.avatar}/>
    //             <Info>
    //                 <header>
    //                     <h1>{el.user.name}</h1>
    //                     <span>&nbsp;|&nbsp;{dateDifference}</span>
    //                 </header>
    //                 <main>
    //                     <p>{el.text}</p>
    //                 </main>
    //             </Info>
    //         </CardContent>
    //     </Card>
    // })

    return <>
        {isShareMobileModalOpen &&
        <ShareModal id={'shareModal_bg'} onClick={closeShareModal}>
            <ShareModalContent>
                <a target="_blank" rel="noopener noreferrer"
                   href={`https://twitter.com/intent/tweet?text=${props.articleHeader}&url=${encodeURI(window.location.href)}`}>
                    <AiFillTwitterCircle color={'#58649C'} size={22}/>
                    <p>Twitter</p>
                </a>
                <a target="_blank" rel="noopener noreferrer"
                   href={`https://www.reddit.com/submit?url=${encodeURI(window.location.href)}&title=${props.articleHeader}`}>
                    <FaReddit color={'#58649C'} size={22}/>
                    <p>Reddit</p>
                </a>
                <a target="_blank" rel="noopener noreferrer"
                   href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURI(window.location.href)}&quote=${props.articleHeader}`}>
                    <IoLogoFacebook color={'#58649C'} size={22}/>
                    <p>Facebook</p>
                </a>
                <a onClick={copyLink}>
                    <BiLinkAlt color={'#58649C'} size={22}/>
                    <p>{isLinkCopied ? 'Copied!' : 'Copy link'}</p>
                </a>
            </ShareModalContent>
        </ShareModal>
    }
    <Container>

        <Content>
            <Actions>
                <h1 onClick={toggleCommentsSection}>
                    {/*Comments ({props.commentsData.length})*/}
                    {/*{props.commentsData.length !== 0 && <IoChevronDown*/}
                    {/*    style={{marginLeft: '3px', transform: `rotate(${isCommentsFolded ? '0deg' : '180deg'})`}}/>}*/}
                </h1>
                <div style={{position: 'relative'}} ref={clickOutsideRef}>
                    <ActionPanel setShareDropDownState={setShareDropDownState} likes={props.likes}
                                 dislikes={props.dislikes} views={props.views} setShareMobileModalState={setShareMobileModalState} />
                    {isShareDropDownOpen && <ShareDropDown>
                        <a target="_blank" rel="noopener noreferrer"
                           href={`https://twitter.com/intent/tweet?text=${props.articleHeader}&url=${encodeURI(window.location.href)}`}>
                            <AiFillTwitterCircle color={'#58649C'} size={40}/>
                            <p>Twitter</p>
                        </a>
                        <a target="_blank" rel="noopener noreferrer"
                           href={`https://www.reddit.com/submit?url=${encodeURI(window.location.href)}&title=${props.articleHeader}`}>
                            <FaReddit color={'#58649C'} size={40}/>
                            <p>Reddit</p>
                        </a>
                        <a target="_blank" rel="noopener noreferrer"
                           href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURI(window.location.href)}&quote=${props.articleHeader}`}>
                            <IoLogoFacebook color={'#58649C'} size={40}/>
                            <p>Facebook</p>
                        </a>
                        <a href={'#'} onClick={copyLink}>
                            <BiLinkAlt color={'#58649C'} size={40}/>
                            <p>{isLinkCopied ? 'Copied!' : 'Copy link'}</p>
                        </a>
                    </ShareDropDown>
                    }
                </div>
            </Actions>
            {/*{!isCommentsFolded &&*/}
            {/*    <Cards isCommentsFolded={isCommentsFolded}>*/}
            {/*        {comments}*/}
            {/*    </Cards>*/}
            {/*}*/}
            {/*{props.isAuth && <StyledTextArea>*/}
            {/*    <main>*/}
            {/*        <Avatar display={'none'} src={props.userAvatar || avatarEx}/>*/}
            {/*        <textarea onChange={formik.handleChange} value={formik.values.comment} placeholder='Leave a comment'*/}
            {/*                  name="comment" cols={30} onBlur={handleBlur}*/}
            {/*                  rows={10}></textarea>*/}
            {/*    </main>*/}
            {/*    <ButtonContainer justifyContent='end' alignItems={'center'}>*/}
            {/*        {(formik.errors.comment && formik.touched.comment) && <Err>{formik.errors.comment}</Err>}*/}
            {/*        {(isCreateErr || isFetchErr) && <Err>{'Something went wrong, try to publish the post later'}</Err>}*/}
            {/*    <button onClick={formik.submitForm} style={{cursor:'pointer'}}*/}
            {/*            disabled={isFetchLoading || isCreateLoading}>{isFetchLoading || isCreateLoading ? 'Loading...' : 'Post'}</button>*/}
            {/*</ButtonContainer>*/}
            {/*</StyledTextArea>*/}
            {/*}*/}
        </Content>
    </Container>
    </>
};