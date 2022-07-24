import {Categories} from "./Categories";
import imageEx from "../../../assets/cardBg.png";
import {CardWithStatistics} from "./Cards/CardWithStatistics";

type Props = {};
export const Cases = (props: Props) => {

    const casesData = [
        {
            id: 1,
            img: imageEx,
            header: 'Mostbet Partners - AAA',
            text: 'Партнёрка от прямого рекламодателя Mostbet.com. Принимают гемблинг и беттинг трафик со всего мира. СРА по популярным ГЕО 20$-50$, Revshare от 30% до 70%. По запросу выдают приложения и диплинки.',
            keys: ['Gabling', 'Betting'],
            views: 35,
            comments: 20,
            likes: 3,
            dislikes: 30,
            publishingDate: 'Today' // later apply logic which is writtern in the main/articles/articles
        },
        {
            id: 2,
            img: imageEx,
            header: 'Mostbet Partners - AAA',
            text: 'Партнёрка от прямого рекламодателя Mostbet.com. Принимают гемблинг и беттинг трафик со всего мира. СРА по популярным ГЕО 20$-50$, Revshare от 30% до 70%. По запросу выдают приложения и диплинки.',
            keys: ['Gabling', 'Betting'],
            views: 35,
            comments: 20,
            likes: 3,
            dislikes: 30,
            publishingDate:'Yesterday' // later apply logic which is writtern in the main/articles/articles
        },
    ]
    const categoriesList = ['Facebook', 'Gambling and casino', 'Gambling and casino', 'Gambling and casino', 'Gambling and casino']

    const cards = casesData.map(el => {
        return <CardWithStatistics key={el.id} header={el.header} text={el.text} keys={el.keys} img={el.img}
                                   views={el.views} comments={el.comments} likes={el.likes} dislikes={el.dislikes}
                                   publishingDate={el.publishingDate}/>
    })


    return <Categories header='Affiliate Programs' categoriesList={categoriesList}>
        {cards}
    </Categories>
};