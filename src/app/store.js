import { configureStore } from '@reduxjs/toolkit'
import contactReducer from './contactSlice'
import postReducer from './postSlice'
import userReducer from './userSlice'
export default configureStore({
  reducer: {
    post:postReducer,
    contacts:contactReducer,
    user:userReducer
  },
  devTools:window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
})