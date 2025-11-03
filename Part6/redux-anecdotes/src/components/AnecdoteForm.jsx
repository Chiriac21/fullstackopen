import { appendAnecdote } from '../reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'
import { useRef } from 'react'
import { setNotifMessage } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()
  const timeoutRef = useRef(null)

  const submitForm = async (event) => {
    event.preventDefault();
    const anecdoteName = event.target.anecdote.value
    event.target.anecdote.value = ''
    dispatch(appendAnecdote(anecdoteName))
    dispatch(setNotifMessage(`You voted "${anecdoteName}"`, 5, timeoutRef))
  }

    return (
        <>
            <h2>create new</h2>
            <form onSubmit={submitForm}>
            <div>
            <input name="anecdote"/>
            </div>
            <button type="submit">create</button>
            </form>
        </>
    )
}

export default AnecdoteForm