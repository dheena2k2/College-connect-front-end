import './home.css';
import {
    imagePostDetails,
    audioPostDetails,
    videoPostDetails,
    youtubePostDetails,
    newPollPostDetails,
    selectedPollPostDetails,
    publishedPollPostDetails
} from './stub';
import { Post } from './posts';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';


function postableUser() {
    return true;
}


function onCreatePostClick() {
    window.location.href = '/createpost'
}


function Home() {
    const isPostableUser = postableUser()
    return (
        <>
        <div className='home-container'>
            <Post {...imagePostDetails()} />
            <Post {...audioPostDetails()} />
            <Post {...videoPostDetails()} />
            <Post {...youtubePostDetails()} />
            <Post {...newPollPostDetails()} />
            <Post {...selectedPollPostDetails()} />
            <Post {...publishedPollPostDetails()} />
        </div>
        {isPostableUser &&
        <Fab
        onClick={onCreatePostClick}
        sx={{
            position: 'fixed',
            right: '20px',
            bottom: '20px'
        }}
        color='primary'
        variant='extended'>
            Create Post
            <AddIcon />
        </Fab>}
        </>
    );
}


export default Home;
