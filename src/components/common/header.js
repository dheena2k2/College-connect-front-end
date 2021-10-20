import React from 'react';
import './header.css';
import { green } from '@mui/material/colors';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { ListItemIcon, Divider } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EditIcon from '@mui/icons-material/Edit';
import GroupsIcon from '@mui/icons-material/Groups';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import LogoutIcon from '@mui/icons-material/Logout';
import { useCookies } from 'react-cookie';


function viewProfile() {
    console.log('Clicked View profile')
}

function editProfile() {
    console.log('Clicked Edit profile')
}

function myGroups() {
    console.log('Clicked My groups')
}

function searchUsers() {
    console.log('Clicked Search users')
}

function onLogout(setCookie) {
    setCookie('isLoggedin', false, {path: '/'})
    window.location.href = '/login'
}


function Options(props) {
    const [ , setCookie] = useCookies(['isLoggedin'])
    return (
        <Menu
        anchorEl={props.anchorEl}
        open={props.open}
        onClose={props.onClose}
        onClick={props.onClick}
        PaperProps={props.PaperProps}
        transformOrigin={props.transformOrigin}
        anchorOrigin={props.anchorOrigin} >
            <MenuItem onClick={viewProfile}>
                <ListItemIcon>
                    <AccountCircleIcon />
                </ListItemIcon>
                Profile
            </MenuItem>
            <MenuItem onClick={editProfile}>
                <ListItemIcon>
                    <EditIcon />
                </ListItemIcon>
                Edit profile
            </MenuItem>
            <MenuItem onClick={myGroups}>
                <ListItemIcon>
                    <GroupsIcon />
                </ListItemIcon>
                My Groups
            </MenuItem>
            <MenuItem onClick={searchUsers}>
                <ListItemIcon>
                    <PersonSearchIcon />
                </ListItemIcon>
                Search users
            </MenuItem>
            <Divider />
            <MenuItem onClick={() => onLogout(setCookie)}>
                <ListItemIcon>
                    <LogoutIcon />
                </ListItemIcon>
                Logout
            </MenuItem>
        </Menu>
    );
}


function Logo() {
    return (
        <div className='header-logo-container'>
            <span className='logo-p1'>College</span><span className='logo-p2'>Connect</span>
        </div>
    );
}


export default function Header(props) {
    const [anchorEl, setAnchorEl] = React.useState(null)
    const open = Boolean(anchorEl)
    const handleClick = (event) => { setAnchorEl(event.currentTarget) }
    const handleClose = () => { setAnchorEl(null) }
    const loggedin = props.loggedin

    return (
        <>
        <div className='header-container'>
            <Logo />
            {loggedin && <IconButton
            onClick={handleClick}
            sx={{ color: green[50] }} >
                <AccountCircleIcon
                fontSize='large'
                sx={{ color: green[300] }} />
            </IconButton>}
        </div>
        {loggedin && <Options
        anchorEl={anchorEl}
        open={open}
        onClick={handleClose}
        onClose={handleClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }} />}
        </>
    );
}