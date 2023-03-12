import defaultCover from '../../../assets/defaultCardCover.png'
import {ImgWithLoader} from "../../../components/common/ImgWithLoader";
import {IKey} from "../../../redux/auth/authConfigsTypes";
import './cardWithRegistration.scss'
type Props = {
    header: string,
    description: string,
    link: string,
    cover: string,
    keys: IKey[]
};

export function CardWithRegistration(props: Props) {
    const keys = props.keys.map(el => {
        return <div className={'cardWithRegistration__meta__keys__key'} key={el.id}>{el.name}</div>
    })

    return <div className={'cardWithRegistration'}>
        <div className={'cardWithRegistration__cover'}>
            <ImgWithLoader alt={`cover_${props.header}`} defaultSrc={defaultCover} src={props.cover} width={'240px'}
                           height={'240px'}/>
        </div>
        <main className={'cardWithRegistration__content'}>
            <section className={'cardWithRegistration__description'}>
                    <p className={'cardWithRegistration__description__header'}>{props.header}</p>
                    <p className={'cardWithRegistration__description__description'}>{props.description}</p>
            </section>
            <section className={'cardWithRegistration__meta'}>
                <div className={'cardWithRegistration__meta__keys'}>
                    {keys}
                </div>
                <a href={props.link} className={'cardWithRegistration__meta__button'}>
                    Register
                </a>
            </section>
        </main>
    </div>
};