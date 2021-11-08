import axios from "axios"
import {URL} from "../constants"
export async function getUser(){
    var result = await axios({
        method: 'get',
        withCredentials:true,
        url: URL+"user"
        
     })    
     console.log("result is",result);
     return result;
}

export async function getUsers(){
    var result = await axios({
        method: 'get',
        withCredentials:true,
        url: URL+"users"
        
     })    
     console.log("result is",result);
     return result;
     
}

export async function getGroup(groupID){
    var result = await axios({
        method: 'get',
        withCredentials:true,
        url: URL+"group",
        params:{
            groupID
        }
        
     })    
     console.log("result is",result);
     return result;
     
}

export async function getGroups(){
    var result = await axios({
        method: 'get',
        withCredentials:true,
        url: URL+"groups"
        
     })    
     console.log("result is",result);
     return result;
     
}

export async function getPosts(){
    var result = await axios({
        method: 'get',
        withCredentials:true,
        url: URL+"posts"
        
     })    
     console.log("result is",result);
     return result;
     
}

export async function getPost(postID){
    var result = await axios({
        method: 'get',
        withCredentials:true,
        url: URL+"post",
        params:{
            postID
        }
        
     })    
     console.log("result is",result);
     return result;
     
}