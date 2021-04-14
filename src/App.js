import './styles/app.scss';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Search from './components/search.js';
import ComicList from './components/ComicList';
import Logo from './components/Logo';

function App() {

  return (
    <Router>
      <Logo/>
      <Search/>
      <Route path="/hq/:characterId/:characterName" component={ComicList}></Route>
    </Router>
  );
}

export default App;
