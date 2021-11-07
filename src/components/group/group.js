import  './group.css';
import Box from '@mui/material/Box';
import { GroupPic } from '../common/common';
import { getSampleUsers } from '../common/stub';
import Typography from '@mui/material/Typography';
import { grey } from '@mui/material/colors';


function GroupContents() {
    const description = 'Hello. This is test sentence. This is test sentence. This is test sentence. This is test sentence. This is test sentence. This is test sentence. This is test sentence. This is test sentence. This is test sentence. This is test sentence. This is test sentence. This is test sentence. This is test sentence.'
    return (
        <div className='group-innercontainer'>
            <Box
            sx={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
            }}>
                <GroupPic
                sx={{
                    height: '200px',
                    width: '200px'
                }}
                src='' />
            
            <Typography
            sx={{
                fontFamily: 'arvo',
                fontStyle: 'italic',
                fontWeight: 'bold',
                fontSize: '30px'
            }}>
                {'Group name'}
            </Typography>
            </Box>
            <Typography
            sx={{
                fontFamily: 'arvo',
                fontStyle: 'italic',
                color: grey[500]
            }}>
                {description}
            </Typography>
        </div>
    );
}


function Group() {
    return (
        <div className='group-container'>
            <GroupContents />
        </div>
    );
}


export default Group;