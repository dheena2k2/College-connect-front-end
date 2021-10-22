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
        profileUrl: 'https://ih1.redbubble.net/image.2299745242.1024/mo,small,flatlay,product_square,600x600.jpg',
        description: description
    }

    return details;
}


function UserDOB(props) {
    const max_date = props.maxDate
    const [value, setValue] = React.useState(max_date)

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
                            variant={textFieldVariant}
                            label={entry_label[key]} />
                            }

                            {key === 'description' &&
                            <TextField
                            multiline
                            minRows={5}
                            fullWidth
                            variant={textFieldVariant}
                            label={entry_label[key]} />
                            }

                            {key === 'dob' &&
                            <UserDOB
                            maxDate={max_date}
                            label={entry_label[key]} />
                            }
                        </div>
                    ))
                }
            </div>
        </div>
    );
}


function EditProfile() {
    const details = getUserDetails()
    return (
        <div className='editprofile-container'>
            <EntryBox {...details} />
        </div>        
    );
}

export default EditProfile;