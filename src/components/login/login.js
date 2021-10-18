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
    render() {
        return (
            <div className='entry-container'>
                <h1>Login</h1>
                
                <TextField
                id='username'
                label='Username'
                variant='outlined' />
                
                <TextField
                id='password'
                label='Password'
                type='password'
                variant='outlined' />

                <div className='button-container'>
                    <Button variant='text'>Login</Button>
                    <Button variant='text'>New user</Button>
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