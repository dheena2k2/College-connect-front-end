import React from 'react';
import './editprofile.css'
import Avatar from '@mui/material/Avatar';
import DateAdapter from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import TextField from '@mui/material/TextField';
import Badge from '@mui/material/Badge'
import UploadIcon from '@mui/icons-material/Upload';
import IconButton from '@mui/material/IconButton'
import Button from '@mui/material/Button';


const textFieldVariant='outlined'


function getUserDetails() {
    const description = 'My name is Monkey D Luffy and I am a Pirate. I became a rubber \
    man by eating Gum-Gum devil fruit. This makes me a devil fruit user whose body is \
    entirely made of rubber. My hobbie is eating. I will find One Piece treasure and \
    will become "The King of The Pirates".'
    const details = {
        name: 'Monkey D. Luffy',
        rollNo: 'CSE32412',
        email: 'luffy_like_meat@foo.bar',
        type: 'Student',
        admissionYear: '2019',
        branch: 'Computer Science',
        dob: new Date(1998, 4, 5, 0, 0, 0, 0),
        profileUrl: 'https://i1.sndcdn.com/avatars-UidYWfW20bjki8Ub-GJKpBQ-t500x500.jpg',
        description: description
    }

    return details;
}


function onSaveChanges(details) {
    console.log(details)
}


function UserDOB(props) {
    const max_date = props.maxDate
    const [value, setValue] = React.useState(props.value || max_date)

    const handleDateChange = (selected_date) => {
        props.onChange(selected_date)
        setValue(selected_date)
    }

    return (
        <LocalizationProvider dateAdapter={DateAdapter}>
            <DesktopDatePicker
            inputFormat='dd/MM/yyyy'
            label={props.label}
            value={value}
            maxDate={max_date}
            onChange={handleDateChange}
            renderInput={(params) => <TextField variant={textFieldVariant} {...params} />}
             />
        </LocalizationProvider>
    );
}


function EntryBox(props) {
    const entry_label = {
        name: 'Name',
        rollNo: 'Roll number',
        description: 'Description',
        email: 'E-mail',
        admissionYear: 'Year of admission',
        branch: 'Branch',
        dob: 'Date of birth'}

    const age_limit = 17  // years
    let max_date = new Date()
    max_date.setFullYear(max_date.getFullYear() - age_limit)

    const [details, setDetails] = React.useState({
        name: props.name,
        rollNo: props.rollNo,
        description: props.description,
        email: props.email,
        admissionYear: props.admissionYear,
        branch: props.branch,
        dob: props.dob})

    function setValue(newValue, changeKey) {
        let dummy = {}
        for(let key of Object.keys(details)) {
            if(key === changeKey) {
                dummy[key] = newValue
            }
            else {
                dummy[key] = details[key]
            }
        }
        setDetails(dummy)
    }

    return (
        <div className='editprofile-subcontainer'>
            <Badge
            overlap='circular'
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            sx={{
                marginRight: '30px'
            }}
            badgeContent={
                <IconButton>
                <Avatar
                children={<UploadIcon />}
                alt='Upload' /></IconButton>
            } >
                <Avatar
                sx={{
                    width: '200px',
                    height: '200px',
                }}
                src={props.profileUrl}
                alt={props.name} />
            </Badge>
            <div className='editprofile-entrylist'>
                {
                    Object.keys(entry_label).map((key, i) => (
                        <div key={i}>
                            {!(key === 'description' || key === 'dob') &&
                            <TextField
                            defaultValue={details[key]}
                            onChange={(event) => setValue(event.target.value, key)}
                            variant={textFieldVariant}
                            label={entry_label[key]} />
                            }

                            {key === 'description' &&
                            <TextField
                            multiline
                            minRows={5}
                            fullWidth
                            defaultValue={details[key]}
                            onChange={(event) => setValue(event.target.value, key)}
                            variant={textFieldVariant}
                            label={entry_label[key]} />
                            }

                            {key === 'dob' &&
                            <UserDOB
                            value={details[key]}
                            onChange={(newValue) => setValue(newValue, key)}
                            maxDate={max_date}
                            label={entry_label[key]} />
                            }
                        </div>
                    ))
                }
                <Button
                onClick={() => onSaveChanges(details)}
                variant='contained'
                sx={{
                    width: '30%',
                    marginTop: '30px',
                    marginLeft: '70%'
                }} >
                    Save Changes
                </Button>
            </div>
        </div>
    );
}


function EditProfile() {
    const details = getUserDetails()
    return (
        <div className='editprofile-container'>
            <div>
                <h1>
                    Edit Profile
                </h1>
            </div>
            <EntryBox {...details} />
        </div>
    );
}

export default EditProfile;
