import './newuser.css'
import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel'
import DateAdapter from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import DesktopDatePicker from '@mui/lab/DesktopDatePicker'


const TextFieldVariant = 'filled'


function onSubmit(details){
    for(let key of Object.keys(details)){
        console.log(key + ': ' + details[key])
    }
}


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
            value={value}
            maxDate={max_date}
            onChange={handleDateChange}
            renderInput={(params) => <TextField fullWidth variant={TextFieldVariant} {...params} />}
             />
        </LocalizationProvider>
    );
}


class EntryListChange extends React.Component {
    constructor(props) {
        super(props)

        const age_limit = 17  // years
        let max_date = new Date()
        max_date.setFullYear(max_date.getFullYear() - age_limit)
        this.max_date = max_date

        this.state = {
            name: '',
            type: '',
            rollNo: '',
            admissionYear: '',
            branch: '',
            email: '',
            dob: max_date,
            username: '',
            password: '',
            cnfPassword: ''
        }

        this.entryChange = this.onEntryChange.bind(this)
        this.submitClick = this.onSubmitClick.bind(this)
    }

    onEntryChange(event) {
        const key = event.target.id
        const value = event.target.value
        this.setState({ [key]: value })
    }

    onSubmitClick() {
        onSubmit(this.state)
    }

    render() {
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

        const onUserTypeChange = (type) => {
            this.setState({type: type})
        }
    
        const onDobChange = (selected_date) => {
            this.setState({dob: selected_date})
        }

        return (
            <div className='newuser-entry-container'>
                {
                    Object.keys(label_name).map( (key, i) => (
                        <div key={i} className='newuser-entry-element'>
                            <h3>
                                { label_name[key] }
                            </h3>
    
                            {!(key === 'type' || key === 'dob') &&
                            !(key === 'password' || key === 'cnfPassword') &&
                            <TextField
                            fullWidth
                            onChange={this.entryChange}
                            id={ key }
                            variant={TextFieldVariant} />}
    
                            {!(key === 'type' || key === 'dob') &&
                            (key === 'password' || key === 'cnfPassword') &&
                            <TextField
                            fullWidth
                            onChange={this.entryChange}
                            id={ key }
                            type='password'
                            variant={TextFieldVariant} />}
    
                            { key === 'type' && <UserType onChange={onUserTypeChange} />}
    
                            { key === 'dob' && <UserDOB onChange={onDobChange} maxDate={this.max_date}/>}
                        </div>
                    ))
                }
    
                <br /><br />
                <Button
                onClick={this.submitClick}
                variant='contained' >
                    Submit
                </Button>
            </div>
        );
    }
}


function NewUser() {
    return (
        <div className='newuser-container'>
            <h1>
                Create Account
            </h1>
            <EntryListChange />
        </div>
    );
}

export default NewUser;