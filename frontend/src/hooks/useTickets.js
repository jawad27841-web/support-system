import { useDispatch, useSelector } from 'react-redux'
import { fetchTickets, fetchTicketById, createTicket, updateTicket, deleteTicket } from '../redux/slices/ticketSlice.js'

const useTickets = () => {
  const dispatch = useDispatch()
  const { tickets, currentTicket, loading, error } = useSelector(state => state.tickets)

  const getTickets = (params) => dispatch(fetchTickets(params))
  const getTicketById = (id) => dispatch(fetchTicketById(id))
  const addTicket = (data) => dispatch(createTicket(data))
  const editTicket = (id, data) => dispatch(updateTicket({ id, data }))
  const removeTicket = (id) => dispatch(deleteTicket(id))

  return { tickets, currentTicket, loading, error, getTickets, getTicketById, addTicket, editTicket, removeTicket }
}

export default useTickets