import './styles/app.scss';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Search from './components/search.js';
import ComicList from './components/ComicList';

function App() {

  return (
    <Router>
      <Search/>
      <Route path="/hq/:characterId" component={ComicList}></Route>
    </Router>
  );
}

export default App;
