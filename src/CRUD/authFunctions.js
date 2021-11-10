import axios from "axios"
import {URL} from "../constants"
export async function login(username,password){
    var result = await axios({
        method: 'post',
        withCredentials:true,
        url: URL+"login",
        data:{
            username:username,
            password:password
        }
        
     })    
     console.log("result is",result);
     return result;
}

export async function signup(data){
    var result = await axios({
        method: 'post',
        withCredentials:true,
        url: URL+"signup",
        data:data
        
     })    
     console.log("result is",result);
     return result;
}

export async function logout(data){
    var result = await axios({
        method: 'get',
        withCredentials:true,
        url: URL+"logout",
        data:data
        
     })    
     console.log("result is",result);
     return result;
}