import React from 'react';
import './login.css';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';


function Logo() {
    return (
        <div className='logo-box'>
            <span className='logo-p1'>College</span><span className='logo-p2'>Connect</span>
        </div>
    );
}


class InputBox extends React.Component {
    render() {
        return (
                <div className='fit-box'>
                    <center>
                        <h1>Login</h1>
                        <table>
                            <tbody>
                            <tr>
                                <td colSpan={2}>
                                    <TextField
                                    id='username'
                                    label='Username'
                                    variant='filled' />
                                </td>
                            </tr>
                            <tr>
                                <td colSpan={2}>
                                    <TextField
                                    id='password'
                                    label='Password'
                                    type='password'
                                    variant='filled' />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <Button variant='text'>Login</Button>
                                </td>
                                <td align='right'>
                                    <Button variant='text'>New user</Button>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </center>
                </div>
        );
    }
}


export default class Login extends React.Component {
    render() {
        return (
            <div className='container' style={{
                backgroundImage: `url(${process.env.PUBLIC_URL + '/img/login_bg.jpg'})`
            }}>
                <div><Logo /></div>
                <div><InputBox /></div>
            </div>
        );
    }
}