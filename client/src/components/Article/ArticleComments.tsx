import styled, {css, keyframes} from "styled-components";
import {IoChevronDown, IoLogoFacebook} from 'react-icons/io5'
import {Flex} from "../../UIKit/StyledComponents/styledComponents";
import {IComments} from "../../redux/articles/articleTypes";
import {mediaSizes} from "../../mediaSizes.styled";
import {ActionPanel} from "../common/ActionPanel";
import {useState} from "react";
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
    font-family: var(--gotham);
    font-weight: 700;
    font-size: 30px;
    line-height: 29px;
    color: #58649C;
    margin-bottom: 30px;
    display: flex;
    align-items: center;
  }

  @media (max-width: ${mediaSizes.mobile}) {
    justify-content: right;
    & > h1 {
      font-weight: 700;
      font-size: 12px;
      line-height: 18px;
      color: #58649C;
      margin-top: 20px;
    }
  }
}
`


export const ShareDropDown = styled.div<{top?:string,left?:string, right?:string}>`
  background: #FFFFFF;
  box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.15);
  border-radius: 15px;
  padding: 15px;
  font-family: var(--gotham);
  font-style: normal;
  font-weight: 400;
  font-size: 24px;
  line-height: 13px;
  color: #525252;
  position: absolute;
  width: 200px;
  z-index: 20;
  margin-top: 10px;
  user-select: none;
  top:${props => props.top ?? ''};
    left:${props => props.left ?? ''};
    right:${props => props.right ?? ''};
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
export const ShareModal = styled.div`
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
export const ShareModalContent = styled.div`
background-color: white;
  font-family: var(--gotham);
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


    const [isShareDropDownOpen, setShareDropDownState] = useState(false)
    const [isShareMobileModalOpen, setShareMobileModalState] = useState(false)
    const [isLinkCopied, setLinkCopyState] = useState(false)

    const clickOutsideRef = useClickOutside(closeShareDropDown)

    async function copyLink(e:any) {
        e.preventDefault()
        try {
            const url = `${window.location.href}?article=${encodeURIComponent(props.articleHeader)}`
           await navigator.clipboard.writeText(url);
            setLinkCopyState(true)
        } catch (e) {
            console.log(e)
        }
    }
    function closeShareModal(e:any) {
        if(e.target.id === 'shareModal_bg') {
            setShareMobileModalState(false)
        }
    }
    function closeShareDropDown() {
        setShareDropDownState(false)
    }



    return <>
        {isShareMobileModalOpen &&
        <ShareModal id={'shareModal_bg'} onClick={closeShareModal}>
            <ShareModalContent>
                <a target="_blank" rel="noopener noreferrer"
                   href={`https://twitter.com/intent/tweet?text=${props.articleHeader}&url=${window.location.href}&article=${encodeURIComponent(props.articleHeader)}`}>
                    <AiFillTwitterCircle color={'#58649C'} size={22}/>
                    <p>Twitter</p>
                </a>
                <a target="_blank" rel="noopener noreferrer"
                   href={`https://www.reddit.com/submit?url=${window.location.href}&article=${encodeURIComponent(props.articleHeader)}&title=${props.articleHeader}`}>
                    <FaReddit color={'#58649C'} size={22}/>
                    <p>Reddit</p>
                </a>
                <a target="_blank" rel="noopener noreferrer"
                   href={`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}&article=${encodeURIComponent(props.articleHeader)}&quote=${props.articleHeader}`}>
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
                <h1>
                </h1>
                <div style={{position: 'relative'}} ref={clickOutsideRef}>
                    <ActionPanel setShareDropDownState={setShareDropDownState} likes={props.likes}
                                 dislikes={props.dislikes} views={props.views} setShareMobileModalState={setShareMobileModalState} />
                    {isShareDropDownOpen && <ShareDropDown>
                        <a target="_blank" rel="noopener noreferrer"
                           href={`https://twitter.com/intent/tweet?text=${props.articleHeader}&url=${window.location.href}&article=${encodeURIComponent(props.articleHeader)}`}>
                            <AiFillTwitterCircle color={'#58649C'} size={40}/>
                            <p>Twitter</p>
                        </a>
                        <a target="_blank" rel="noopener noreferrer"
                           href={`https://www.reddit.com/submit?url=${window.location.href}&article=${encodeURIComponent(props.articleHeader)}&title=${props.articleHeader}`}>
                            <FaReddit color={'#58649C'} size={40}/>
                            <p>Reddit</p>
                        </a>
                        <a target="_blank" rel="noopener noreferrer"
                           href={`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}&article=${encodeURIComponent(props.articleHeader)}&quote=${props.articleHeader}`}>
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
        </Content>
    </Container>
    </>
};