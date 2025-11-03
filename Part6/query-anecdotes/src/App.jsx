import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useContext } from 'react'
import { getAll, voteAnecdote } from './services/requests'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import NotificationContext from './notificationContext'

const App = () => {
  const queryClient = useQueryClient()
  const {notificationDispatch} = useContext(NotificationContext)
  const voteMutation = useMutation({
    mutationFn: voteAnecdote,
    onSuccess: (updatedAnecdote) => {
      queryClient.setQueryData(['anecdotes'], (old) =>
        old ? anecdotes.map(anecdote => anecdote.id !== updatedAnecdote.id ? anecdote : updatedAnecdote) : [updatedAnecdote])
      notificationDispatch(`Anecdote '${updatedAnecdote.content}' voted`)
      setTimeout(() => {
        notificationDispatch('')
      }, 5000)
    }
  })


  const handleVote = (anecdote) => {
    voteMutation.mutate(anecdote)
  }

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAll,
    refetchOnWindowFocus: false,
    retry: 1
  })

  if(result.isLoading)
    return (<div>Data is loading...</div>)

  if(result.isError)
    return (<div>anecdote service not available due to problems in server</div>)

  const anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default App
