import axios from 'axios'

export const RECEIVE_ALL_BLOGS = 'RECEIVE_ALL_BLOGS'
export const RECEIVE_ONE_BLOG = 'RECEIVE_ONE_BLOG'

export const receiveAllBlogs = blogs => ({type: RECEIVE_ALL_BLOGS, blogs})

export const receiveOneBlog = blogId => ({type: RECEIVE_ONE_BLOG, blogId})

export const fetchAllBlogs = () => {
  return async dispatch => {
    const {data} = await axios.get(`/api/blogs/`)
    dispatch(receiveAllBlogs(data))
  }
}

export const fetchOneBlog = blogId => {
  return async dispatch => {
    const {data} = await axios.get(`/api/blogs/${blogId}`)
    dispatch(receiveAllBlogs(data))
  }
}

const initialState = {
  categories: [],
  blogs: [],
  currentBlog: {}
}

export function reducer(state = initialState, action) {
  switch (action.type) {
    case RECEIVE_ALL_BLOGS:
      return {...state, blogs: action.blogs}
    case RECEIVE_ONE_BLOG:
      return {...state, currentBlog: action.currentBlog}
    default:
      return state
  }
}

export default blog
