import './vacancies.scss'
import {CardWithLinkAndPrice} from "../../../UIKit/Cards/CardsWithKeys/CardWithLinkAndPrice";
import {useAppSelector} from "../../../redux/storeHooks/storeHooks";
import {useEffect, useState} from "react";
import {getVacancies} from "../../../redux/vacancies/vacanciesThunks";
import {useAppDispatch} from "../../../redux/storeHooks/storeHooks";
import {KeysFilter} from "../../../UIKit/KeysFilter/KeysFilter";
import {PageWithCardsFilterLayout} from "../../../UIKit/PageWithCardsFilterLayout/PageWithCardsFilterLayout";
import {VacancyCard} from "../../../UIKit/Cards/CardsWithKeys/VacancyCard";
import {Layout} from "../../../UIKit/GeneralLayout/Layout";
import {StyledContent, StyledWrapper, StyledH1} from "../../../UIKit/BasicStyledComponents/basicStyledComponents";

type Props = {};

export function Vacancies(props: Props) {
    const dispatch = useAppDispatch()
    const vacancies = useAppSelector(state => state.vacancies.vacancies)
    const keys = useAppSelector(state => state.authConfigs.configs.keys.vacancy)
    const [currentFilter, setCurrentFilter] = useState<{ id: number, name: string } | undefined>(undefined)
    const [currentFilterName, setCurrentFilterName] = useState('')

    const vacanciesComponents = vacancies.filter(el => {
        if (!currentFilter?.id) return true
        else if (currentFilter.id) {
            return el.keyIds.includes(currentFilter.id)
        }
    }).map(el => {
        return <div className={'vacancies__card'}>
            <VacancyCard key={el.id} createdAt={el.createdAt} data={el.data} company={el.company}
                         keys={keys.filter(key => el.keyIds.includes(key.id))} cover={el.cover}
                         header={el.header} description={el.description}/>
        </div>
    })

    useEffect(() => {
        dispatch(getVacancies())
    }, [])
    return <Layout>
        <StyledWrapper>
            <StyledContent>
                <div className={'vacancies'}>
                    <StyledH1>Job Opportunity</StyledH1>
                    <div className={'vacancies__cards'}>
                    {vacanciesComponents}
                    </div>
                </div>
            </StyledContent>
        </StyledWrapper>
    </Layout>
};