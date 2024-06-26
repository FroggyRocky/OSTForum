import './App.css';
import React, {useEffect, useRef} from 'react'
import {Landing} from "./components/Landing/Landing";
import {Route, Routes} from 'react-router-dom'
import {Article} from "./components/Article/Article";
import {AccountDashboard} from "./components/AccountDashboard/AccountDashboard";
import {useAppDispatch, useAppSelector} from "./redux/hooks/hooks";
import {auth} from "./redux/auth/authConfigsThunks";
import {Loader} from "./UIKit/Loader/Loader";
import {Login} from "./components/Login/Login";
import {Affiliates} from "./components/Landing/Affiliates/Affiliates";
import {Networking} from "./components/Landing/Networking/Networking";
import {Cases} from "./components/Landing/Cases/Cases";
import {Vacancies} from "./components/Landing/Vacancies/Vacancies";
import {Services} from "./components/Landing/Services/Services";
import {CreateAffiliate} from "./components/AccountDashboard/Create/CreateContent/CreateAffiliate/CreateAffiliate";
import {CreateArticle} from "./components/AccountDashboard/Create/CreateArticle/CreateArticle";
import {CreateVacancy} from "./components/AccountDashboard/Create/CreateContent/CreateVacancy/CreateVacancy";
import {CreateService} from "./components/AccountDashboard/Create/CreateContent/CreateService/CreateService";

function App() {

    const dispatch = useAppDispatch()
    const isInitialized = useAppSelector(state => state.authConfigs.isInitialized)


    useEffect( () => {
        dispatch(auth())
    }, [])


    if (!isInitialized) return <Loader/>
    return (
        <div className="App">
            <Routes>
                <Route path='/' element={<Landing/>}/>
                <Route path='/affiliates' element={<Affiliates/>}/>
                <Route path='/networking' element={<Networking/>}/>
                <Route path='/cases' element={<Cases/>}/>
                <Route path='/vacancies' element={<Vacancies/>}/>
                <Route path='/services' element={<Services/>}/>
                <Route path='/article/:id' element={<Article/>}/>
                <Route path={`/login/${process.env.REACT_APP_SECRET_LOGIN_LINK}`} element={<Login/>}/>
                <Route path={`/dashboard/*`} element={<AccountDashboard/>}/>
                <Route path={`/create/affiliate`} element={<CreateAffiliate/>}/>
                <Route path={`/create/article`} element={<CreateArticle/>}/>
                <Route path={`/create/vacancy`} element={<CreateVacancy/>}/>
                <Route path={`/create/service`} element={<CreateService/>}/>
            </Routes>
        </div>
    );
}

export default App;
