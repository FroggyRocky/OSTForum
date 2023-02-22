import {Categories} from "./Categories";
import imageEx from '../../../assets/cardBg.png'
import {CardWithPrice} from "../../common/Cards/CardWithPrice";

type Props = {};
export const Affiliate = (props: Props) => {

    const categoriesList = ['Facebook', 'Gambling and casino', 'Gambling and casino', 'Gambling and casino', 'Gambling and casino']
    const affiliatesData = [
        {
            id: 1,
            img: imageEx,
            header: 'Mostbet Partners - AAA',
            text: 'Партнёрка от прямого рекламодателя Mostbet.com. Принимают гемблинг и беттинг трафик со всего мира. СРА по популярным ГЕО 20$-50$, Revshare от 30% до 70%. По запросу выдают приложения и диплинки.',
            payment: 50,
            keys: ['Gabling', 'Betting'],
            link: 'https://ostproduct.com/'

        },
        {
            id: 2,
            img: imageEx,
            header: 'Mostbet Partners - AAA',
            text: 'Партнёрка от прямого рекламодателя Mostbet.com. Принимают гемблинг и беттинг трафик со всего мира. СРА по популярным ГЕО 20$-50$, Revshare от 30% до 70%. По запросу выдают приложения и диплинки.',
            payment: 50,
            keys: ['Gabling', 'Betting'],
            link: 'https://ostproduct.com/'

        },
    ]

    const cards = affiliatesData.map(el => {
        return <CardWithPrice key={el.id} header={el.header} text={el.text} img={el.img} keys={el.keys} link={el.link}
                              payment={el.payment}/>
    })


    return <Categories header='Affiliate Programs' categoriesList={categoriesList}>
        {cards}
    </Categories>


};