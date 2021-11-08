import axios from "axios"
import {URL} from "../constants"

export async function createGroup(data){
    var result = await axios({
        method: 'post',
        withCredentials:true,
        url: URL+"group",
        data:{
            group:data
        }
        
     })    
     console.log("result is",result);
     return result;
     
}

export async function createPost(data){
    var result = await axios({
        method: 'post',
        withCredentials:true,
        url: URL+"post",
        data:{
            post:data
        }
        
     })    
     console.log("result is",result);
     return result;
     
}
