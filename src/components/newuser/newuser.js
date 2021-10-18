import React from 'react';
import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel'


function UserType(props) {
    const handleRadioChange = (event) => {
        props.onChange(event.target.value)
    }

    return (
        <RadioGroup
        aria-label='user-type'
        name='user-name-group'
        onChange={handleRadioChange} >
            <FormControlLabel value='student' control={<Radio />} label='Student' />
            <FormControlLabel value='student-incharge' control={<Radio />} label='Student In-charge' />
            <FormControlLabel value='higher-authority' control={<Radio />} label='Higher Authority' />
            <FormControlLabel value='admin' control={<Radio />} label='Admin' />
        </RadioGroup>
    );
}


function EntryList() {
    const label_name = {
        name: 'Name',
        type: 'Select the type of user',
        rollNo: 'Roll number',
        admissionYear: 'Year of admission',
        branch: 'Branch',
        email: 'E-mail',
        dob: 'Date of birth',
        username: 'Username',
        password: 'Password',
        cnfPassword: 'Confirm password'
    }

    const value_format = {
        name: '',
        type: '',
        rollNo: '',
        admissionYear: '',
        branch: '',
        email: '',
        dob: null,
        username: '',
        password: '',
        cnfPassword: ''
    }

    const [entryValues, setEntryValues] = React.useState(value_format)

    const onUserTypeChange = (type) => {
        setEntryValues({type: type})
        console.log(type)
    }

    return (
        <div>
            {
                Object.keys(label_name).map( (key, i) => (
                    <div key={i}>
                        <h3>{ label_name[key] }</h3>

                        {!(key === 'type' || key === 'dob') &&
                        !(key === 'password' || key === 'cnfPassword') &&
                        <TextField
                        id={ key }
                        variant='standard' />}

                        {!(key === 'type' || key === 'dob') &&
                        (key === 'password' || key === 'cnfPassword') &&
                        <TextField
                        id={ key }
                        type='password'
                        variant='standard' />}

                        { key === 'type' && <UserType onChange={onUserTypeChange} />}
                    </div>
                ))
            }
        </div>
    );
}


function NewUser() {
    return (
        <div>
            <EntryList />
        </div>
    );
}

export default NewUser;