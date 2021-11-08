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
    }
  },
})

// Action creators are generated for each case reducer function
export const { setgroups,setusers,addgroup } = contactSlice.actions

export default contactSlice.reducer