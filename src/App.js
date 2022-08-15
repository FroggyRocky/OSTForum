import './App.css';
import {Landing} from "./components/Landing/Landing";
import {Layout} from './Layout'
import {Route, Routes} from 'react-router-dom'
import {Article} from "./components/Article/Article";
import {Affiliate} from "./components/Landing/AdditionalPages/Affiliate";
import {Network} from "./components/Landing/AdditionalPages/Network";
import {Cases} from "./components/Landing/AdditionalPages/Cases";
import {Login} from "./components/Login/Login";
import {AccountDashboard} from "./components/AccountDashboard/AccountDashboard";



function App() {


    return (
        <div className="App">
            <Routes>
                <Route exact index path='/' element={<Landing/>}/>
                <Route path='/article' element={<Layout/>}>
                    <Route path=':id' element={<Article/>}/>
                </Route>
                <Route path='' element={<Layout/>}>
                    <Route path='/affiliate' element={<Affiliate/>}/>
                    <Route path='/network' element={<Network/>}/>
                    <Route path='/cases' element={<Cases/>}/>
                    <Route path={`/login/${process.env.REACT_APP_SECRET_LOGIN_LINK}`} element={<Login /> } />
                </Route>
                <Route path={`/dashboard/*`} element={<AccountDashboard /> }/>
            </Routes>
        </div>
    );
}

export default App;
