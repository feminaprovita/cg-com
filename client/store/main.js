import axios from 'axios'

export const RECEIVE_POSTS = 'RECEIVE_POSTS'

export const receivePosts = category => ({type: RECEIVE_POSTS, posts})

export const fetchPosts = category => {
  return async dispatch => {
    const {data} = await axios.get(`/api/posts/${category}`)
    dispatch(receivePosts(data))
  }
}

const initialState = {
  category: '',
  posts: []
}

export function reducer(state = initialState, action) {
  switch (action.type) {
    case RECEIVE_POSTS:
      return {...state, posts: action.posts}
    default:
      return state
  }
}
