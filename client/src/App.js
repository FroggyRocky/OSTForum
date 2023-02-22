import './App.css';
import React, {useEffect, useRef} from 'react'
import {Landing} from "./components/Landing/Landing";
import {Route, Routes} from 'react-router-dom'
import {Article} from "./components/Article/Article";
import {AccountDashboard} from "./components/AccountDashboard/AccountDashboard";
import {useAppDispatch, useAppSelector} from "./redux/hooks/hooks";
import {auth} from "./redux/auth/authConfigsThunks";
import {Loader} from "./components/common/Loader";
import {Login} from "./components/Login/Login";
import {taplinkURL} from "./api/URL";

function App() {

    const dispatch = useAppDispatch()
    const isInitialized = useAppSelector(state => state.authConfigs.isInitialized)
    const iframeRef = useRef()
        function sentMsgToIframe() {
            if(!iframeRef.current) return;
            const wind = iframeRef.current.contentWindow
            const data = {
                token: window.localStorage.getItem('MyClickToken'),
                refreshtoken:document.cookie
            }
            console.log(data)
            wind.postMessage(JSON.stringify(data), '*')
        }


    useEffect( () => {
        dispatch(auth())
    }, [])


    if (!isInitialized) return <Loader/>
    return (
        <div className="App">
            <iframe ref={iframeRef} onLoad={sentMsgToIframe} src={`${taplinkURL}`}></iframe>
            <Routes>
                <Route path='/' element={<Landing/>}/>
                <Route path='/article/:id' element={<Article/>}/>
                <Route path={`/login/${process.env.REACT_APP_SECRET_LOGIN_LINK}`} element={<Login/>}/>
                <Route path={`/dashboard/*`} element={<AccountDashboard/>}/>
            </Routes>
        </div>
    );
}

export default App;
