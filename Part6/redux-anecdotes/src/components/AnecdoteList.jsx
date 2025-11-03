import { useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setNotifMessage } from '../reducers/notificationReducer'
import { addVoteAnecdote } from '../reducers/anecdoteReducer'


const AnecdoteList = () => {
  const dispatch = useDispatch();
  const timeoutRef = useRef(null)
  const anecdotes = useSelector(({anecdotes, filter}) => {
    if (filter === '') {
      return anecdotes
    }
    return anecdotes.filter(anecdote => 
      anecdote.content.toLowerCase().includes(filter.toLowerCase())
    )
  })

  const vote = id => {
    const anecdoteToVote = anecdotes.find(anecdote => anecdote.id === id);
    if (!anecdoteToVote) return

    // dispatch the vote
    dispatch(addVoteAnecdote(anecdoteToVote))

    // show notification and reset the hide-timer
    dispatch(setNotifMessage(`You voted "${anecdoteToVote.content}"`, 5, timeoutRef))
  }

  return (
    <>
      {[...anecdotes].sort((a, b) => b.votes - a.votes).map(anecdote => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
    </>
    )
}

export default AnecdoteList