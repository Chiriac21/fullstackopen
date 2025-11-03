import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdoteService';

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    createAnecdote(state, action) {
      state.push(action.payload)
    },
    voteAnecdote(state, action) {
      return state.map(anecdote => anecdote.id !== action.payload.id? anecdote : action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

const { setAnecdotes, createAnecdote, voteAnecdote } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
      return async (dispatch) => {
        const anecdotes = await anecdoteService.getAll()
        dispatch(setAnecdotes(anecdotes))
      }
}

export const appendAnecdote = (content) => {
      return async (dispatch) => {
        const anecdote = await anecdoteService.createAnecdote(content)
        dispatch(createAnecdote(anecdote))
      }
}

export const addVoteAnecdote = (anecdote) => {
      return async (dispatch) => {
        const updatedAnecdote = await anecdoteService.voteOneAnecdote(anecdote)
        dispatch(voteAnecdote(updatedAnecdote))
      }
}


export default anecdoteSlice.reducer
