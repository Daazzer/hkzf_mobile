import {
  BrowserRouter as Router,
  Link,
  Switch,
  Route
} from 'react-router-dom';
import Home from './pages/Home';
import CityList from './pages/CityList';

function App() {
  return (
    <div className="App">
      <Router>
        <ul>
          <li>
            <Link to="/">首页</Link>
          </li>
          <li>
            <Link to="/citylist">城市列表</Link>
          </li>
        </ul>

        <Switch>
          <Route path="/citylist">
            <CityList />
          </Route>
          <Route exact path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
