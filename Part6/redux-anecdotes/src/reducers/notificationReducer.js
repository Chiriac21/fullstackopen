import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
    name: 'notification',
    initialState: '',
    reducers: {
        notificationMessage(state, action){
            return action.payload
        }
    }

})

const { notificationMessage } = notificationSlice.actions

export const setNotifMessage = (content, timeout, timeoutRef) => {
    return async (dispatch) => {
        dispatch(notificationMessage(content))
        if (timeoutRef.current) {
              clearTimeout(timeoutRef.current)
        }
        timeoutRef.current = setTimeout(() => {
            dispatch(notificationMessage(''))
            timeoutRef.current = null
        }, timeout * 1000)
    }
}

export default notificationSlice.reducer
