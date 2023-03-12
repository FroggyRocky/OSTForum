import './app.css'
import {User} from './Components/User/User'
import {useQuery} from "@tanstack/react-query";
import {instance} from "./api";
import {Loader} from "./Components/Loader";
import {Error} from "./Components/Error";
import {LinkType} from "./types";
import {Layout} from "./Components/Layout/Layout";


function App() {
    const {isLoading, error, data: links} = useQuery<LinkType[]>(['links'], async () =>
        instance.get<LinkType[]>('/get-taplinks').then(res => res.data)
    );

    if (error) return <Error/>
    if (isLoading) return <Loader/>
    return <Layout>
        <User links={links}/>
    </Layout>

}

export default App
