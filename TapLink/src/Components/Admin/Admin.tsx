import {ArticleLinkCard} from "../ArticleLinkCard/ArticleLinkCard";
import {LinkType} from "../../types";
import {FiRefreshCcw} from "react-icons/fi";
import {useQuery, useMutation, useQueryClient} from "@tanstack/react-query";
import {instance, withAuthInstance} from "../../api";
import {Error} from "../Error";
import {Loader} from "../Loader";
import {useNavigate} from "react-router-dom";
import {Layout} from "../Layout/Layout";
import './admin.css'

type Props = {};

export function Admin(props: Props) {
    const queryClient = useQueryClient()
    const {isLoading, error, data: links} = useQuery<LinkType[]>(['links'], async () =>
        instance.get<LinkType[]>('/get-taplinks').then(res => res.data)
    );
    const mutation = useMutation({
        mutationFn: synchronizeLinks,
        onSuccess: async () => {
            await queryClient.invalidateQueries(['links'])
        }
    })

    const navigate = useNavigate()
    if (error) return <Error/>
    if (isLoading) return <Loader/>
        if (!window.localStorage.getItem('myClickToken')) navigate('/')

    async function synchronizeLinks() {

        await withAuthInstance.get('/synchronize-taplinks')
    }

    return <>
        <Layout>
            <header className={'header'}>
                <div className={'synchronize__bubble'} onClick={() => mutation.mutate()}>
                    <FiRefreshCcw size={40} color={'white'}/>
                </div>
                <p>SYNTH</p>
            </header>
            <section className={'articlesList'}>
                {links?.map(el => {
                    return <ArticleLinkCard position={el.position} admin={true} id={el.id} key={el.id}
                                            title={el.article.header}/>
                })}
            </section>
        </Layout>
    </>
};