import './articleLinkCard.css'




type Props = {
title:string
    id:number
};

export function ArticleLinkCard(props: Props) {




    return <a href={`https://myclick.media/article/${props.id}`}  className={'articleLinkCard__container'}>
        <main className={'articleLinkCard__content'}>
            <p className={'articleLinkCard__title'}>{props.title}</p>
        </main>
    </a>
};