import { createSlice } from '@reduxjs/toolkit'

export const postSlice = createSlice({
  name: 'post',
  initialState: {
    posts:[],
  },
  reducers: {
    setposts:(state,action)=>{
        state.posts = action.payload;
    },
    addpost: (state, action) => {
        state.posts.push(action.payload);
    },
    updatepost: (state,action) => {
        var newposts = []
        for(var post of state.posts){
            if(post._id==action.payload._id){
                newposts.push(action.payload);
            }
            else{
                newposts.push(post);
            }
        }
        state.posts = newposts;
    },
    deletepost: (state, action) => {
        var newposts = []
        for(var post of state.posts){
            if(post._id==action.payload._id){
                continue;
            }
            else{
                newposts.push(post);
            }
        }
        state.posts = newposts;
    },
  },
})

export const {addpost,deletepost,updatepost,setposts} = postSlice.actions

export default postSlice.reducer