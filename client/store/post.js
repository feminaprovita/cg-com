import axios from 'axios'

export const RECEIVE_ALL_POSTS = 'RECEIVE_ALL_POSTS'
export const RECEIVE_ONE_POST = 'RECEIVE_ONE_POST'

export const receiveAllPosts = posts => ({type: RECEIVE_ALL_POSTS, posts})

export const receiveOnePost = postId => ({type: RECEIVE_ONE_POST, postId})

export const fetchAllPosts = () => {
  return async dispatch => {
    const {data} = await axios.get(`/api/posts/`)
    dispatch(receiveAllPosts(data))
  }
}

export const fetchOnePost = postId => {
  return async dispatch => {
    const {data} = await axios.get(`/api/posts/${postId}`)
    dispatch(receiveAllPosts(data))
  }
}

const initialState = {
  categories: [],
  posts: [],
  currentPost: {}
}

export function reducer(state = initialState, action) {
  switch (action.type) {
    case RECEIVE_ALL_POSTS:
      return {...state, posts: action.posts}
    case RECEIVE_ONE_POST:
      return {...state, currentPost: action.currentPost}
    default:
      return state
  }
}

export default post
