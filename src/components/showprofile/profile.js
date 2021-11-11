import './profile.css'
import Typography from '@mui/material/Typography'
import { grey } from '@mui/material/colors'
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import EmailIcon from '@mui/icons-material/Email';
import Divider from '@mui/material/Divider';
import Avatar from '@mui/material/Avatar';
import CakeIcon from '@mui/icons-material/Cake';
import {Link} from "react-router-dom";
import {useSelector} from "react-redux"
import React from 'react';
import {useLocation} from "react-router-dom";
import {Box,Button} from '@mui/material'

function getDateString(d) {
    const month_name = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
    ]

    return (d.getDate() + ' ' + month_name[d.getMonth()] + ', ' + d.getFullYear());
}


function getUserDetails() {
    const description = '' /*'My name is Monkey D Luffy and I am a Pirate. I became a rubber \
    man by eating Gum-Gum devil fruit. This makes me a devil fruit user whose body is \
    entirely made of rubber. My hobbie is eating. I will find One Piece treasure and \
    will become "The King of The Pirates".'*/
    const details = {
        name: 'Monkey D. Luffy',
        rollNo: 'CSE32412',
        email: 'luffy_like_meat@foo.bar',
        type: 'Student',
        admissionYear: '2019',
        branch: 'Computer Science',
        dob: new Date(1998, 4, 5, 0, 0, 0, 0),
        profileUrl: 'https://i1.sndcdn.com/avatars-UidYWfW20bjki8Ub-GJKpBQ-t500x500.jpg',
        description: description
    }

    return details;
}


function PrimaryInfo(props) {
    var description = props.description
    if(props.isCurrentUser && description === '') {
        description = '(Enter your profile description in the edit profile option, this message is not visible to other users)'
    }
    return (
        <div className='profile-primaryinfo-container'>
            <div>
                <Avatar
                sx={{
                    width: '200px',
                    height: '200px',
                }}
                src={props.profileUrl}
                alt={props.name} />
            </div>
            <div className='profile-primaryinfo-subcontainer'>
                <Typography
                sx={{
                    fontSize: 20,
                    color: grey[500],
                    fontStyle: 'italic'
                }} >
                    {props.type}
                </Typography>
                <Typography
                sx={{
                    fontSize: 40,
                    fontFamily: 'garamond',
                    fontStyle: 'bold',
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'flex-end'
                }} >
                    {props.name}
                    <Typography
                    sx={{
                        fontFamily: 'arvo',
                        color: grey[500],
                        fontSize: '15px',
                        fontStyle: 'italic',
                        marginBottom: '10px',
                        marginLeft: '5px'
                    }}>
                        {'(' + props.username + ')'}
                    </Typography>
                </Typography>
                <Typography
                sx={{
                    fontSize: 20,
                    color: grey[500],
                    fontStyle: 'italic',
                    paddingBottom: '10px'
                }} >
                    {props.branch}
                </Typography>
                <div className='profile-column-container'>
                    <div>
                        <AccountBoxIcon />
                        <Typography
                        sx={{
                            fontStyle: 'italic'
                        }} >
                            {props.rollNo}
                        </Typography>
                    </div>
                    <div>
                        <EmailIcon />
                        <Typography
                        sx={{
                            fontStyle: 'italic'
                        }} >
                            {props.email}
                        </Typography>
                    </div>
                </div>
                <Typography
                sx={{
                    color: grey[500],
                    fontStyle: 'italic',
                    paddingLeft: '20px',
                    paddingTop: '20px',
                    paddingBottom: '20px'
                }} >
                    {description}
                </Typography>
                <Divider flexItem={true} />
                <Typography
                sx={{
                    fontStyle: 'italic',
                    paddingTop: '20px'
                }} >
                    {'Joined the institution at ' + props.admissionYear}
                </Typography>
                <div
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                }} >
                    <CakeIcon />
                    <Typography
                    sx={{
                        fontStyle: 'italic',
                        paddingLeft: '10px',
                        paddingTop: '10px'
                    }} >
                        {props.dob && getDateString(new Date(props.dob))}
                    </Typography>
                </div>
                {props.isCurrentUser &&
                <Button 
                    variant="contained" 
                    style={{display:"block",marginLeft:"auto",marginRight:"0"}}
                    component={Link}
                    to={`/editprofile`}
                >
                        edit profile
                </Button>}
            </div>
        </div>
    );
}


function Profile(props) {
    const location = useLocation()
    const currUser = useSelector(state=>state.user.user);
    const users = useSelector(state=>state.contacts.users);
    const [details, setDetails] = React.useState(null);
    let isCurrentUser = false
    React.useEffect(()=>{
        var {pathname} = location;
        var arr = pathname.split("/");
        var id = arr.length && arr[arr.length-1];
        for(var user of users){
            if(user._id==id){
                setDetails(user);
            }
        }
    },[])

    if(details === null) {
        return (
            <div>User does not exists</div>
        );
    }
    if(currUser._id === details._id) {
        isCurrentUser = true
    }

    const dispDetails = isCurrentUser ? currUser : details

    return (
        <div className='profile-container'>
            <Typography variant="h3" style={{margin:"20px",fontFamily:"arvo",fontWeight:"800"}}>User Profile</Typography>
            <div className='profile-subcontainer'>
                <PrimaryInfo isCurrentUser={isCurrentUser} {...dispDetails} />
            </div>
        </div>
    );
}


export default Profile;
