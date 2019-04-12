import axios from 'axios'

export const RECEIVE_ALL_CATEGORIES = 'RECEIVE_ALL_CATEGORIES'
export const RECEIVE_CURRENT_CATEGORIES = 'RECEIVE_CURRENT_CATEGORIES'
export const RECEIVE_ONE_CATEGORY = 'RECEIVE_ONE_CATEGORY'
export const TOGGLE_CATEGORY = 'TOGGLE_CATEGORY'

export const receiveAllCategories = () => ({
  type: RECEIVE_ALL_CATEGORIES
})

export const receiveCurrentCategories = categories => ({
  type: RECEIVE_CURRENT_CATEGORIES,
  categories
})

export const receiveOneCategory = categoryId => ({
  type: RECEIVE_ONE_CATEGORY,
  categoryId
})

export const toggleCategory = categoryId => ({
  type: TOGGLE_CATEGORY,
  categoryId
})

export const fetchAllCategories = () => {
  return async dispatch => {
    const {data} = await axios.get(`/api/categories/`)
    dispatch(receiveAllCategories(data))
  }
}

export const fetchCurrentCategories = categories => {
  return async dispatch => {
    const {data} = await axios.get(`/api/categories/`, categories)
    let activeCat = []
    categories.forEach(c => {
      data.forEach(ca => {
        if (c.id === ca.id) activeCat.push(ca)
      })
    })
    dispatch(receiveCurrentCategories(activeCat))
  }
}

export const fetchOneCategory = categoryId => {
  return async dispatch => {
    const {data} = await axios.get(`/api/categories/${categoryId}`, categoryId)
    dispatch(receiveOneCategory(data))
  }
}

export const flipCategory = categoryId => {
  return async dispatch => {
    const {data} = await axios.get(`/api/categories/${categoryId}`, categoryId)
    dispatch(toggleCategory(data))
  }
}

const initialState = {
  categories: [],
  allCategories: [],
  currentCategories: [],
  thisCategory: {}
}

const category = (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_ALL_CATEGORIES:
      return {...state, categories: action.categories}
    case RECEIVE_CURRENT_CATEGORIES:
      return {...state, currentCategories: action.currentCategories}
    case RECEIVE_ONE_CATEGORY:
      console.log(action)
      if (state.currentCategories.length < 1)
        return {
          ...state,
          currentCategories: [action.thisCategory],
          thisCategory: action.thisCategory
        }
      else return {...state, thisCategory: action.thisCategory}
    // eslint-disable-next-line no-case-declarations
    case TOGGLE_CATEGORY:
      let testVariable
      state.currentCategories.forEach(cat => {
        if (cat === action.thisCategory.id) testVariable = true
      })
      if (testVariable) {
        return {
          ...state,
          currentCategories: [
            ...state.currentCategories,
            action.currentCategories
          ]
        }
      } else {
        let outputCats = state.currentCategories.filter(
          c => c.id !== action.thisCategory.id
        )
        return {...state, currentCategories: outputCats}
      }
    default:
      return state
  }
}

export default category
