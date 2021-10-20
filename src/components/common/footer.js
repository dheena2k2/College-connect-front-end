import React from 'react';
import './footer.css'
import Button from '@mui/material/Button'

class Options extends React.Component {
    constructor(props) {
        super(props)
    }

    goToHome() {
        window.location.href = '/'
    }

    render() {
        return (
            <div className='options-container'>
                <Button variant='text'>About us</Button>
                <Button variant='text' onClick={() => this.goToHome()}>Home</Button>
            </div>
        );
    }
}


export default class Footer extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className='footer-container'>
                <Options />
            </div>
        );
    }
}