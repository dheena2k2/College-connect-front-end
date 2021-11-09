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
import { TabContext, TabList } from '@mui/lab';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import ReactPlayer from 'react-player';
import ReactAudioPlayer from 'react-audio-player';
import ImageIcon from '@mui/icons-material/Image';
import AudiotrackIcon from '@mui/icons-material/Audiotrack';
import VideocamIcon from '@mui/icons-material/Videocam';
import YouTubeIcon from '@mui/icons-material/YouTube';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import { grey } from '@mui/material/colors';
import Chip from '@mui/material/Chip';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DialogTitle from '@mui/material/DialogTitle';
import { useFilePicker } from 'use-file-picker';
import {useSelector,useDispatch} from "react-redux"
import {addpost} from "../../app/postSlice"
import {createPost} from "../../CRUD/createFunctions"; 
import { uploadFiles } from '../../storage'
import LinearProgress from '@mui/material/LinearProgress';


function getGroups() {
    const groups = [
        'College',
        'Batch 19',
        'Computer Science',
        'Coding club',
        'C',
        'C++',
        'JAVA',
        'Python',
        'Java Script',
        'React JS',
        'Material-UI',
        'Web Development',
        'Competition',
        'Cultural club',
        'Dhruva'
    ]
    return groups;
}


function FilePreview({type, finalUrl, onRemoveAttachment, isUploading}) {
    React.useEffect(()=>{
        console.log("loading",isUploading)
    },[isUploading])
    return (
        <div className='createpost-file-review'>

            {isUploading &&
            <Box sx={{ width: '700px' }}>
                <LinearProgress />
            </Box>}

            {type === 'image' && finalUrl === '' && !isUploading &&
            <ImageIcon sx={{color: grey[500], fontSize: 100}} />}
            
            {type === 'audio' && finalUrl === '' && !isUploading &&
            <AudiotrackIcon sx={{color: grey[500], fontSize: 100}} />}
            
            {type === 'video' && finalUrl === '' && !isUploading &&
            <VideocamIcon sx={{color: grey[500], fontSize: 100}} />}
            
            {type === 'youtube' && finalUrl === '' && !isUploading &&
            <YouTubeIcon sx={{color: grey[500], fontSize: 100}} />}
            
            {type === 'files' && finalUrl === '' && !isUploading &&
            <FileCopyIcon sx={{color: grey[500], fontSize: 100}} />}

            
            
            {type === 'image' && finalUrl !== '' && !isUploading &&
            <Box
            sx={{
                width: '800px',
                height: '350px',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <img className='createpost-img' src={finalUrl} alt='error' />
            </Box>}

            {type === 'video' && finalUrl !== '' && !isUploading &&
            <video width='100%' controls>
                <source src={finalUrl} />
            </video>}

            {type === 'youtube' && finalUrl !== '' && !isUploading &&
            <ReactPlayer
            controls
            url={finalUrl} />}

            {type === 'audio' && finalUrl !== '' && !isUploading &&
            <ReactAudioPlayer
            controls
            src={finalUrl} />}

            {type === 'files' && finalUrl !== '' && !isUploading &&
            <Typography
            sx={{
                fontFamily: 'arvo',
                fontWeight: 'bold',
                fontSize: '20px',
                display: 'flex',
                flexDirection: 'column',
                alignItem: 'center'
            }}>
                Files Uploaded
                <Button
                onClick={onRemoveAttachment}
                variant='text'>
                    Remove files
                </Button>
            </Typography>}

        </div>
    );
}


function UploadDialog(props) {
    const { open, onClose } = props
    const [postType, setPostType] = React.useState('image')
    const [finalUrl, setFinalUrl] = React.useState('')
    const [tempUrl, setTempUrl] = React.useState('')
    const [allowMultiple, setAllowMultiple] = React.useState(false)
    const fileType = postType !== 'file' ? postType+'/*' : '*'
    const [fileUrls, setFileUrls] = React.useState([])
    const [isUploading, setIsUploading] = React.useState(false)

    React.useEffect(()=>{
        if(props.open && props.fileLinks.length > 0) {
            setFinalUrl(props.fileLinks[0])
            setTempUrl(props.fileLinks[0])
            setFileUrls(props.fileLinks)
        }
    },[props.open])

    const entryChange = (event) => {
        setFinalUrl(event.target.value)
        if(event.target.value.length > 0)
            setFileUrls([event.target.value])
        else
            setFileUrls([])
    }

    const typeChange = (event, newVal) => {
        setAllowMultiple(false)
        if(newVal === 'files') {
            setAllowMultiple(true)
        }
        setFinalUrl('')
        setTempUrl('')
        setPostType(newVal)
        setFileUrls([])
    }

    const selectFiles = () => {
        document.getElementById('upload-in').click()
    }

    const removeAttachments = () => {
        setFinalUrl('')
        setTempUrl('')
        setFileUrls([])
    }

    const handleFileUpload = async (event) => {
        const files = event.target.files
        let tempUrlHolder = []
        if(event.target.files.length > 0) {
            setIsUploading(true)
            tempUrlHolder = await uploadFiles(files)
            setIsUploading(false)
        }
        else {
            setFinalUrl('')
            setTempUrl('')
        }
        if(tempUrlHolder.length > 0) {
            setFinalUrl(tempUrlHolder[0])
            setTempUrl(tempUrlHolder[0])
        }
        setFileUrls(tempUrlHolder)
    }

    const onSubmit = () => {
        props.fileLinksSetter(fileUrls)
        if(fileUrls.length > 0) {
            props.fileTypeSetter(postType)
        }
        else {
            props.fileTypeSetter('plain')
        }
        onClose()
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
                    <FilePreview
                    type={postType}
                    finalUrl={finalUrl}
                    onRemoveAttachment={removeAttachments}
                    isUploading={isUploading} />

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
                        <>
                        <input 
                            type="file" 
                            id="upload-in" 
                            accept={fileType}
                            style={{display:"none"}}
                            multiple={allowMultiple}
                            onChange={handleFileUpload}
                        />
                        <Button
                        onClick={selectFiles}
                        variant='contained'
                        endIcon={<UploadIcon />}>
                            Upload
                        </Button>
                        </>}

                        <Button
                        onClick={onSubmit}
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


function SelectGroupDialog(props) {
    const {open, onClose} = props
    const selectedGroups = props.parentList
    const setSelectedGroups = props.setParentList
    const userGroups = useSelector(state=>state.contacts.groups);

    const selectGroup = (group) => {
        const selGroup = group
        console.log(selGroup)
        let temp = [...selectedGroups]
        temp.push(selGroup)
        setSelectedGroups(temp)
    }

    const removeGroup = (group) => {
        const remGroup = group
        let temp = [...selectedGroups]
        const remIndex = temp.indexOf(remGroup)
        temp.splice(remIndex, 1)
        setSelectedGroups(temp)
    }

    return (
        <Dialog
        fullWidth
        maxWidth='sm'
        onClose={onClose}
        open={open} >
            <DialogTitle>
                Select groups to add
            </DialogTitle>
            <div className='createpost-selectgroups'>
            <Box
            sx={{
                border: '2px dashed grey',
                borderRadius: '5px',
                width: '95%',
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
                alignContent: 'flex-start',
                height: '300px',
                overflow: 'scroll'
            }}>
                {
                    userGroups.map((group, i) => (
                        <div key={i}>

                            {selectedGroups.includes(group) &&
                            <Chip
                            id={group}
                            sx={{
                                marginLeft: '1px',
                                marginRight: '1px',
                                marginTop: '5px',
                                marginBottom: '5px'
                            }}
                            color='success'
                            onDelete={() => removeGroup(group)}
                            label={group.name} />}

                            {!selectedGroups.includes(group) &&
                            <Chip
                            id={group}
                            sx={{
                                marginLeft: '1px',
                                marginRight: '1px',
                                marginTop: '5px',
                                marginBottom: '5px'
                            }}
                            onClick={() => selectGroup(group)}
                            label={group.name} />}

                        </div>
                    ))
                }
            </Box>
            <Button
            sx={{
                marginBottom: '10px'
            }}
            onClick={onClose}
            variant='contained' >
                Close
            </Button>
            </div>
        </Dialog>);
}


function CreatePostEntry() {
    const user = useSelector(state=>state.user.user);
    const [description, setDescription] = React.useState('')
    const [postType, setPostType] = React.useState('multimedia')
    const [finalPostType, setFinalPostType] = React.useState('plain')
    const [optionNos, setOptionNos] = React.useState(0)
    const [pollOptions, setPollOptions] = React.useState([''])
    const [focusNew, setFocusNew] = React.useState(false)
    const [dialogOpen, setDialogOpen] = React.useState(false)
    const [groups, setGroups] = React.useState([])
    const [selectGroupOpen, setSelectGroupOpen] = React.useState(false)
    const [fileLinks, setFileLinks] = React.useState([])
    const dispatch = useDispatch();
    const isAttached = (fileLinks.length > 0)

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

    const setRadioOption = (event) => {
        setPostType(event.target.value)
        if(event.target.value === 'poll') {
            setFinalPostType('poll')
        }
        else {
            setFinalPostType('plain')
        }
    }

    const deleteGroup = (delIndex) => {
        let temp = [...groups]
        temp.splice(delIndex, 1)
        setGroups(temp)
    }

    const onGroupSelClose = () => {
        setSelectGroupOpen(false)
    }

    const onAddGroup = () => {
        setSelectGroupOpen(true)
    }
    const addPost = async () => {
        console.log("adding post");
        let newpost = {
            ownerID: user.username,
            ownerProfileUrl: user.profileUrl,
            createdTime: new Date(),
            type: finalPostType,
            description: description,
            groups: groups.map(group=>group._id)
        }
        if(finalPostType === 'poll') {
            newpost["pollStatus"] = 'active'
            newpost["pollData"] = {
                options: pollOptions.slice(0, optionNos),
                votes: new Array(optionNos).fill(0)
            }
        }
        else {
            newpost["file_links"] = fileLinks
        }
        console.log(newpost)
        var res = await createPost(newpost);
        console.log("post result",res);
        if(res.data && res.data.post)dispatch(addpost(res.data.post));
        dispatch(addpost(newpost));
    }

    return (
        <div className='createpost-innercontainer'>
            <TextField
            fullWidth
            multiline
            minRows={5}
            sx={{
                marginTop: '20px'
            }}
            value={description}
            onChange={(event) => setDescription(event.target.value)}
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
                    onChange={setRadioOption}>

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
                }}
                onClick={openDialog}
                variant='outlined'
                startIcon={<AttachFileIcon />} >
                    {isAttached ? 'File Attached' : 'Attach file'}
                </Button>
                <UploadDialog
                open={dialogOpen}
                onClose={onDialogClose}
                fileTypeSetter={setFinalPostType}
                fileLinksSetter={setFileLinks}
                fileLinks={fileLinks} />
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
            <div>
                <Typography
                sx={{
                    fontFamily: 'arvo',
                    fontWeight: 'bold'
                }}>
                    Groups:
                </Typography>
                <div className='createpost-groups'>
                    {
                        groups.map((group, i) => (
                            <div key={i}>
                                <Chip
                                sx={{
                                    marginLeft: '1px',
                                    marginRight: '1px',
                                    marginTop: '5px',
                                    marginBottom: '5px'
                                }}
                                id={i.toString()}
                                label={group.name}
                                onDelete={(event) => deleteGroup(i)}
                                variant='outlined' />
                            </div>
                        ))
                    }
                    <Chip
                    icon={<AddCircleIcon />}
                    sx={{
                        marginLeft: '1px',
                        marginRight: '1px',
                        marginTop: '5px',
                        marginBottom: '5px'
                    }}
                    onClick={onAddGroup}
                    variant='outlined'
                    color='primary'
                    label='Add groups' />

                    <SelectGroupDialog
                    open={selectGroupOpen}
                    parentList={groups}
                    setParentList={setGroups}
                    onClose={onGroupSelClose} />
                </div>
            </div>
            <center>
                <Button
                variant='contained'
                onClick={addPost}
                >
                    Post
                </Button>
            </center>
        </div>
    );
}


function CreatePost() {
    return (
        <div className='createpost-container'>
            <div className='createpost-title'>
                <h1>
                    Create new post
                </h1>
            </div>
            <CreatePostEntry />
        </div>
    );
}


export default CreatePost;