import axios from 'axios'

export const RECEIVE_ALL_CATEGORIES = 'RECEIVE_ALL_CATEGORIES'
export const RECEIVE_ONE_CATEGORY = 'RECEIVE_ONE_CATEGORY'
// toggle functions on handleClick -- default code only

export const receiveAllCategories = categories => ({
  type: RECEIVE_ALL_CATEGORIES,
  categories
})

export const receiveOneCategory = categoryId => ({
  type: RECEIVE_ONE_CATEGORY,
  categoryId
})

export const fetchAllCategories = () => {
  return async dispatch => {
    const {data} = await axios.get(`/api/categories/`)
    dispatch(receiveAllCategories(data))
  }
}

export const fetchOneCategory = categoryId => {
  return async dispatch => {
    const {data} = await axios.get(`/api/categories/${categoryId}`)
    dispatch(receiveAllCategories(data))
  }
}

const initialState = {
  categories: [],
  currentCategories: []
}

const category = (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_ALL_CATEGORIES:
      return {...state, categories: action.categories}
    case RECEIVE_ONE_CATEGORY:
      return {...state, currentCategory: action.currentCategory}
    default:
      return state
  }
}

export default category
