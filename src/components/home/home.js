import './home.css'
import {imagePostDetails, audioPostDetails, videoPostDetails, youtubePostDetails} from './stub'
import { Post } from './posts'


function Home() {
    return (
        <div className='home-container'>
            <Post {...imagePostDetails()} />
            <Post {...audioPostDetails()} />
            <Post {...videoPostDetails()} />
            <Post {...youtubePostDetails()} />
        </div>
    );
}


export default Home;
