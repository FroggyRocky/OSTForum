import './app.css'
import {User} from './Components/User'
import {useQuery} from "@tanstack/react-query";
import {instance} from "./api";
import {Loader} from "./Components/Loader";
import {Error} from "./Components/Error";
import {LinkType} from "./types";
import {Layout} from "./Components/Layout/Layout";
import {useEffect} from "react";
import {domainURL} from "../URL";

function App() {
    const {isLoading, error, data: links} = useQuery<LinkType[]>(['links'], async () =>
        instance.get<LinkType[]>('/get-taplinks').then(res => res.data)
    );
    useEffect(() => {
        function setLocalStorage(e:any) {
            console.log(e.origin, domainURL)
            if (e.origin == `${domainURL}` || e.origin == `${domainURL}/dashboard`) {
                const data = JSON.parse(e.data)
                console.log(e.data)
                if (typeof data !== 'undefined') {
                    localStorage.setItem('myClickToken', data.token)
                    console.log(data.refreshtoken)
                    document.cookie = data.refreshtoken
                }
            }
        }
        window.addEventListener('message', setLocalStorage)
        return () => window.removeEventListener('message', setLocalStorage)
    },[])
    if (error) return <Error/>
    if (isLoading) return <Loader/>
    return <Layout>
        <User links={links}/>
    </Layout>

}

export default App
