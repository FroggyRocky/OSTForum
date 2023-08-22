import Logo from "../../assets/logo.svg";
import LogoMob from '../../assets/logoMob.svg'
import {FaTelegramPlane} from "react-icons/fa";
import {GrReddit} from "react-icons/gr";
import {ArticleLinkCard} from "../ArticleLinkCard/ArticleLinkCard";
import {LinkType} from "../../types";
import '../Layout/layout.css'
type Props = {
    links:LinkType[] | undefined
};

export function User( { links }:Props) {
    return <>
        <header className={'header'}>
            <img src={Logo} className={'logo'} alt="logo"/>
            <img src={LogoMob} className={'logo_mob'} alt="logo"/>
            <p>MY CLICK MEDIA</p>
        </header>
        <section className={'articlesList'}>
            {links && [...links].sort((a, b) => a.position - b.position).map(el => {
                return <ArticleLinkCard id={el.articleId} key={el.id} title={el.article?.header}/>
            })}
        </section>
        <footer className={'socialLinks'}>
            <a href="https://t.me/myclickmedia" target={'_blank'} className={'socialIcon__bubble'}>
                <FaTelegramPlane color={'white'} size={25} className={'socialIcon'}/>
            </a>
            <a href="" className={'socialIcon__bubble'}>
                <GrReddit color={'white'} size={25} className={'socialIcon'}/>
            </a>
        </footer>
    </>
};