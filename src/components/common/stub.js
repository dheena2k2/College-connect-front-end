export function getSampleUsers(nos) {
    const sampleUsers = [
        {
            username: 'dheena2k2',
            name: 'Dheenadhayalan R',
            dob: new Date(),
            type: 'Admin',
            rollNo: '',
            admissionYear: null,
            branch: '',
            profileUrl: '',
            email: '',
            description: ''
        },
        {
            username: 'luffy55',
            name: 'Monkey D. Luffy',
            dob: new Date(),
            type: 'Student',
            rollNo: '2019BCS0038',
            admissionYear: 2019,
            branch: 'Computer Science',
            profileUrl: '',
            email: '',
            description: ''
        },
        {
            username: 'gandalf',
            name: 'Gandalf the Grey',
            dob: new Date(),
            type: 'Higher Authority',
            rollNo: '',
            admissionYear: null,
            branch: 'Mechanical',
            profileUrl: '',
            email: '',
            description: ''
        },
        {
            username: 'morgo11',
            name: 'Morgan Stark',
            dob: new Date(),
            type: 'Student',
            rollNo: '2020BCS0018',
            admissionYear: 2020,
            branch: '',
            profileUrl: '',
            email: '',
            description: ''
        }
    ]

    return sampleUsers.slice(0, nos)
}