import React from 'react';
import './login.css';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useHistory } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import {login} from "../../CRUD/authFunctions"
import { useDispatch } from 'react-redux';
import { setuser } from '../../app/userSlice';
async function authenticateUser(details,dispatch){
    var res = await login(details.username,details.password);
    if(res.data && res.data.user){
        dispatch(setuser(res.data.user));
    }
}


function Logo() {
    return (
        <div className='login-logo-container'>
            <span className='logo-p1'>College</span><span className='logo-p2'>Connect</span>
        </div>
    );
}


class InputBox extends React.Component {
    constructor(props) {
        super(props)
        this.state = {username: '', password: ''}
        this.entryChange = this.onEntryChange.bind(this)
        this.onLogin = this.onSubmit.bind(this)
        this.keyPress = this.onKeyPress.bind(this)
    }

    onEntryChange(event) {
        if(event.target.id === 'username') {
            this.setState({username: event.target.value})
        }
        if(event.target.id === 'password') {
            this.setState({password: event.target.value})
        }
    }

    onKeyPress(event) {
        if(event.key === 'Enter') {
            this.onSubmit()
        }
    }

    onSubmit() {
        console.log(this.props.dispatch)
        const uid = authenticateUser(this.state,this.props.dispatch)
    }

    render() {
        return (
            <div className='entry-container'>
                <h1>Login</h1>
                
                <TextField
                id='username'
                label='Username'
                onChange={this.entryChange}
                onKeyDown={this.keyPress}
                variant='outlined' />
                
                <TextField
                id='password'
                label='Password'
                onChange={this.entryChange}
                onKeyDown={this.keyPress}
                type='password'
                variant='outlined' />

                <div className='button-container'>
                    <Button
                    variant='text'
                    onClick={this.onLogin} >
                        Login
                    </Button>
                    <Button
                    component={Link}
                    to='newuser'
                    variant='text'
                    onClick={this.newUser}>
                        New user
                    </Button>
                </div>

                <Typography
                component={Link}
                to='/'
                sx={{
                    fontFamily: 'arvo',
                    fontSize: '13px',
                }}>
                    forgot password
                </Typography>
            </div>
        );
    }
}


class LoginPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {visible: false}
    }

    componentDidMount() {
        this.setState({visible: true})
    }

    render() {
        return (
            <div className='login-container'>
                {this.state.visible && <Logo />}
                {this.state.visible && <InputBox

                onSuccessfulAuth={this.props.onSuccessfulAuth}
                dispatch={this.props.dispatch} />}
            </div>
        );
    }
}

function Login() {
    const [ , setCookie] = useCookies(['isLoggedin', 'uid']);
    const dispatch = useDispatch();
    let history = useHistory()
    let location = useLocation()
    let { from } = location.state || { from: { pathname: "/" } };

    return (
        <LoginPage
        onSuccessfulAuth={() => history.replace(from)}
        dispatch={dispatch} />
    );
}

export default Login;