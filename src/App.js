import { BrowserRouter as Router } from 'react-router-dom';
import { Switch } from 'react-router-dom';
import { Route } from 'react-router-dom';
import { Redirect } from 'react-router-dom'
import Login from './components/login/login';
import NewUser from './components/newuser/newuser';
import Footer from './components/common/footer';
import Header from './components/common/header';
import Cookies from 'universal-cookie';
import './App.css';


const cookies = new Cookies();


function findIsLoggedin() {
  return (cookies.get('isLoggedin') === 'true');
}


function PrivateRoute({children, ...rest}) {
  const isLoggedin = findIsLoggedin()

  return (
    <Route
    {...rest}
    render={ ({location}) =>
      isLoggedin ? (
        children
      ) : (
        <Redirect
        to={{
          pathname: '/login',
          state: {from: location}
        }} />
      )
    } />
  );
}


function App() {
  if(!(cookies.get('isLoggedin'))){
    cookies.set('isLoggedin', false, {path: '/'})
  }

  const isLoggedin = (cookies.get('isLoggedin') === 'true')
  
  return (
    <Router className="App">
      <Switch>
        <Route path='/login'>
          <Login />
        </Route>
        <Route path='/newuser'>
          <Header loggedin={isLoggedin} />
          <NewUser />
        </Route>
        <PrivateRoute path='/'>
          <Header loggedin={isLoggedin} />
        </PrivateRoute>
      </Switch>
      <Footer loggedin={isLoggedin} />
    </Router>
  );
}

export default App;
