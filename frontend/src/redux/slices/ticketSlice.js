import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import API from '../../api/axios.js'

export const fetchTickets = createAsyncThunk(
  'tickets/fetchAll',
  async (params, { rejectWithValue }) => {
    try {
      const res = await API.get('/tickets', { params })
      return res.data
    } catch (error) {
      return rejectWithValue(error.response.data.message)
    }
  }
)

export const fetchTicketById = createAsyncThunk(
  'tickets/fetchById',
  async (id, { rejectWithValue }) => {
    try {
      const res = await API.get(`/tickets/${id}`)
      return res.data
    } catch (error) {
      return rejectWithValue(error.response.data.message)
    }
  }
)

export const createTicket = createAsyncThunk(
  'tickets/create',
  async (data, { rejectWithValue }) => {
    try {
      const res = await API.post('/tickets', data)
      return res.data
    } catch (error) {
      return rejectWithValue(error.response.data.message)
    }
  }
)

export const updateTicket = createAsyncThunk(
  'tickets/update',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await API.put(`/tickets/${id}`, data)
      return res.data
    } catch (error) {
      return rejectWithValue(error.response.data.message)
    }
  }
)

export const deleteTicket = createAsyncThunk(
  'tickets/delete',
  async (id, { rejectWithValue }) => {
    try {
      await API.delete(`/tickets/${id}`)
      return id
    } catch (error) {
      return rejectWithValue(error.response.data.message)
    }
  }
)

const ticketSlice = createSlice({
  name: 'tickets',
  initialState: {
    tickets: [],
    currentTicket: null,
    loading: false,
    error: null
  },
  reducers: {
    clearCurrentTicket: (state) => {
      state.currentTicket = null
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTickets.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchTickets.fulfilled, (state, action) => {
        state.loading = false
        state.tickets = action.payload.tickets || []
      })
      .addCase(fetchTickets.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(fetchTicketById.fulfilled, (state, action) => {
        state.currentTicket = action.payload
      })
      .addCase(createTicket.fulfilled, (state, action) => {
        state.tickets.unshift(action.payload.ticket)
      })
      .addCase(deleteTicket.fulfilled, (state, action) => {
        state.tickets = state.tickets.filter(t => t.id !== action.payload)
      })
  }
})

export const { clearCurrentTicket } = ticketSlice.actions
export default ticketSlice.reducer