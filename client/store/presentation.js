import axios from 'axios'

export const RECEIVE_ALL_PRESENTATIONS = 'RECEIVE_ALL_PRESENTATIONS'
export const RECEIVE_ONE_PRESENTATION = 'RECEIVE_ONE_PRESENTATION'

export const receiveAllPresentations = presentations => ({
  type: RECEIVE_ALL_PRESENTATIONS,
  presentations
})

export const receiveOnePresentation = presentationId => ({
  type: RECEIVE_ONE_PRESENTATION,
  presentationId
})

export const fetchAllPresentations = () => {
  return async dispatch => {
    const {data} = await axios.get(`/api/presentations/`)
    dispatch(receiveAllPresentations(data))
  }
}

export const fetchOnePresentation = presentationId => {
  return async dispatch => {
    const {data} = await axios.get(`/api/presentations/${presentationId}`)
    dispatch(receiveAllPresentations(data))
  }
}

const initialState = {
  categories: [],
  presentations: [],
  currentPresentation: {}
}

const presentation = (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_ALL_PRESENTATIONS:
      return {...state, presentations: action.presentations}
    case RECEIVE_ONE_PRESENTATION:
      return {...state, currentPresentation: action.currentPresentation}
    default:
      return state
  }
}

export default presentation
