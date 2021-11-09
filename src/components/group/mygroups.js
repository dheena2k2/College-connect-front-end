import './mygroups.css';
import { GroupPic } from '../common/common';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { grey } from '@mui/material/colors';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Button,Chip } from '@mui/material';


function GroupCell({group}) {
    const profileUrl = group.profileUrl;
    const groupID = group._id;
    const groupName = group.name;
    const description = group.description;
    const owners = group.owners;
    const visibleTo = group.visibleTo;
    return (
        <div className='mygroups-innercontainer'>
            <GroupPic
            sx={{
                height: '200px',
                width: '200px'
            }}
            src={profileUrl} />
            <Box
            sx={{
                marginLeft: '20px',
                height: '100%'
            }}>
                <Typography
                sx={{
                    fontFamily: 'arvo',
                    fontStyle: 'italic',
                    fontWeight: 'bold',
                    fontSize: '30px'
                }}>
                    {groupName}
                </Typography>
                <Typography
                sx={{
                    fontFamily: 'arvo',
                    fontStyle: 'italic',
                    color: grey[700],
                    fontSize: '15px'
                }}
                component={Link} to={'group/' + groupId}>
                    {'view group'}
                </Typography>
                <Typography
                sx={{
                    fontFamily: 'arvo',
                    fontStyle: 'italic',
                    color: grey[500],
                    marginTop: '10px'
                }}>
                    {description}
                </Typography>
                <Box style={{marginTop:"5px"}}>
                    <Typography style={{fontFamily:"arvo",fontWeight:"bolder",fontStyle: 'italic',}}>Owners</Typography>
                   {owners.map((owner)=><Chip label={owner.name} key={owner._id}/>)}
                       
                </Box>
                <Box style={{marginTop:"5px"}}>
                    <Typography style={{fontFamily:"arvo",fontWeight:"bolder",fontStyle: 'italic',}}>Participants</Typography>
                   {visibleTo.map((owner)=><Chip label={owner.name} key={owner._id}/>)}
                       
                </Box>
            </Box>
            <Button 
                variant="contained" 
                style={{display:"block",marginLeft:"auto",marginRight:"0"}}
                component={Link}
                to={`/editgroup/${groupID}`}
            >
                    edit group
            </Button>
        </div>
    );
}


function MyGroups() {
    const groups = useSelector(state=>state.contacts.groups);
    return (
        <div className='mygroups-container'>
            <Typography variant="h3" align="center" style={{margin:"20px",fontFamily:"arvo",fontWeight:"700"}}>My groups</Typography>
            {groups.map((group)=><GroupCell key={group._id} group={group}/>)}
            
        </div>
    );
}


export default MyGroups;