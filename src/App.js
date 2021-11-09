import React from "react"
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
import { useuser } from 'react-cookie';
import UserTable from "./components/users/usertable";
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from "./CRUD/readFunctions";
import {setuser} from "./app/userSlice";
import CreateGroup from "./components/creategroup/creategroup";
function findIsLoggedin(user) {
  console.log("user",user,Boolean(user));
  return Boolean(user && user.username);
}


function PrivateRoute({children, user, ...rest}) {  // can be accessed only if logged in
  const isLoggedin = findIsLoggedin(user)
  
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


function LoggedOutRoute({children, user, ...rest}) {  // can be accessed only if logged out
  const isLoggedout = !findIsLoggedin(user)

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
  const user = useSelector(state=>state.user.user);
  const users = useSelector(state=>state.contacts.users);
  const dispatch = useDispatch();
  const [loading,setLoading] =React.useState(true);
  const isLoggedin = user;
  React.useEffect(()=>{
    (async () => {
      var res = await getUser();
      //console.log(res.data.user)
      if(res.data && res.data.user)dispatch(setuser(res.data.user));
      setLoading(false);
    })();
  },[])
  if(loading)return <div>loading...</div>
  return (
    <Router className="App">
      <Switch>

        <LoggedOutRoute path='/login' user={user}>
          <Login />
        </LoggedOutRoute>

        <LoggedOutRoute path='/newuser' user={user}>
          <Header loggedin={isLoggedin} />
          <NewUser />
        </LoggedOutRoute>

        <PrivateRoute path='/profile/:id' user={user}>
          <Header loggedin={isLoggedin} />
          <Profile />
        </PrivateRoute>

        <PrivateRoute path='/users' user={user}>
          <Header loggedin={isLoggedin} />
          <UserTable isCurrentUser={true} users={users}/>
        </PrivateRoute>

        <PrivateRoute path='/editprofile' user={user}>
          <Header loggedin={isLoggedin} />
          <EditProfile />
        </PrivateRoute>

        <PrivateRoute path='/createpost' user={user}>
          <Header loggedin={isLoggedin} />
          <CreatePost />
        </PrivateRoute>

        <PrivateRoute path='/group/:id' user={user}>
          <Header loggedin={isLoggedin} />
          <Group />
        </PrivateRoute>
        <PrivateRoute path='/creategroup' user={user}>
          <Header loggedin={isLoggedin} />
          <CreateGroup />
        </PrivateRoute>
        <PrivateRoute path='/editgroup/:id' user={user}>
          <Header loggedin={isLoggedin} />
          <CreateGroup />
        </PrivateRoute>
        <PrivateRoute path='/mygroups' user={user}>
          <Header loggedin={isLoggedin} />
          <MyGroups />
        </PrivateRoute>

        <PrivateRoute path='/' user={user}>
          <Header loggedin={isLoggedin} />
          <Home />
        </PrivateRoute>
        
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
