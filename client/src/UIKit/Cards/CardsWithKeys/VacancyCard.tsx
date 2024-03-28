import {ImgWithLoader} from "../../ImgWithLoader/ImgWithLoader";
import defaultCover from "../../../assets/defaultCardCover.png";
import {IKey} from "../../../redux/auth/authConfigsTypes";
import {calcDate} from "../../../services/calcDate";
import {IVacancyData} from "../../../redux/vacancies/vacanciesTypes";
import {useState} from "react";
import './vacancyCard.scss'
type Props = {
    header: string,
    description: string,
    cover: string,
    keys: IKey[],
    company: string
    createdAt: string
    data: IVacancyData
};

export function VacancyCard(props: Props) {
    const keys = props.keys.map(el => {
        return <div className={'vacancyCard__keys__key'} key={el.id}>{el.name}</div>
    })
    const [isReadMoreOpen, setReadMoreState] = useState(false)
    return <div className={'vacancyCard'}>
        <div className={'vacancyCard__card'}>
            <div className={'vacancyCard__card__firstRow'}>
        <div className={'vacancyCard__cover'}>
            <ImgWithLoader alt={`cover_${props.header}`} defaultSrc={defaultCover} src={props.cover} width={'240px'}
                           height={'240px'}/>
        </div>
        <main className={'vacancyCard__content'}>
            <section className={'vacancyCard__mainData'}>
                <p className={'vacancyCard__header'}>{props.header}</p>
                <div className={'vacancyCard__cover_mob'}>
                    <ImgWithLoader alt={`cover_${props.header}`} defaultSrc={defaultCover} src={props.cover}
                                   width={'240px'}
                                   height={'240px'}/>
                </div>
                <p className={'vacancyCard__companyName'}>{props.company}</p>
                <p className={'vacancyCard__description'}>{props.description}</p>
                <p className={'vacancyCard__keys'}><b>Tags: </b>{keys}</p>
                <div className={'vacancyCard__readMoreContainer'}>
                    <p className={'vacancyCard__date'}><b>Data: </b>{calcDate(props.createdAt)}</p>
                    <p className={'vacancyCard__readMore'}
                       onClick={() => setReadMoreState(prev => !prev)}>{isReadMoreOpen ? 'hide' : 'read more'}</p>
                </div>
            </section>
        </main>
        </div>
            {isReadMoreOpen &&  <section className={'vacancyCard__card__additionalData'}>
            <p><b>About:</b> {props.data.about}</p>
            <p><b>Hiring:</b> {props.data.hiring}</p>
            <p><b>Responsibilities:</b> {props.data.responsibilities}</p>
            <p><b>We Offer:</b> {props.data.offer}</p>
            <p><b>Requirements and Conditions:</b> {props.data.requirements}</p>
            <p><b>Additional Information:</b> {props.data.info}</p>
        </section>
        }
        </div>

    </div>
}