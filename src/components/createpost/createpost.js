import './createpost.css';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Button from '@mui/material/Button';
import React from 'react';
import UploadIcon from '@mui/icons-material/Upload';
import Dialog from '@mui/material/Dialog';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import ReactPlayer from 'react-player';
import ReactAudioPlayer from 'react-audio-player';
import ImageIcon from '@mui/icons-material/Image';
import AudiotrackIcon from '@mui/icons-material/Audiotrack';
import VideocamIcon from '@mui/icons-material/Videocam';
import YouTubeIcon from '@mui/icons-material/YouTube';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import { grey } from '@mui/material/colors'


function FilePreview({type, finalUrl}) {
    return (
        <div className='createpost-file-review'>

            {type === 'image' && finalUrl === '' &&
            <ImageIcon sx={{color: grey[500], fontSize: 100}} />}
            
            {type === 'audio' && finalUrl === '' &&
            <AudiotrackIcon sx={{color: grey[500], fontSize: 100}} />}
            
            {type === 'video' && finalUrl === '' &&
            <VideocamIcon sx={{color: grey[500], fontSize: 100}} />}
            
            {type === 'youtube' && finalUrl === '' &&
            <YouTubeIcon sx={{color: grey[500], fontSize: 100}} />}
            
            {type === 'files' && finalUrl === '' &&
            <FileCopyIcon sx={{color: grey[500], fontSize: 100}} />}

            
            
            {type === 'image' && finalUrl !== '' &&
            <img width='100%' src={finalUrl} alt='error' />}

            {type === 'video' && finalUrl !== '' &&
            <video width='100%' controls>
                <source src={finalUrl} />
            </video>}

            {type === 'youtube' && finalUrl !== '' &&
            <ReactPlayer
            controls
            url={finalUrl} />}

            {type === 'audio' && finalUrl !== '' &&
            <ReactAudioPlayer
            controls
            src={finalUrl} />}

        </div>
    );
}


function UploadDialog(props) {
    const { open, onClose } = props
    const [postType, setPostType] = React.useState('image')
    const [finalUrl, setFinalUrl] = React.useState('')
    const [tempUrl, setTempUrl] = React.useState('')

    const entryChange = (event) => {
        setFinalUrl(event.target.value)
    }

    const typeChange = (event, newVal) => {
        setFinalUrl('')
        setTempUrl('')
        setPostType(newVal)
    }

    return (
        <Dialog
        fullWidth
        maxWidth='md'
        onClose={onClose}
        open={open} >
            <Box>
            <TabContext value={postType}>
                <Box
                sx={{
                    borderBottom: 1,
                    borderColor: 'divider',
                }}>
                    <TabList onChange={typeChange}>
                        <Tab label='Image' value='image' />
                        <Tab label='Audio' value='audio' />
                        <Tab label='Video' value='video' />
                        <Tab label='YouTube' value='youtube' />
                        <Tab label='Multiple files' value='files' />
                    </TabList>
                </Box>
                <Box
                sx={{
                    width: '100%',
                    height: '480px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                }}>
                    <FilePreview type={postType} finalUrl={finalUrl} />

                    <div className='createpost-upload-bar'>
                        {postType !== 'files' &&
                        <TextField
                        sx={{
                            width: '70%'
                        }}
                        value={tempUrl}
                        onChange={(event) => setTempUrl(event.target.value)}
                        onBlur={entryChange}
                        label='URL' />}

                        {postType !== 'youtube' && postType !== 'files' &&
                        <Typography
                        sx={{
                            fontFamily: 'arvo',
                            fontWeight: 'bold'
                        }}>
                            OR
                        </Typography>}

                        {postType !== 'youtube' &&
                        <Button
                        variant='contained'
                        endIcon={<UploadIcon />}>
                            Upload
                        </Button>}

                        <Button
                        variant='contained' >
                            Done
                        </Button>

                    </div>
                </Box>
            </TabContext>
            </Box>
        </Dialog>
    );
}


function CreatePostEntry() {
    const [postType, setPostType] = React.useState('multimedia')
    const [optionNos, setOptionNos] = React.useState(0)
    const [pollOptions, setPollOptions] = React.useState([''])
    const [focusNew, setFocusNew] = React.useState(false)
    const [dialogOpen, setDialogOpen] = React.useState(false)

    const openDialog = () => {
        setDialogOpen(true)
    }

    const onDialogClose = () => {
        setDialogOpen(false)
    }

    const entryChange = (event, byEnterPress) => {
        let currEntry = parseInt(event.target.id, 10)
        let valueIn = event.target.value
        valueIn = valueIn.replace('/\s+/g', ' ').trim()
        if(valueIn.length > 0) {
            let temp = [...pollOptions]
            temp[currEntry] = valueIn
            if(currEntry === optionNos) {
                temp[currEntry+1] = ''
                setOptionNos(optionNos+1)
                setFocusNew(byEnterPress)
            }
            else {
                setFocusNew(false)
            }
            setPollOptions(temp)
        }
        else {
            let temp = [...pollOptions]
            temp[currEntry] = valueIn
            if(currEntry !== optionNos) {
                temp.splice(currEntry, 1)
                setOptionNos(optionNos-1)
                setPollOptions(temp)
            }
        }
    }

    const keyPress = (event) => {
        if(event.key === 'Enter') {
            entryChange(event, true)
        }
    }

    const valChange = (event) => {
        let currEntry = parseInt(event.target.id, 10)
        let temp = [...pollOptions]
        temp[currEntry] = event.target.value
        setPollOptions(temp)
    }

    let pollEntries = []
    for(let i=0; i<optionNos+1; i++) {
        let auto_focus = false

        if(i === optionNos) {
            if(focusNew) {
                auto_focus = true
            }
        }

        pollEntries[i] = (
            <TextField
            sx={{
                marginTop: '10px',
                marginBottom: '10px'
            }}
            autoFocus={auto_focus}
            onBlur={(event) => entryChange(event, false)}
            onKeyDown={keyPress}
            onChange={valChange}
            value={pollOptions[i]}
            label={'Option '+(i+1)}
            id={i.toString()}
            variant='outlined' />
        )
    }

    return (
        <div className='createpost-innercontainer'>
            <TextField
            fullWidth
            multiline
            minRows={5}
            label='Description'
            variant='outlined' />
            <div className='createpost-posttype'>
                <Typography
                sx={{
                    fontFamily: 'arvo',
                    fontWeight: 'bold'
                }}>
                    Post type:
                </Typography>
                <div>
                    <RadioGroup
                    row
                    defaultValue='multimedia'
                    onChange={(event) => setPostType(event.target.value)}>

                        <FormControlLabel
                        value='multimedia'
                        control={<Radio />}
                        label={
                            <Typography
                            sx={{
                                fontFamily: 'arvo',
                            }}>
                                multimedia
                            </Typography>
                        } />

                        <FormControlLabel
                        value='poll'
                        control={<Radio />}
                        label={
                            <Typography
                            sx={{
                                fontFamily: 'arvo',
                            }}>
                                poll
                            </Typography>
                        } />

                    </RadioGroup>
                </div>
            </div>
            <div>

                {postType === 'multimedia' &&
                <>
                <Typography
                sx={{
                    fontFamily: 'arvo',
                    fontWeight: 'bold'
                }}>
                    Choose files to upload (optional):
                </Typography>
                <Button
                sx={{
                    marginTop: '10px',
                    marginBottom: '10px'
                }}
                onClick={openDialog}
                variant='outlined'
                startIcon={<AttachFileIcon />} >
                    Attachment
                </Button>
                <UploadDialog
                open={dialogOpen}
                onClose={onDialogClose} />
                </>}

                {postType === 'poll' &&
                <>
                <Typography
                sx={{
                    fontFamily: 'arvo',
                    fontWeight: 'bold'
                }}>
                    Enter at least two options:
                </Typography>
                {
                    pollEntries.map((entry, i) => (
                        <div key={i}>
                            {entry}
                        </div>
                    ))
                }
                </>}

            </div>
        </div>
    );
}


function CreatePost() {
    return (
        <div className='createpost-container'>
            <CreatePostEntry />
        </div>
    );
}


export default CreatePost;