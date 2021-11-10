import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { grey } from '@mui/material/colors';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Divider from '@mui/material/Divider';
import ReactPlayer from 'react-player';
import ReactAudioPlayer from 'react-audio-player';
import Button from '@mui/material/Button';
import React from 'react';
import Chip from '@mui/material/Chip';
import Tooltip from '@mui/material/Tooltip';
import Box from '@mui/material/Box';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import { publishedPollPostDetails } from './stub';
import { deletepost } from '../../app/postSlice';
import {deletePost as deletePostCRUD} from "../../CRUD/deleteFunctions";
import { useDispatch } from 'react-redux';
import AttachFileIcon from '@mui/icons-material/AttachFile';


async function deletePost(postID,dispatch) {
    var sure = window.confirm('Are you sure you want to delete this post');
    console.log("delting this post",postID);
    var res = await deletePostCRUD(postID);
    if(res.data && res.data.post){
        dispatch(deletepost(postID));
    }

}


function publishPollResults(postId) {
    var sure = window.confirm('Confirm publish poll results')
}


function chooseOption(event, postId, value, setter) {
    if(value === null) {
        setter(event.target.id)
        console.log(postId + ',' + event.target.name)
    }
}


function stringifyList(content_list) {
    let content = ""
    for(var i=0; i<content_list.length; i+=1) {
        if(i==0)content += content_list[i].name;
        else
        content += ', ' + content_list[i].name;
    }

    return content
}


function dateToString(currentdate) {
    const datetime = currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear() + " @ "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes();
    
    return datetime
}


function PostContainer(props) {
    const currentUser = props.isCurrentUser
    const dispatch = useDispatch();
    return (
        <div className='post-container'>
            <div className='post-container-head'>
                <div className='user-space'>
                    <Avatar
                    sx={{
                        marginRight: '10px'
                    }}
                    src={props.ownerProfileUrl}
                    alt={props.ownerID} />
                    <Typography sx={{
                        fontWeight:"600",
                        fontSize:"1.5rem",
                        fontFamily: 'arvo'
                    }} >
                        {props.ownerID.charAt(0).toUpperCase() + props.ownerID.substr(1).toLowerCase()}
                    </Typography>
                </div>
                <div>
                    <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center'
                    }}>
                        {props.type === 'poll' &&
                        props.pollStatus === 'active' &&
                        currentUser &&
                        <Button
                        sx={{
                            marginRight: '10px'
                        }}
                        onClick={() => publishPollResults(props.ID)}
                        variant='text'>
                            Publish result
                        </Button>}
                        <Typography sx={{
                            fontSize: '10px',
                            fontStyle: 'italic',
                            color: grey[500]
                        }} >
                            {dateToString(new Date(props.createdTime))}
                        </Typography>
                        {currentUser &&
                        <IconButton
                        onClick={() => deletePost(props._id,dispatch)}>
                            <DeleteIcon />
                        </IconButton>}
                    </Box>
                </div>
            </div>
            <Divider
            flexItem
            sx={{
                marginTop: '10px'
            }} />
            <div className='post-children'>
                {props.children}
            </div>
            <Accordion
            sx={{
                width: '100%',
                marginTop: '10px'
            }}
            elevation='0'
            square >
                <AccordionSummary
                expandIcon={<ExpandMoreIcon />} >
                    <Typography sx={{
                        fontFamily: 'arvo'
                    }}>
                        Groups
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <div>
                        {props.groups.map(group=><Chip label={group.name}/>)}
                    </div>
                </AccordionDetails>
            </Accordion>
        </div>
    );
}


function PollOptions({postId, options, status}) {
    var chosenOption = null
    return <div></div>
    if(status === 'active') {
        let i = 0
        for(let key of Object.keys(options)) {
            if(options[key] > 0) {
                chosenOption = i.toString()
                console.log(key, ':', i)
                break
            }
            i += 1
        }
    }

    var optWithPer = {}
    if(status === 'published') {
        let total_votes = 0
        for(let key of Object.keys(options)) {
            total_votes += options[key]
        }
        for(let key of Object.keys(options)) {
            let percentage = 0
            percentage = (options[key]/total_votes) * 100
            percentage = total_votes === 0 ? 0 : Math.round(percentage)
            optWithPer[key] = percentage
        }
    }


    const [chosenOpt, setChosenOpt] = React.useState(chosenOption)
    return (
        <div className='poll-options'>
            {Object.keys(options).map((key, i) => (
                <div key={i}>
                    {status === 'active' &&
                    <Button
                    disabled={(i.toString() !== chosenOpt && chosenOpt !== null)}
                    onClick={(event) => chooseOption(event, postId, chosenOpt, setChosenOpt)}
                    fullWidth
                    id={i.toString()}
                    name={key}
                    variant='contained'>
                        {key}
                    </Button>}

                    {status === 'published' &&
                    <div className='poll-result'>
                    <Tooltip
                    title={options[key] + ' votes'}
                    placement='left'>
                        <Chip
                        label={(optWithPer[key] + '%')}
                        variant='outlined' />
                    </Tooltip>
                    <Typography sx={{
                        fontFamily: 'arvo',
                        marginLeft: '10px'
                    }}>
                        {key}
                    </Typography>
                    </div>
                    }
                </div>
            ))}
        </div>
    );
}


export function Post(props) {
    return (
        <PostContainer {...props} >
            <div className='post-innercontainer'>

            {props.type === 'image' &&
            <img width='100%' src={props.file_links[0]} alt='error' />}

            {props.type === 'video' &&
            <video width='100%' controls>
                <source src={props.file_links[0]} />
            </video>}

            {props.type === 'youtube' &&
            <ReactPlayer
            controls
            url={props.file_links[0]} />}

            {props.type === 'audio' &&
            <ReactAudioPlayer
            controls
            src={props.file_links[0]} />}

            <Typography sx={{
                fontFamily: 'arvo',
                color: grey[1000],
                fontStyle: 'italic',
                margin: '10px 5px'
            }}>
                {props.description}
            </Typography>

            {props.type === 'poll'&&
            <PollOptions
            postId={props._id}
            options={props.options}
            status={props.pollStatus} />}

            {props.type === 'files' &&
            <Box
            sx={{
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap'
            }}>
                {props.file_links.map((link, i) => (
                    <a key={i} href={link} target='blank'>
                    <Chip
                    sx={{
                        margin: '5px 5px 5px 5px'
                    }}
                    icon={<AttachFileIcon />}
                    label={'file '+(i+1)} /></a>
                ))}
            </Box>}
            </div>
        </PostContainer>
    );
}