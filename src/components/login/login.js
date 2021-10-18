import React from 'react';
import './login.css';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';


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
    }

    onEntryChange(event) {
        if(event.target.id === 'username') {
            this.setState({username: event.target.value})
        }
        if(event.target.id === 'password') {
            this.setState({password: event.target.value})
        }
    }

    onSubmit() {
        console.log('Submit action detected')
        console.log('username: '+this.state.username)
        console.log('password: '+this.state.password)
    }

    onNewUser() {
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
                variant='outlined' />
                
                <TextField
                id='password'
                label='Password'
                onChange={this.entryChange}
                type='password'
                variant='outlined' />

                <div className='button-container'>
                    <Button variant='text' onClick={this.onLogin}>Login</Button>
                    <Button variant='text' onClick={this.newUser}>New user</Button>
                </div>
            </div>
        );
    }
}


export default class Login extends React.Component {
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
                {this.state.visible && <InputBox />}
            </div>
        );
    }
}