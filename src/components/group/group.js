import  './group.css';
import Box from '@mui/material/Box';
import {Grid} from "@mui/material"
import { GroupPic } from '../common/common';
import { getSampleUsers } from '../common/stub';
import Typography from '@mui/material/Typography';
import { grey } from '@mui/material/colors';
import UserTable from "../users/usertable";

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
            <Grid container >
                <Grid item xs={12} style={{padding:"10px"}}>
                    <Typography variant="h5">Owners</Typography>
                </Grid>
                <Grid item xs={12}>
                    <UserTable/>
                </Grid>
            </Grid>
            <Grid container>
                <Grid item  style={{padding:"10px"}} >
                    <Typography variant="h5">Participants</Typography>
                </Grid>
                <Grid item xs={12}>
                    <UserTable/>
                </Grid>
            </Grid>
            
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