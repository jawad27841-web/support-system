import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import API from '../../api/axios.js'

export const loginUser = createAsyncThunk(
  'auth/login',
  async (data, { rejectWithValue }) => {
    try {
      const res = await API.post('/auth/login', data)
      localStorage.setItem('token', res.data.token)
      return res.data
    } catch (error) {
      return rejectWithValue(error.response.data.message)
    }
  }
)

export const registerUser = createAsyncThunk(
  'auth/register',
  async (data, { rejectWithValue }) => {
    try {
      const res = await API.post('/auth/register', data)
      return res.data
    } catch (error) {
      return rejectWithValue(error.response.data.message)
    }
  }
)

export const getMe = createAsyncThunk(
  'auth/me',
  async (_, { rejectWithValue }) => {
    try {
      const res = await API.get('/auth/me')
      return res.data
    } catch (error) {
      return rejectWithValue(error.response.data.message)
    }
  }
)

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: localStorage.getItem('token') || null,
    loading: false,
    error: null
  },
  reducers: {
    logoutUser: (state) => {
      state.user = null
      state.token = null
      localStorage.removeItem('token')
    },
    clearError: (state) => {
      state.error = null
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload.user
        state.token = action.payload.token
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(getMe.fulfilled, (state, action) => {
        state.user = action.payload.user
      })
  }
})

export const { logoutUser, clearError } = authSlice.actions
export default authSlice.reducer