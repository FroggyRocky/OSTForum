import imageEx from "../../../assets/cardBg.png";
import {Categories} from "./Categories";
import {CardWithRegistration} from "../../common/Cards/CardWithRegistration";

type Props = {};

export const Network = (props: Props) => {
    const networkData = [
        {
            id: 1,
            img: imageEx,
            header: 'Mostbet Partners - AAA',
            text: 'Партнёрка от прямого рекламодателя Mostbet.com. Принимают гемблинг и беттинг трафик со всего мира. СРА по популярным ГЕО 20$-50$, Revshare от 30% до 70%. По запросу выдают приложения и диплинки.',
            keys: ['Gabling', 'Betting'],
        },
        {
            id: 2,
            img: imageEx,
            header: 'Mostbet Partners - AAA',
            text: 'Партнёрка от прямого рекламодателя Mostbet.com. Принимают гемблинг и беттинг трафик со всего мира. СРА по популярным ГЕО 20$-50$, Revshare от 30% до 70%. По запросу выдают приложения и диплинки.',
            keys: ['Gabling', 'Betting']

        },
    ]
    const categoriesList = ['Facebook', 'Gambling and casino', 'Gambling and casino', 'Gambling and casino', 'Gambling and casino']

    const cards = networkData.map(el => {
        return <CardWithRegistration header={el.header} text={el.text} keys={el.keys} img={el.img}/>
    })

    return <Categories categoriesList={categoriesList} header='Network'>
        {cards}
    </Categories>
};