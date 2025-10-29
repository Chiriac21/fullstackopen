import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import Toggleable from './components/Toggable'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [message, setMessage] = useState({ message: null, type: null })
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
    
  }, [])

  useEffect(() => {
    const loggedBlogUser = window.localStorage.getItem('LoggedBlogappUser')
    if(loggedBlogUser){
      const user = JSON.parse(loggedBlogUser)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const onLogout= () => {
    window.localStorage.removeItem('LoggedBlogappUser')
    setUser(null)
  }

  const onLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })

      window.localStorage.setItem('LoggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    }catch{
      setMessage({ message: 'Wrong credentials', type: 'error' })
      setTimeout(() => {
        setMessage({ message: null, type: null })
      }, 5000)
    }
  }

  const onCreate = (blogObject) => {
    blogsFormRef.current.toggleVisibility()
    blogService.createBlog(blogObject).then(returnedBlog => {
      const hasUserName = returnedBlog.user && returnedBlog.user.name
      const blogToAdd = hasUserName
        ? returnedBlog
        : {
          ...returnedBlog,
          user: {
            id: returnedBlog.user,
            username: user?.username,
            name: user?.name,
          }
        }
      setBlogs(prev => prev.concat(blogToAdd))
      setMessage({ message: 'a new blog ' + blogToAdd.title + ' by ' + blogToAdd.author + ' added', type: 'success' })
      setTimeout(() => {
        setMessage({ message: null, type: null })
      }, 5000)
    })

  }

  const blogsFormRef = useRef()

  if(user === null){
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification message={message?.message} type={message?.type}/>
        <form onSubmit={onLogin}>
          <label>
            username
            <input
              type="text"
              value={username}
              onChange={({ target }) => setUsername(target.value)}/>
          </label>
          <br></br>
          <label>
            password
            <input
              type="password"
              value={password}
              onChange={({ target }) => setPassword(target.value)}/>
          </label>
          <br></br>
          <button type="submit">login</button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={message?.message} type={message?.type}/>
      <div>
        <p>{user.name} logged in.</p>
        <button onClick={onLogout}>logout</button> <br/><br/>
        <Toggleable acceptButtonLabel="Create new blog" cancelButtonLabel="Cancel" ref={blogsFormRef}>
          <BlogForm onCreate={onCreate}/>
        </Toggleable><br/><br/>
        {
          blogs.sort((a, b) => b.likes - a.likes).map(blog => <Blog key={blog.id} blog={blog} user={user} setBlogs={setBlogs}/>)
        }
      </div>
    </div>
  )
}

export default App