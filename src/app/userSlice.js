import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'counter',
  initialState: {
    user: {},
  },
  reducers: {
    setuser:(state,action)=>{
        state.user=action.payload;
    }
  },
})

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount } = userSlice.actions

export default userSlice.reducer