
import {ImgWithLoader} from "../../ImgWithLoader/ImgWithLoader";
import {IKey} from "../../../redux/auth/authConfigsTypes";
import {StyledFlex} from "../../BasicStyledComponents/basicStyledComponents";
import './cardWithRegistration.scss'
type Props = {
    header: string,
    description: string,
    link: string,
    cover: string,
    keys: IKey[],
    score?:number | null
};

export function CardWithRegistration(props: Props) {
    const keys = props.keys.map(el => {
        return <div className={'cardWithRegistration__meta__keys__key'} key={el.id}>{el.name}</div>
    })

    return <div className={'cardWithRegistration'}>
        <div className={'cardWithRegistration__cover'}>
            <ImgWithLoader alt={`cover_${props.header}`}  src={props.cover} width={'240px'}
                           height={'240px'}/>
        </div>
        <main className={'cardWithRegistration__content'}>
            <section className={'cardWithRegistration__description'}>
                <div className={'cardWithRegistration__description__headerContainer'}>
                    <p className={'cardWithRegistration__description__header'}>{props.header}</p>
                    {props.score !== null &&
                    <div className={'cardWithRegistration__description__score'}>Score: {props.score || '0'}/10</div>
                    }
                </div>
                <div className={'cardWithRegistration__cover_mob'}>
                    <ImgWithLoader alt={`cover_${props.header}`} src={props.cover} width={'240px'}
                                   height={'240px'}/>
                    <div className={'cardWithRegistration__description__score_mob'}>Score: {props.score || '0'}/10</div>
                </div>
                    <p className={'cardWithRegistration__description__description'}>{props.description}</p>
            </section>
            <section className={'cardWithRegistration__meta'}>
                <div className={'cardWithRegistration__meta__keys'}>
                    {keys}
                </div>
                <a href={props.link} className={'cardWithRegistration__meta__link'}>Registration</a>
            </section>
        </main>
    </div>
};