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


function chooseOption(event, postId, value, setter) {
    if(value === null) {
        setter(event.target.id)
        console.log(postId + ',' + event.target.name)
    }
}


function stringifyList(content_list) {
    let content = content_list[0]
    for(var i=1; i<content_list.length; i+=1) {
        content += ', ' + content_list[i]
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
    return (
        <div className='post-container'>
            <div className='post-container-head'>
                <div className='user-space'>
                    <Avatar
                    sx={{
                        marginRight: '10px'
                    }}
                    src={props.ownerProfileUrl}
                    alt={props.ownerId} />
                    <Typography sx={{
                        fontStyle: 'italic',
                        fontFamily: 'arvo'
                    }} >
                        {props.ownerID}
                    </Typography>
                </div>
                <div>
                    <Typography sx={{
                        fontSize: '10px',
                        fontStyle: 'italic',
                        color: grey[500]
                    }} >
                        {dateToString(props.createdTime)}
                    </Typography>
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
                    <Typography sx={{
                        fontFamily: 'arvo'
                    }}>
                        {stringifyList(props.groups)}
                    </Typography>
                </AccordionDetails>
            </Accordion>
        </div>
    );
}


function PollOptions({postId, options, status}) {
    var chosenOption = null
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
                color: grey[500],
                fontStyle: 'italic',
                marginTop: '20px'
            }}>
                {props.description}
            </Typography>

            {props.type === 'poll'&&
            <PollOptions
            postId={props.ID}
            options={props.options}
            status={props.pollStatus} />}
            </div>
        </PostContainer>
    );
}