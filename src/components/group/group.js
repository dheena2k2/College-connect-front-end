import React from "react";
import {useLocation} from "react-router-dom";
import  './group.css';
import Box from '@mui/material/Box';
import {Grid} from "@mui/material"
import { GroupPic } from '../common/common';
import { getSampleUsers } from '../common/stub';
import Typography from '@mui/material/Typography';
import { grey } from '@mui/material/colors';
import UserTable from "../users/usertable";

function GroupContents() {
    const location = useLocation();
    const [group,setGroup] = React.useState(false);
    const [loading,setLoading] = React.useState(true);
    React.useEffect(()=>{
        var {pathname} = location;
        var arr = pathname.split("/");
        var id = arr.length && arr[arr.length-1];
        var getData =async()=>{
            
        }
        console.log(id);
    },[])
    const description = 'Hello. This is test sentence. This is test sentence. This is test sentence. This is test sentence. This is test sentence. This is test sentence. This is test sentence. This is test sentence. This is test sentence. This is test sentence. This is test sentence. This is test sentence. This is test sentence.'
    if(!group)return <div>Group does not exists</div>
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
                    <Typography sx={{fontFamily: 'arvo'}} variant="h5">Owners</Typography>
                </Grid>
                <Grid item xs={12}>
                    <UserTable/>
                </Grid>
            </Grid>
            <Grid container>
                <Grid item  style={{padding:"10px"}} >
                    <Typography sx={{fontFamily: 'arvo'}} variant="h5">Participants</Typography>
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