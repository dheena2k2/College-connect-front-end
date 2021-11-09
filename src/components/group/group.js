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
import { useSelector } from "react-redux";

function GroupContents() {
    const location = useLocation();
    const [group,setGroup] = React.useState(false);
    const groups = useSelector(state=>state.contacts.groups);
    const [loading,setLoading] = React.useState(true);
    React.useEffect(()=>{
        var {pathname} = location;
        var arr = pathname.split("/");
        var id = arr.length && arr[arr.length-1];
        for(var group of groups){
            if(group._id==id){
                setGroup(group);
            }
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
                src={group && group.profileUrl} />
            
            <Typography
            sx={{
                fontFamily: 'arvo',
                fontStyle: 'italic',
                fontWeight: 'bold',
                fontSize: '30px'
            }}>
                {group && group.name}
            </Typography>
            </Box>
            <Typography
            sx={{
                fontFamily: 'arvo',
                fontStyle: 'italic',
                color: grey[500]
            }}>
                {group && group.description}
            </Typography>
            <Grid container >
                <Grid item xs={12} style={{padding:"10px"}}>
                    <Typography sx={{fontFamily: 'arvo'}} variant="h5">Owners</Typography>
                </Grid>
                <Grid item xs={12}>
                    <UserTable users={group && group.owners}/>
                </Grid>
            </Grid>
            <Grid container>
                <Grid item  style={{padding:"10px"}} >
                    <Typography sx={{fontFamily: 'arvo'}} variant="h5">Participants</Typography>
                </Grid>
                <Grid item xs={12}>
                    <UserTable users={group && group.visibleTo}/>
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