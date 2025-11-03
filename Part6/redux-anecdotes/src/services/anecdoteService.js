import { getId } from '../helpers/anecdotesHelper'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => { 
  const response = await fetch(baseUrl)

  if(!response.ok)
    throw new Error('Failed to fetch anecdotes')

   return await response.json() 
}

const createAnecdote = async (content) => {
  const options = {
    method: 'POST',
    headers: {'Content-type': 'application/json'},
    body: JSON.stringify({content, id:getId(), votes: 0})
  }

  const response = await fetch(baseUrl, options)

   if(!response.ok)
    throw new Error('Failed to create anecdote')

   return await response.json()
}

const voteOneAnecdote = async (anecdote) => {
  const options = {
    method: 'PUT',
    headers: {'Content-type': 'application/json'},
    body: JSON.stringify({...anecdote, votes: anecdote.votes + 1})
  }

  const response = await fetch(`${baseUrl}/${anecdote.id}`, options)

   if(!response.ok)
    throw new Error('Failed to update anecdote')

  return await response.json()
}



export default { getAll, createAnecdote, voteOneAnecdote }