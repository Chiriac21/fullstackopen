import { useContext } from 'react'
import { createAnecdote } from '../services/requests'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import NotificationContext from '../notificationContext'


const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const {notificationDispatch} = useContext(NotificationContext)

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (newAnecdote) => {
      notificationDispatch(`Anecdote '${newAnecdote.content}' created`)
      setTimeout(() => {
        notificationDispatch('')
      }, 5000)
      queryClient.setQueryData(['anecdotes'], (old) =>
        old ? old.concat(newAnecdote) : [newAnecdote]
      )
    },
    onError: (error) => {
      const message = error && error.message ? error.message : 'anecdote creation failed'
      notificationDispatch(message)
      setTimeout(() => {
        notificationDispatch('')
      }, 5000)
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate(content)
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
