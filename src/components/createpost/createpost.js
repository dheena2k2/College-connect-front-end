import './createpost.css';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Radio from '@mui/material/Radio';
import { RadioGroup } from '@mui/material';
import { FormControlLabel } from '@mui/material';
import React from 'react';


function CreatePostEntry() {
    const [postType, setPostType] = React.useState('multimedia')
    const [optionNos, setOptionNos] = React.useState(0)
    const [pollOptions, setPollOptions] = React.useState([''])
    const [focusNew, setFocusNew] = React.useState(false)

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
                <Typography
                sx={{
                    fontFamily: 'arvo',
                    fontWeight: 'bold'
                }}>
                    Choose files to upload (optional):
                </Typography>}

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