import React from 'react';
import './footer.css'
import Button from '@mui/material/Button'

class Options extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className='options-container'>
                <Button variant='text'>About us</Button>
                <Button variant='text'>Home</Button>
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