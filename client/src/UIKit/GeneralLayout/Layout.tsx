import {ReactNode} from "react";
import {Header} from "../../components/Header/Header";
import {Footer} from "../../components/Footer/Footer";

type Props = {
children:ReactNode
};
export const Layout = (props: Props) => {
    return <>
        <Header/>
        {props.children}
        <Footer />
    </>
};