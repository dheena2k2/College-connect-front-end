import './mygroups.css';
import { GroupPic } from '../common/common';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { grey } from '@mui/material/colors';
import { Link } from 'react-router-dom';


function GroupCell() {
    const profileUrl = ''
    const groupId = 'sample1'
    const groupName = 'Sample Group'
    const description = 'This is sample. This is sample. This is sample. This is sample. This is sample. This is sample. This is sample. This is sample. This is sample. This is sample.'

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
                component={Link} to='group'>
                    {'ID: ' + groupId}
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
            </Box>
        </div>
    );
}


function MyGroups() {
    return (
        <div className='mygroups-container'>
            <GroupCell />
        </div>
    );
}


export default MyGroups;