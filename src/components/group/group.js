import  './group.css'


function GroupContents() {
    return (
        <div className='group-innercontainer'></div>
    );
}


function Group() {
    return (
        <div className='group-container'>
            <GroupContents />
        </div>
    );
}


export default Group;