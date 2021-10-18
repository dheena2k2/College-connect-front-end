import React from 'react';
import './footer.css'
import Button from '@mui/material/Button'


function Logo() {
    return (
        <div className='logo-box'>
            <span className='logo-p1'>College</span><span className='logo-p2'>Connect</span>
        </div>
    );
}

class Options extends React.Component {
    constructor(props) {
        super(props)
        this.state = {loggedin: props.loggedin}
    }

    render() {
        const logout_button = <Button variant='text'>Logout</Button>;
        return (
            <div className='options-container'>
                <Button variant='text'>About us</Button>
                <Button variant='text'>Home</Button>
                {this.state.loggedin && logout_button}
            </div>
        );
    }
}


export default class Footer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {loggedin: props.loggedin}
    }

    render() {
        return (
            <div className='footer-container'>
                <Options loggedin={this.state.loggedin} />
            </div>
        );
    }
}