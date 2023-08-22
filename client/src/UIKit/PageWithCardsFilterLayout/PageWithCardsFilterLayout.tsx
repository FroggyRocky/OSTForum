import {useLocation} from "react-router-dom";
import {PathWidget} from "../PathWidget/PathWidget";
import {ReactNode} from "react";
import {Header} from "../../components/Header/Header";
import {Footer} from "../../components/Footer/Footer";
import {StyledWrapper, StyledContent} from "../BasicStyledComponents/basicStyledComponents";
import './pageWithCardsFilterLayout.scss'
import {KeysFilter} from "../KeysFilter/KeysFilter";
import {IKey} from "../../redux/auth/authConfigsTypes";


type Props = {
 page:string,
    keys:IKey[]
    currentKey:{name:string, id:number}
    setCurrentKey:(e:any) => void
    children:ReactNode
};

export function PageWithCardsFilterLayout(props: Props) {
    const historyState = useLocation().state as Array<{ pathName: string, path: string }>

    return <>
        <Header />
    <StyledWrapper>
        <StyledContent>
        <div className={'pageWithCardsFilterLayout'}>
            <PathWidget historyPath={historyState} targetPath={props.page}/>
            <h2 className={'pageWithCardsFilterLayout__header'}>{props.page}</h2>
            <div className={'pageWithCardsFilterLayout__content'}>
            <div className={'pageWithCardsFilterLayout__filter'}>
                <KeysFilter keys={props.keys} selectedKey={props.currentKey} setFilterValue={props.setCurrentKey} />
            </div>
            {props.children}
        </div>
        </div>
        </StyledContent>
    </StyledWrapper>
        <Footer />
    </>
};