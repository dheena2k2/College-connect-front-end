import React from 'react';
import "../editprofile/editprofile.css";
import Avatar from '@mui/material/Avatar';
import DateAdapter from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import TextField from '@mui/material/TextField';
import Badge from '@mui/material/Badge'
import UploadIcon from '@mui/icons-material/Upload';
import IconButton from '@mui/material/IconButton'
import {Button,Grid,Typography,FormControl,InputLabel,Select,Chip,OutlinedInput,Box,MenuItem} from '@mui/material';
import { uploadFiles } from '../../storage';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../../CRUD/updateFunction'; 
import { addgroup, updategroup} from '../../app/contactSlice';
import UserTable from "../users/usertable";
import {createGroup} from "../../CRUD/createFunctions";
import { getGroup } from '../../CRUD/readFunctions';
import { useLocation } from 'react-router';
import {updateGroup} from "../../CRUD/updateFunction"

function getUserByID(userID,users){
    for(var user of users){
        if(user._id==userID){
            return user;
        }
    }

}

function getIDarray(arr){
    var ids=[]
    for(var obj of arr){
        ids.push(obj._id);
    }
    return ids;
}

export default function CreateGroup({groupID}){
    const dispatch = useDispatch();
    const users = useSelector(state=>state.contacts.users);
    const groups = useSelector(state=>state.contacts.groups);
    const location = useLocation();
    const [details,setDetails] = React.useState({
        name:"",
        profileUrl:"",
        description:"",
        owners:[],
        visibleTo:[],
    })
    const [mode,setMode] = React.useState("create");
    React.useEffect(()=>{
        var {pathname} = location;
        var arr = pathname.split("/");
        var id = arr.length && arr[arr.length-1];
        if(id!="creategroup"){
            for(var group of groups){
                if(group._id==id){
                    setMode('edit');
                    setDetails({...group,owners:getIDarray(group.owners),visibleTo:getIDarray(group.visibleTo)});
                }
            }
        }
    },[groups])
    
    const handleChangeValue = (e) => {
        var ngrp = {...details,[e.target.name]:e.target.value};
        setDetails(ngrp);
    }
    const hanldleFile = ()=>{
        document.getElementById("prof-img").click();

    }
    const handleFileUpload = async (e) => {
        if(e.target.files.length>0){
            var result = await uploadFiles(e.target.files);
            handleChangeValue({target:{
                name:"profileUrl",
                value:result[0]
            }})
        }
    }
    const handleSave = async()=>{
        console.log(details);

        var res;
        if(mode=="create"){
            res =await createGroup(details);
            if(res.data && res.data.group){
                dispatch(addgroup(res.data.group));
            }
        }
        else{
            res =await updateGroup(details);
            if(res.data && res.data.group){
                dispatch(updategroup(res.data.group));
            }
            console.log(res,details);
        }
        
    }
    React.useEffect(()=>{

    },[])
    return (
        <Grid container alignContent='center' justifyContent="center" alignItems="center" style={{padding:"20px 250px"}}>
            <Grid item xs={12}>
            <Typography variant="h3" align="center" style={{margin:"20px",fontFamily:"arvo",fontWeight:"800"}}>{mode=="create"?"Create":"Edit"} Group</Typography>
            </Grid>
            <input 
                type="file" 
                id="prof-img" 
                accept="image/*" 
                style={{display:"none"}} 
                onChange={handleFileUpload}
            />
            <Badge
            overlap='circular'
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            sx={{
                marginRight: '30px'
            }}
            badgeContent={
                <IconButton>
                <Avatar
                children={<UploadIcon onClick={hanldleFile} />}
                alt='Upload' /></IconButton>
            } >
                <Avatar
                sx={{
                    width: '200px',
                    height: '200px',
                }}
                src={details.profileUrl}
                alt={details.name} />
            </Badge>
            <Grid item container xs={12} alignContent="center" justifyContent="center" alignItems="center">
                <Grid container xs={12} alignContent="center" justifyContent="center" alignItems="center">
                    <TextField
                        label={"Group name"}
                        name={"name"}
                        value={details.name}
                        onChange={handleChangeValue}
                        style={{margin:"20px"}}
                        fullWidth
                    />
                </Grid>
                <Grid container xs={12} alignContent="center" justifyContent="center" alignItems="center">
                    <TextField
                        label={"description"}
                        name={"description"}
                        value={details.description}
                        onChange={handleChangeValue}
                        style={{margin:"20px"}}
                        fullWidth
                    />
                </Grid>
                <Grid container xs={12} alignContent="center" justifyContent="center" alignItems="center">
                    <FormControl style={{margin:"20px"}} fullWidth>
                        <InputLabel id="owners-label">Owners</InputLabel>
                        <Select
                            labelId="owners-label"
                            name="owners"
                            multiple
                            value={details.owners}
                            fullWidth
                            onChange={handleChangeValue}
                            input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                            renderValue={(selected) => (
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                {selected.map((value) => (
                                    <Chip key={value} label={getUserByID(value,users).name} />
                                ))}
                                </Box>
                            )}
                            >
                        {users.map((owner) => (
                            <MenuItem
                            key={owner.name}
                            value={owner._id}
                            >
                            {owner.name}
                            </MenuItem>
                        ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid container xs={12} alignContent="center" justifyContent="center" alignItems="center">
                    <FormControl style={{margin:"20px"}} fullWidth>
                        <InputLabel id="visibleTo-label">Participants</InputLabel>
                        <Select
                            labelId="visibleTo-label"
                            name="visibleTo"
                            multiple
                            fullWidth
                            value={details.visibleTo}
                            onChange={handleChangeValue}
                            input={<OutlinedInput id="select-visibleTo-chip" label="Chip" />}
                            renderValue={(selected) => (
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                {selected.map((value) => (
                                    <Chip key={value} label={getUserByID(value,users).name} />
                                ))}
                                </Box>
                            )}
                            >
                        {users.map((owner) => (
                            <MenuItem
                            key={owner.name}
                            value={owner._id}
                            >
                            {owner.name}
                            </MenuItem>
                        ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Button
                    onClick={handleSave}
                    variant='contained'
                    sx={{
                        width: '30%',
                        marginTop: '30px',
                        marginLeft: '70%'
                    }} >
                    Save Changes
                </Button>
            </Grid>
        </Grid>
    );
    
}