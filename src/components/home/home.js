import './home.css'
import {
    imagePostDetails,
    audioPostDetails,
    videoPostDetails,
    youtubePostDetails,
    newPollPostDetails,
    selectedPollPostDetails,
    publishedPollPostDetails
} from './stub'
import { Post } from './posts'


function Home() {
    return (
        <div className='home-container'>
            <Post {...imagePostDetails()} />
            <Post {...audioPostDetails()} />
            <Post {...videoPostDetails()} />
            <Post {...youtubePostDetails()} />
            <Post {...newPollPostDetails()} />
            <Post {...selectedPollPostDetails()} />
            <Post {...publishedPollPostDetails()} />
        </div>
    );
}


export default Home;
