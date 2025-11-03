import { createContext, useReducer } from 'react'

const notificationReducer = (state = '', action) => {
  if (typeof action === 'string') return action
  if (action && typeof action.payload !== 'undefined') return action.payload
  return state
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, '')

  return (
    <NotificationContext.Provider value={{ notification, notificationDispatch }}>
      {props.children}
    </NotificationContext.Provider>
  )
}

export default NotificationContext