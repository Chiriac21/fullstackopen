const baseUrl = "http://localhost:3001/anecdotes"

const getId = () => (100000 * Math.random()).toFixed(0)

export const getAll = async () => {
    const response = await fetch(baseUrl)

    if(!response.ok)
        throw new Error("Error fetching anecdotes")

    return await response.json()
}

export const createAnecdote = async (content) => {
    if(content.length < 5)
        throw new Error('Anecdote not long enough')

    const options = {
        method: 'POST',
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify({content, id: getId(), votes: 0})
    }

    const response = await fetch(baseUrl, options)

    if(!response.ok)
        throw new Error("Error creating anecdote")

    return await response.json()
}

export const voteAnecdote = async (anecdote) => {
    const options = {
        method: 'PUT',
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify({...anecdote, votes: anecdote.votes + 1})
    }

    const response = await fetch(`${baseUrl}/${anecdote.id}`, options)

    if(!response.ok)
        throw new Error("Error voting anecdote")

    return await response.json()
}