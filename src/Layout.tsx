import {Header} from "./components/Header/Header";
import {Footer} from "./components/Footer/Footer";
import {Outlet} from "react-router-dom";
import {Wrapper} from "./components/common/commonStyles/Wrapper.styled";

type Props = {

};
export const Layout = (props: Props) => {
    return <Wrapper>
        <Header/>
        <Outlet/>
        <Footer />
    </Wrapper>
};