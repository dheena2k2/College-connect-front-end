import { createSlice } from '@reduxjs/toolkit'

export const contactSlice = createSlice({
  name: 'contacts',
  initialState: {
    users:[],
    groups:[]
  },
  reducers: {
    setgroups:(state,action)=>{
        state.groups = action.payload;
    },
    setusers:(state,action)=>{
        state.users = action.payload;
    },
    addgroup:(state,action)=>{
        state.groups.push(action.payload);
    },
    updategroup: (state,action) => {
      var newgroups = []
      for(var group of state.groups){
          if(group._id==action.payload._id){
            group.push(action.payload);
          }
          else{
            group.push(group);
          }
      }
      state.groups = newgroups;
  },
  deletegroup: (state, action) => {
      var newgroups = []
      for(var group of state.groups){
          if(group._id==action.payload._id){
              continue;
          }
          else{
              newgroups.push(group);
          }
      }
      state.groups = newgroups;
  },
  },
})

// Action creators are generated for each case reducer function
export const { setgroups,setusers,addgroup,deletegroup,updategroup } = contactSlice.actions

export default contactSlice.reducer