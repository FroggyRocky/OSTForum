import defaultCover from '../../../assets/defaultCardCover.png'
import {ImgWithLoader} from "../../ImgWithLoader/ImgWithLoader";
import {IKey} from "../../../redux/auth/authConfigsTypes";
import './cardWithLinkAndPrice.scss'
type Props = {
    header: string,
    description: string,
    price: number,
    link: string,
    cover: string,
    keys: IKey[]
};

export function CardWithLinkAndPrice(props: Props) {
    const keys = props.keys.map(el => {
        return <div className={'cardWithLinkAndPrice__meta__keys__key'} key={el.id}>{el.name}</div>
    })

    return <div className={'cardWithLinkAndPrice'}>
        <div className={'cardWithLinkAndPrice__cover'}>
            <ImgWithLoader alt={`cover_${props.header}`} defaultSrc={defaultCover} src={props.cover} width={'240px'}
                           height={'240px'}/>
        </div>
        <main className={'cardWithLinkAndPrice__content'}>
            <section className={'cardWithLinkAndPrice__description'}>
                <div className={'cardWithLinkAndPrice__description__text'}>
                <p className={'cardWithLinkAndPrice__description__text__header'}>{props.header}</p>
                <p className={'cardWithLinkAndPrice__description__text__description'}>{props.description}</p>
                </div>
                <div className={'cardWithLinkAndPrice__description__price'}>
                    <p className={'cardWithLinkAndPrice__description__price__sum'}>{props.price}$</p>
                    <p>Pay Off</p>
                </div>
            </section>
            <section className={'cardWithLinkAndPrice__meta'}>
                <div className={'cardWithLinkAndPrice__meta__keys'}>
                    {keys}
                </div>
                <div className={'cardWithLinkAndPrice__meta__link'}>
                    <a href={props.link}>Details</a>
                </div>
            </section>
        </main>
    </div>
};