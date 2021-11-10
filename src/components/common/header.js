import React from 'react';
import './header.css';
import { green } from '@mui/material/colors';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { ListItemIcon, Divider } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EditIcon from '@mui/icons-material/Edit';
import GroupsIcon from '@mui/icons-material/Groups';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import LogoutIcon from '@mui/icons-material/Logout';
import { useCookies } from 'react-cookie';
import { Link } from "react-router-dom";
import {getPosts,getGroups,getUsers} from '../../CRUD/readFunctions';
import { useDispatch } from 'react-redux';
import { setgroups, setusers } from '../../app/contactSlice';
import { setposts } from '../../app/postSlice';
import {useSelector} from "react-redux"
import {logout} from "../../CRUD/authFunctions";

async function onLogout(setCookie) {
    var res = await logout();
    console.log(res);
    window.location.href = '/login';
    console.log("called");
}


function Options(props) {
    const currUser = useSelector(state=>state.user.user);
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
            <MenuItem component={Link} to='/'>
                <ListItemIcon>
                    <HomeIcon />
                </ListItemIcon>
                Home
            </MenuItem>
            <MenuItem component={Link} to={'/profile/'+currUser._id}>
                <ListItemIcon>
                    <AccountCircleIcon />
                </ListItemIcon>
                Profile
            </MenuItem>
            <MenuItem component={Link} to='/editprofile'>
                <ListItemIcon>
                    <EditIcon />
                </ListItemIcon>
                Edit profile
            </MenuItem>
            <MenuItem component={Link} to='/mygroups'>
                <ListItemIcon>
                    <GroupsIcon />
                </ListItemIcon>
                My Groups
            </MenuItem>
            <MenuItem component={Link} to='/creategroup'>
                <ListItemIcon>
                    <GroupsIcon />
                </ListItemIcon>
                Create group
            </MenuItem>
            <MenuItem component={Link} to='/users'>
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
    const dispatch = useDispatch();
    React.useEffect(()=>{
        var initializestates = async ()=>{
            var users = await getUsers();
            users.data && users.data.users && dispatch(setusers(users.data.users));
            var posts = await getPosts();
            posts.data && posts.data.posts && dispatch(setposts(posts.data.posts));
            var groups = await getGroups();
            groups.data && groups.data.groups && dispatch(setgroups(groups.data.groups));
        }

        initializestates();
    },[])

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