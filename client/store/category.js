import axios from 'axios'

export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES'
export const TOGGLE_CATEGORY = 'TOGGLE_CATEGORY'

export const receiveCategories = categoryIdsArr => ({
  type: RECEIVE_CATEGORIES,
  categoryIdsArr
})

export const toggleCategory = categoryId => ({
  type: TOGGLE_CATEGORY,
  categoryId
})

export const fetchCategories = categoryIdsArr => {
  return async dispatch => {
    const {data} = await axios.get(`/api/categories/`, categoryIdsArr)
    console.log('fetchCat data', data)
    let activeCatIds = []
    categoryIdsArr.forEach(c => {
      data.forEach(ca => {
        if (c === ca.id) activeCatIds.push(ca)
      })
    })
    dispatch(receiveCategories(activeCatIds))
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
  categoryIds: [],
  thisCategory: {}
}

const category = (state = initialState, action) => {
  // console.log('action type', action)
  switch (action.type) {
    case RECEIVE_CATEGORIES:
      return {...state, categories: action.categories}
    // eslint-disable-next-line no-case-declarations
    case TOGGLE_CATEGORY:
      let testVariable
      state.categories.forEach(cat => {
        if (cat === action.thisCategory.id) testVariable = true
      })
      if (testVariable) {
        return {...state, categories: [...state.categories, action.categories]}
      } else {
        let outputCats = state.categories.filter(
          c => c.id !== action.thisCategory.id
        )
        return {...state, categories: outputCats}
      }
    default:
      return state
  }
}

export default category
