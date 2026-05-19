import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/authSlice.js'
import ticketReducer from './slices/ticketSlice.js'

const store = configureStore({
  reducer: {
    auth: authReducer,
    tickets: ticketReducer
  }
})

export default store