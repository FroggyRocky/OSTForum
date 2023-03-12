import {Wrapper} from "../../common/commonStyles/Wrapper.styled";
import {useLocation} from "react-router-dom";
import {PathWidget} from "../../common/PathWidget";
import {ReactNode} from "react";
import {Header} from "../../Header/Header";
import {Footer} from "../../Footer/Footer";
import {Content} from "../../common/commonStyles/Content.styled";
import './subPages.scss'
type Props = {
 page:string,
    children:ReactNode
};

export function SubPagesLayout(props: Props) {
    const historyState = useLocation().state as Array<{ pathName: string, path: string }>
    return <>
        <Header />
    <Wrapper>
        <Content>
        <div className={'subPagesLayout'}>
            <PathWidget historyPath={historyState} targetPath={props.page}/>
            <h2 className={'subPagesLayout__header'}>{props.page}</h2>
            {props.children}
        </div>
        </Content>
    </Wrapper>
        <Footer />
    </>
};