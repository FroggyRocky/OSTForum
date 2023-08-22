import {ArticleLinkCard} from "./ArticleLinkCard/ArticleLinkCard";
import {FiRefreshCcw} from "react-icons/fi";
import {useNavigate} from "react-router-dom";
import {Layout} from "./Layout/Layout";
import './tapLinkEditor.scss'
import {useAppDispatch, useAppSelector} from "../../../redux/storeHooks/storeHooks";
import {getTapLinks, synchronizeTapLinks, updateTapLinks} from "../../../redux/taplink/typeLinkThunks";
import {useEffect} from "react";
import {setTapLinks} from "../../../redux/taplink/tapLinkSlice";

const MAX_NUMBER_OF_LINKS = 8
type Props = {};

export function TapLinkEditor(props: Props) {
    const dispatch = useAppDispatch()
    const tapLinks = useAppSelector(state => state.tapLinks.tapLinks)
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(getTapLinks())
    }, [])

    function synchronizeLinks() {
        dispatch(synchronizeTapLinks())
    }

    function debounced(fn:() => void) {
let timeout:ReturnType<typeof setTimeout>;
return () => {
    clearTimeout(timeout);
    timeout = setTimeout(fn, 500)

}
    }

    function moveLinkUpTheOrder(position: number) {
        let link = {...tapLinks[position]}
        let nextLink = {...tapLinks[position - 1]}
        const temp = nextLink.position
        nextLink.position = link.position
        link.position = temp
        let links = [...tapLinks]
        links.splice(position - 1, 2, link, nextLink)
        dispatch(setTapLinks(links))
        saveChangesWithDebounce()
    }

    function moveLinkDownTheOrder(position: number) {
        let link = {...tapLinks[position]}
        let nextLink = {...tapLinks[position + 1]}
        const temp = nextLink.position
        nextLink.position = link.position
        link.position = temp
        let links = [...tapLinks]
        links.splice(position, 2, nextLink, link)
        dispatch(setTapLinks(links))
        saveChangesWithDebounce()
    }

    function saveChanges() {
        dispatch(updateTapLinks())
    }

    const saveChangesWithDebounce = debounced(saveChanges)
    if (!window.localStorage.getItem('MyClickToken')) navigate('/')

    return <>
        <Layout>
            <header className={'tapLink__layout__header'}>
                <div className={'synchronize__bubble'} onClick={synchronizeLinks}>
                    <FiRefreshCcw size={40} color={'white'}/>
                </div>
                <p>SYNTH</p>
            </header>
            <section className={'tapLink__layout__articlesList'}>
                {[...tapLinks].sort((a, b) => a.position - b.position)?.map((el, index) => {
                    return <ArticleLinkCard moveLinkUpTheOrder={moveLinkUpTheOrder}
                                            articleId={el.articleId}
                                            MAX_NUMBER_OF_LINKS={MAX_NUMBER_OF_LINKS}
                                            moveLinkDownTheOrder={moveLinkDownTheOrder} index={el.position}
                                            position={el.position} admin={true} id={el.id} key={el.id}
                                            title={el.article?.header}/>
                })}
            </section>
        </Layout>
    </>
};