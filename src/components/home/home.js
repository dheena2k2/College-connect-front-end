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
    const Posts = useSelector(state=>state.post.posts);
    const dispatch = useDispatch();
    const [isLoading,setIsLoading] = React.useState(true);
    React.useEffect(()=>{
        var newposts = [];
        newposts.push({...imagePostDetails()});
        newposts.push({...audioPostDetails()});
        newposts.push({...videoPostDetails()});
        newposts.push({...youtubePostDetails()});
        newposts.push({...newPollPostDetails()});
        newposts.push({...selectedPollPostDetails()});
        newposts.push({...publishedPollPostDetails()});
        setTimeout(()=>{
            dispatch(setposts(newposts));
            console.log("newposts set");
        },5000)
    },[])

    if(Posts.length==0)
        return <div className='home-container'>
                    <p>Loading....</p>
                </div>
    console.log("Posts",Posts); 
    const isPostableUser = postableUser()
    return (
        <>
        <div className='home-container'>
            {Posts.map((post,ind)=>(<Post key={ind} {...post} />))}
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
