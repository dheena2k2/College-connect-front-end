import { BrowserRouter as Router } from 'react-router-dom';
import { Switch } from 'react-router-dom';
import { Route } from 'react-router-dom';
import { Redirect } from 'react-router-dom'
import Login from './components/login/login';
import NewUser from './components/newuser/newuser';
import Footer from './components/common/footer';
import Header from './components/common/header';
import { useCookies } from 'react-cookie';
import './App.css';


function findIsLoggedin(cookies) {
  return (cookies.isLoggedin === 'true');
}


function PrivateRoute({children, cookies, ...rest}) {
  const isLoggedin = findIsLoggedin(cookies)

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
  const [cookies, setCookie] = useCookies(['isLoggedin']);

  if(!cookies.isLoggedin) {
    setCookie('isLoggedin', false, {path: '/'})
  }

  console.log("Cookie value ", cookies.isLoggedin)

  const isLoggedin = findIsLoggedin(cookies)
  
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
        <PrivateRoute path='/' cookies={cookies}>
          <Header loggedin={isLoggedin} />
        </PrivateRoute>
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
