import React from 'react';
import './footer.css'
import Button from '@mui/material/Button'
import { Link } from "react-router-dom";


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
                <Link to="/">Home</Link>
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