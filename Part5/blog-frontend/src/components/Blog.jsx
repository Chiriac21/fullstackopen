import { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, user, setBlogs }) => {
  const [infoVisilibity, setInfoVisibility] = useState(true)
  const [likesNumber, setLikesNumber] = useState(blog.likes)  

  const deleteVisibility = user && blog.user.username === user.username ? false : true
  const deleteButtonStyle = { display: deleteVisibility ? 'none' : '' }

  const onBlogLiked = async () => {
    // Send only the changed field(s) to avoid accidentally overwriting
    // the `user` relation on the server with a malformed value.
    const updatedBlog = {
      likes: likesNumber + 1,
    }

    const returned = await blogService.likeBlog(blog.id, updatedBlog)
    // update local likes and also keep parent list in sync if setter provided
    setLikesNumber(returned.likes)
    if (typeof setBlogs === 'function') {
      setBlogs(prev => prev.map(b => b.id === blog.id ? returned : b))
    }
  }

  const toggleInfoVisiblity = () => {
    setInfoVisibility(!infoVisilibity)
  }

  const onDeleteBlog = async () => {
    const isConfirmed = window.confirm(`Remove blog "${blog.title}" by ${blog.author}?`);
    if (isConfirmed) {
      try {
        await blogService.deleteBlog(blog.id);
        setBlogs(prevBlogs => prevBlogs.filter(b => b.id !== blog.id));
      } catch (error) {
        console.error("Error deleting blog:", error);
      }
    }
  }

  const hideWhenVisible = { display: infoVisilibity ? '' : 'none' };
  const showWhenVisible = { display: infoVisilibity ? 'none' : '' };

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return(
  <div style={blogStyle} data-testid="blog">
    <div id="visible">{blog.title} {blog.author}</div>
    <div style={hideWhenVisible}>
       <button onClick={toggleInfoVisiblity}>View</button>
    </div>
    <div style={showWhenVisible} id="hidden">
        <p>{blog.url}</p>
        <p>likes {likesNumber} <button onClick={onBlogLiked}>like</button></p>
        <p>{blog.user.name}</p>
        <button onClick={toggleInfoVisiblity}>Hide</button>
    </div>
    <div style={deleteButtonStyle}>
      <button onClick={onDeleteBlog}>Remove</button>
    </div>
  </div> 
  ) 
}

export default Blog