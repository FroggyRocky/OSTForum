import './App.css';
import {Landing} from "./components/Landing/Landing";
import {Layout} from './Layout'
import {Routes, Route} from 'react-router-dom'
import {Article} from "./components/Article/Article";
import {Affiliate} from "./components/Landing/AdditionalPages/Affiliate";
import {Network} from "./components/Landing/AdditionalPages/Network";
import {Cases} from "./components/Landing/AdditionalPages/Cases";

function App() {
  return (
    <div className="App">
        <Routes>
            <Route exact index path='/' element={<Landing />} />
        <Route path='/article' element={<Layout/>}>
          <Route path=':id'  element={<Article />}/>
    </Route>
            <Route path='' element={<Layout />}>
                <Route path='/affiliate'  element={<Affiliate />}/>
            </Route>
            <Route path='' element={<Layout />}>
                <Route path='/network'  element={<Network />}/>
            </Route>
            <Route path='' element={<Layout />}>
                <Route path='/cases'  element={<Cases />}/>
            </Route>
        </Routes>
    </div>
  );
}

export default App;
