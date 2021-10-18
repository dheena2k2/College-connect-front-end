import './header.css';
import { green } from '@mui/material/colors'
import IconButton from '@mui/material/IconButton';
import ListIcon from '@mui/icons-material/List';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';


function Logo() {
    return (
        <div className='header-logo-container'>
            <span className='logo-p1'>College</span><span className='logo-p2'>Connect</span>
        </div>
    );
}


export default function Header() {
    return (
        <div className='header-container'>
            <Logo />
            <IconButton
            sx={{ color: green[50] }} >
                <AccountCircleIcon
                fontSize='large'
                sx={{ color: green[300] }} />
            </IconButton>
        </div>
    );
}