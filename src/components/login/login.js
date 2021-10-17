import React from 'react';
import './login.css'
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';


class InputBox extends React.Component {
    render() {
        return (
                <Box className='fit-box'>
                    <center>
                        <h1>Login</h1>
                        <table>
                            <tr>
                                <td colspan={2}>
                                    <TextField
                                    id='username'
                                    label='Username'
                                    variant='filled' />
                                </td>
                            </tr>
                            <tr>
                                <td colspan={2}>
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
                        </table>
                    </center>
                </Box>
        );
    }
}


export default class Login extends React.Component {
    render() {
        return (
            <div className='container' style={{
                backgroundImage: `url(${process.env.PUBLIC_URL + '/img/login_bg.jpg'})`
            }}>
                <InputBox />
            </div>
        );
    }
}