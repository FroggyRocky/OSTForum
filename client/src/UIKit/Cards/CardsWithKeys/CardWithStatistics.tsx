
import {ImgWithLoader} from "../../ImgWithLoader/ImgWithLoader";
import {IKey} from "../../../redux/auth/authConfigsTypes";
import './cardWithStatistics.scss'
import {ArticleActionPanel} from "../../ArticleActionPanel/ArticleActionPanel";
import {ShareDropDown, ShareModalContent, ShareModal} from "../../../components/Article/ArticleComments";
import {useState} from "react";
import {AiFillTwitterCircle} from "react-icons/ai";
import {FaReddit} from "react-icons/fa";
import {IoLogoFacebook} from "react-icons/io5";
import {BiLinkAlt} from "react-icons/bi";
import {calcDate} from "../../../services/calcDate";
import {StyledFlex} from "../../BasicStyledComponents/basicStyledComponents";
import { AiOutlineClockCircle } from "react-icons/ai";

type Props = {
    header: string,
    description: string,
    cover: string,
    keys: IKey[],
    createdAt:string,
    link:string
};

export function CardWithStatistics(props: Props) {
    const [isShareDropDownOpen, setShareDropDownState] = useState(false)
    const [isShareMobileModalOpen, setShareMobileModalState] = useState(false)
    const [isLinkCopied, setLinkCopyState] = useState(false)
    const keys = props.keys.map(el => {
        return <div className={'cardWithStatistics__meta__keys__key'} key={el.id}>{el.name}</div>
    })
    function closeShareModal(e:any) {
        if(e.target.id === 'shareModal_bg') {
            setShareMobileModalState(false)
        }
    }
    function closeShareDropDown() {
        setShareDropDownState(false)
    }
    async function copyLink(e:any) {
        e.preventDefault()
        try {
            const url = `${props.link}`
            await navigator.clipboard.writeText(url);
            setLinkCopyState(true)
        } catch (e) {
            console.log(e)
        }
    }
    return <>
        {isShareMobileModalOpen &&
            <ShareModal id={'shareModal_bg'} onClick={closeShareModal}>
                <ShareModalContent>
                    <a target="_blank" rel="noopener noreferrer"
                       href={`https://twitter.com/intent/tweet?text=${props.header}&url=${props.link}`}>
                        <AiFillTwitterCircle color={'#58649C'} size={22}/>
                        <p>Twitter</p>
                    </a>
                    <a target="_blank" rel="noopener noreferrer"
                       href={`https://www.reddit.com/submit?url=${props.link}`}>
                        <FaReddit color={'#58649C'} size={22}/>
                        <p>Reddit</p>
                    </a>
                    <a target="_blank" rel="noopener noreferrer"
                       href={`https://www.facebook.com/sharer/sharer.php?u=${props.link}`}>
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
    <a href={props.link} className={'cardWithStatistics'}>
        <div className={'cardWithStatistics__cover'}>
            <ImgWithLoader alt={`cover_${props.header}`} src={props.cover} width={'240px'}
                           height={'240px'}/>
        </div>
        <main className={'cardWithStatistics__content'}>
            <section className={'cardWithStatistics__description'}>
                    <p className={'cardWithStatistics__description__header'}>{props.header}</p>
                    <p className={'cardWithStatistics__description__description'}>{props.description}</p>
            </section>
            <section className={'cardWithStatistics__meta'}>
                <StyledFlex>
                    <p className={'cardWithStatistics__meta__publicationDate'}>
                        <AiOutlineClockCircle color={'#58649C'} style={{marginRight:'6px'}} />
                        {calcDate(props.createdAt)}</p>
                    <div className={'cardWithStatistics__meta__keys'}>
                        {keys}
                    </div>
                </StyledFlex>
                <div className={'cardWithStatistics__meta__statistics'}>
                    <ArticleActionPanel setShareDropDownState={setShareDropDownState} likes={10}
                                        dislikes={10} views={10} setShareMobileModalState={setShareMobileModalState} />
                    {isShareDropDownOpen && <ShareDropDown right={'0'}>
                        <a target="_blank" rel="noopener noreferrer"
                           href={`https://twitter.com/intent/tweet?text=${props.header}&url=${props.link}`}>
                            <AiFillTwitterCircle color={'#58649C'} size={40}/>
                            <p>Twitter</p>
                        </a>
                        <a target="_blank" rel="noopener noreferrer"
                           href={`https://www.reddit.com/submit?url=${props.link}&article=${encodeURIComponent(props.header)}&title=${props.header}`}>
                            <FaReddit color={'#58649C'} size={40}/>
                            <p>Reddit</p>
                        </a>
                        <a target="_blank" rel="noopener noreferrer"
                           href={`https://www.facebook.com/sharer/sharer.php?u=${props.link}&article=${encodeURIComponent(props.header)}&quote=${props.header}`}>
                            <IoLogoFacebook color={'#58649C'} size={40}/>
                            <p>Facebook</p>
                        </a>
                        <a href={'#'} onClick={copyLink}>
                            <BiLinkAlt color={'#58649C'} size={40}/>
                            <p>{isLinkCopied ? 'Copied!' : 'Copy link'}</p>
                        </a>
                    </ShareDropDown>}
                </div>
            </section>
        </main>
    </a>
    </>
};