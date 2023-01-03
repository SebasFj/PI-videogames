import './App.css';
import { Route} from 'react-router-dom';
import Main from './components/Main';
import Detail from './components/Detail';
import Videogames from './components/Videogames';
import Form from './components/Form';
import Error404 from "./components/Error404"


function App() {
  return (
    <div className="App">
        <Route exact path={"/"} component={Main}/>
        <Route path={"/home/videogames/:id"} component={Detail}/> 
        <Route exact path={"/home"}><Videogames fav={false}/></Route>
        <Route path={"/create"} component={Form}/>
        <Route path={"*"} component={Error404} />
    </div>
  );
}

export default App;
