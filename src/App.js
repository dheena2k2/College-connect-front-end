import { BrowserRouter as Router } from 'react-router-dom';
import { Switch } from 'react-router-dom';
import { Route } from 'react-router-dom';
import Login from './components/login/login';
import NewUser from './components/newuser/newuser';
import Footer from './components/common/footer';
import Header from './components/common/header';
import './App.css';

function App() {
  const loggedin = false;
  return (
    <Router className="App">
      <Switch>
        <Route path='/login'>
          <Login />
        </Route>
        <Route path='/newuser'>
          <Header loggedin={loggedin} />
          <NewUser />
        </Route>
      </Switch>
      <Footer loggedin={loggedin} />
    </Router>
  );
}

export default App;
