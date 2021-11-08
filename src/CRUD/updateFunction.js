import axios from "axios"
import {URL} from "../constants"

export async function updateUser(data){
    var result = await axios({
        method: 'put',
        withCredentials:true,
        url: URL+"user",
        data:{
            user:data
        }
        
     })    
     console.log("result is",result);
     return result;
}


export async function updateGroup(data){
    var result = await axios({
        method: 'put',
        withCredentials:true,
        url: URL+"group",
        data:{
            group:data
        }
        
     })    
     console.log("result is",result);
     return result;
     
}

export async function updatePost(data){
    var result = await axios({
        method: 'put',
        withCredentials:true,
        url: URL+"post",
        data:{
            post:data
        }
        
     })    
     console.log("result is",result);
     return result;
     
}
