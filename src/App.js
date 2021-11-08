import { BrowserRouter as Router } from 'react-router-dom';
import { Switch } from 'react-router-dom';
import { Route } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import Header from './components/common/header';
import Footer from './components/common/footer';
import Login from './components/login/login';
import Home from './components/home/home';
import NewUser from './components/newuser/newuser';
import Profile from './components/showprofile/profile';
import EditProfile from './components/editprofile/editprofile';
import CreatePost from './components/createpost/createpost';
import Group from './components/group/group';
import MyGroups from './components/group/mygroups';
import { useCookies } from 'react-cookie';
import UserTable from "./components/users/usertable";
import './App.css';


function findIsLoggedin(cookies) {
  return (cookies.isLoggedin === 'true');
}


function PrivateRoute({children, cookies, ...rest}) {  // can be accessed only if logged in
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


function LoggedOutRoute({children, cookies, ...rest}) {  // can be accessed only if logged out
  const isLoggedout = !findIsLoggedin(cookies)

  return (
    <Route
    {...rest}
    render={ ({location}) =>
      isLoggedout ? (
        children
      ) : (
        <Redirect
        to={{
          pathname: '/',
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

  const isLoggedin = findIsLoggedin(cookies)
  
  return (
    <Router className="App">
      <Switch>

        <LoggedOutRoute path='/login' cookies={cookies}>
          <Login />
        </LoggedOutRoute>

        <LoggedOutRoute path='/newuser' cookies={cookies}>
          <Header loggedin={isLoggedin} />
          <NewUser />
        </LoggedOutRoute>

        <PrivateRoute path='/profile' cookies={cookies}>
          <Header loggedin={isLoggedin} />
          <Profile isCurrentUser={true} />
        </PrivateRoute>

        <PrivateRoute path='/users' cookies={cookies}>
          <Header loggedin={isLoggedin} />
          <UserTable isCurrentUser={true} />
        </PrivateRoute>

        <PrivateRoute path='/editprofile' cookies={cookies}>
          <Header loggedin={isLoggedin} />
          <EditProfile />
        </PrivateRoute>

        <PrivateRoute path='/createpost' cookies={cookies}>
          <Header loggedin={isLoggedin} />
          <CreatePost />
        </PrivateRoute>

        <PrivateRoute path='/group/:id' cookies={cookies}>
          <Header loggedin={isLoggedin} />
          <Group />
        </PrivateRoute>

        <PrivateRoute path='/mygroups' cookies={cookies}>
          <Header loggedin={isLoggedin} />
          <MyGroups />
        </PrivateRoute>

        <PrivateRoute path='/' cookies={cookies}>
          <Header loggedin={isLoggedin} />
          <Home />
        </PrivateRoute>
        
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
