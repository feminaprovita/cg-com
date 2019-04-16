import axios from 'axios'

export const TOGGLE_CATEGORY = 'TOGGLE_CATEGORY'

export const toggleCategory = categoryId => ({
  type: TOGGLE_CATEGORY,
  categoryId
})

export const flipCategory = categoryId => {
  return async dispatch => {
    const {data} = await axios.get(`/api/categories/${categoryId}`, categoryId)
    dispatch(toggleCategory(data))
  }
}

const initialState = {
  categories: {
    1: true,
    2: false,
    3: false,
    4: false
  }
}

const category = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_CATEGORY:
      return {
        ...state,
        categories: {
          ...state.categories,
          [action.categoryId]: !state.categories[action.categoryId]
        }
      }
    default:
      return state
  }
}

export default category
