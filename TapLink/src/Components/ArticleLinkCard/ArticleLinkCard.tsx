import './articleLinkCard.css'
import { BsArrowUpShort } from "react-icons/bs";
import { BsArrowDownShort } from "react-icons/bs";
import { MdModeEditOutline } from "react-icons/md";



type Props = {
title:string
    id:number,
    admin?:boolean,
 position?:number
};

export function ArticleLinkCard(props: Props) {

    function moveLinkUpTheOrder() {

    }
    function moveLinkDownTheOrder() {

    }



    return <div className={'articleLinkCard__container'}>
        <main className={'articleLinkCard__content'}>
            <a href={`https://myclick.media/article/${props.id}`} className={'articleLinkCard__title'}>{props.title}</a>
            {props.admin && <div className={'articleLinkCard__editorPanel'}>
                <div className={'articleLinkCard__editorPanel__optionBubble'} onClick={moveLinkUpTheOrder}>
                    <BsArrowUpShort size={13} />
                </div>
                <div className={'articleLinkCard__editorPanel__optionBubble'} onClick={moveLinkDownTheOrder}>
                    <BsArrowDownShort size={13} />
                </div>
                <div className={'articleLinkCard__editorPanel__optionBubble'}>
                    <MdModeEditOutline size={13}/>
                </div>
            </div>}
        </main>
    </div>
};