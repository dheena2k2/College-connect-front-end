import axios from "axios"
import {URL} from "../constants"

export async function deleteGroup(groupID){
    var result = await axios({
        method: 'delete',
        withCredentials:true,
        url: URL+"group",
        params:{
            groupID
        }
        
     })    
     console.log("result is",result);
     return result;
}

export async function deletePost(postID){
    var result = await axios({
        method: 'delete',
        withCredentials:true,
        url: URL+"post",
        params:{
            postID
        }
        
     })    
     console.log("result is",result);
     return result;
}