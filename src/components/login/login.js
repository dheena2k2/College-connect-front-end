import React from 'react';
import './login.css';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useHistory } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useCookies } from 'react-cookie';


function authenticateUser(details){
    const test_details = {
        username: 'test_usr',
        password: 'test_pass'
    }

    let uid = null

    if(details.username === test_details.username && details.password === test_details.password) {
        uid = 'ID_test'
    }

    return uid;
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
        this.newUser = this.onNewUser.bind(this)
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

        const uid = authenticateUser(this.state)
        if(uid) {
            this.props.setCookie('isLoggedin', true, {path: '/'})
            this.props.setCookie('uid', uid, {path: '/'})
            this.props.onSuccessfulAuth()
        }
    }

    onNewUser() {
        window.location.href = '/newuser'
        console.log('New user request detected')
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
                    variant='text'
                    onClick={this.newUser}>
                        New user
                    </Button>
                </div>
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
                setCookie={this.props.setCookie} />}
            </div>
        );
    }
}

function Login() {
    const [ , setCookie] = useCookies(['isLoggedin', 'uid']);
    let history = useHistory()
    let location = useLocation()
    let { from } = location.state || { from: { pathname: "/" } };

    return (
        <LoginPage
        onSuccessfulAuth={() => history.replace(from)}
        setCookie={setCookie} />
    );
}

export default Login;