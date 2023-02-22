import Logo from "../../assets/logo.svg";
import {FaTelegramPlane} from "react-icons/fa";
import {GrReddit} from "react-icons/gr";
import {ArticleLinkCard} from "../ArticleLinkCard/ArticleLinkCard";
import {LinkType} from "../../types";

type Props = {
    links:LinkType[] | undefined
};

export function User( { links }:Props) {
    return <>
        <header className={'header'}>
            <img src={Logo} alt="logo"/>
            <p>MY CLICK MEDIA</p>
        </header>
        <section className={'articlesList'}>
            {links?.map(el => {
                return <ArticleLinkCard id={el.id} key={el.id} title={el.article.header}/>
            })}
        </section>
        <footer className={'socialLinks'}>
            <a href="https://t.me/myclickmedia" className={'socialIcon__bubble'}>
                <FaTelegramPlane color={'white'} size={25} className={'socialIcon'}/>
            </a>
            <a href="" className={'socialIcon__bubble'}>
                <GrReddit color={'white'} size={25} className={'socialIcon'}/>
            </a>
        </footer>
    </>
};