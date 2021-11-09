import React from "react";
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
import { useSelector, useDispatch } from 'react-redux'
import { addpost, setposts } from '../../app/postSlice';
import { Link } from "react-router-dom";


function postableUser() {
    return true;
}


function onCreatePostClick() {
    window.location.href = '/createpost'
}


function Home() {
    var Posts = useSelector(state=>state.post.posts);
    var rPosts = [...Posts];
    rPosts.reverse();
    const dispatch = useDispatch();
    const isPostableUser = postableUser()
    return (
        <>
        <div className='home-container'>
            {rPosts.map((post,ind)=>(<Post key={ind} {...post} />))}
        </div>
        {isPostableUser &&
        <Fab
        LinkComponent={Link}
        to="/createpost"
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
