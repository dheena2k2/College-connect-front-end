import './profile.css'
import Typography from '@mui/material/Typography'
import { grey } from '@mui/material/colors'
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import EmailIcon from '@mui/icons-material/Email';
import Divider from '@mui/material/Divider';
import Avatar from '@mui/material/Avatar';
import CakeIcon from '@mui/icons-material/Cake';


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
    const description = 'My name is Monkey D Luffy and I am a Pirate. I became a rubber \
    man by eating Gum-Gum devil fruit. This makes me a devil fruit user whose body is \
    entirely made of rubber. My hobbie is eating. I will find One Piece treasure and \
    will become "The King of The Pirates".'
    const details = {
        name: 'Monkey D. Luffy',
        rollNo: 'CSE32412',
        email: 'luffy_like_meat@foo.bar',
        type: 'Student',
        admissionYear: '2019',
        branch: 'Computer Science',
        dob: new Date(1998, 4, 5, 0, 0, 0, 0),
        profileUrl: 'https://ih1.redbubble.net/image.2299745242.1024/mo,small,flatlay,product_square,600x600.jpg',
        description: description
    }

    return details;
}


function PrimaryInfo(props) {
    console.log(props)
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
                    fontStyle: 'bold'
                }} >
                    {props.name}
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
                    {props.description}
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
                        {getDateString(props.dob)}
                    </Typography>
                </div>
            </div>
        </div>
    );
}


function Profile() {
    const details = getUserDetails()
    console.log('in profile')
    return (
        <div className='profile-container'>
            <h1 className='profile-title'>
                User Profile
            </h1>
            <div className='profile-subcontainer'>
                <PrimaryInfo {...details} />
            </div>
        </div>
    );
}


export default Profile;
