import './articleLinkCard.scss'
import {BsArrowUpShort} from "react-icons/bs";
import {BsArrowDownShort} from "react-icons/bs";
import {MdModeEditOutline} from "react-icons/md";
import {BsCheckLg} from "react-icons/bs";
import {useState} from "react";
import {updateTapLinkArticle} from "../../../../redux/taplink/typeLinkThunks";
import {useAppDispatch} from "../../../../redux/storeHooks/storeHooks";

type Props = {
    title: string
    id: number
    admin: boolean
    position: number
    index: number
    articleId:number
    moveLinkUpTheOrder: (index: number) => void
    moveLinkDownTheOrder: (index: number) => void
    MAX_NUMBER_OF_LINKS: number
};

export function ArticleLinkCard(props: Props) {
    const [isEditModeOn, setEditModeState] = useState(false)
    const [link, setLink] = useState<string>(`https://myclick.media/article/${props.articleId}`)
    const dispatch = useAppDispatch()

    function handleChange(e: any) {
        const value = e.target.value
        setLink(value)
    }

    function handleSubmit() {
        const newArticleId = link.replace(/[^0-9]/g, "")
        if (!+newArticleId || +props.articleId === +newArticleId) {
            setEditModeState(false)
            return;
        } else {
            dispatch(updateTapLinkArticle(props.id, +newArticleId))
            setEditModeState(false)
        }
    }

    return <>
        <div className={'articleLinkCard__container'}>
            <main className={'articleLinkCard__content'}>
                <a href={`https://myclick.media/article/${props.id}`}
                   className={'articleLinkCard__title'}>{props.title}</a>
                {props.admin && <div className={'articleLinkCard__editorPanel'}>
                    <div className={`articleLinkCard__editorPanel__optionBubble`}
                         style={{display: props.position === 0 ? 'none' : 'flex'}}
                         onClick={() => props.position === 0 ? null : props.moveLinkUpTheOrder(props.position)}>
                        <BsArrowUpShort size={15}/>
                    </div>
                    <div className={`articleLinkCard__editorPanel__optionBubble`}
                         style={{display: props.MAX_NUMBER_OF_LINKS === props.position + 1 ? 'none' : 'flex'}}
                         onClick={() => props.MAX_NUMBER_OF_LINKS === props.position + 1 ? null : props.moveLinkDownTheOrder(props.position)}>
                        <BsArrowDownShort size={15}/>
                    </div>
                    <div
                        className={`articleLinkCard__editorPanel__optionBubble ${isEditModeOn && 'articleLinkCard__editorPanel__optionBubble_active'}`}
                        onClick={() => setEditModeState(prev => !prev)}>
                        <MdModeEditOutline size={15}/>
                    </div>
                </div>}
            </main>
            {isEditModeOn &&
                <div className={'articleLinkCard__editCurrentLink'}>
                    <div className={'articleLinkCard__editCurrentLink__inputContainer'}>
                        <p className={'articleLinkCard__editCurrentLink__inputLabel'}>Link</p>
                        <input value={link} className={'articleLinkCard__editCurrentLink__input'} type="text"
                               onChange={handleChange}/>
                    </div>
                    <div className={'articleLinkCard__editCurrentLink__actions'}>
                        <button className={'articleLinkCard__editCurrentLink__actions__cancel'}
                                onClick={() => setEditModeState(false)}>
                            Cancel
                        </button>
                        <button onClick={handleSubmit} className={'articleLinkCard__editCurrentLink__actions__save'}>
                            <BsCheckLg size={18} color={'#58649C'}/>
                        </button>
                    </div>
                </div>
            }
        </div>

    </>
};