import axios from 'axios'

export const RECEIVE_ALL_PUBLICATIONS = 'RECEIVE_ALL_PUBLICATIONS'
export const RECEIVE_ONE_PUBLICATION = 'RECEIVE_ONE_PUBLICATION'

export const receiveAllPublications = publications => ({
  type: RECEIVE_ALL_PUBLICATIONS,
  publications
})

export const receiveOnePublication = publicationId => ({
  type: RECEIVE_ONE_PUBLICATION,
  publicationId
})

export const fetchAllPublications = () => {
  return async dispatch => {
    const {data} = await axios.get(`/api/publications/`)
    dispatch(receiveAllPublications(data))
  }
}

export const fetchOnePublication = publicationId => {
  return async dispatch => {
    const {data} = await axios.get(`/api/publications/${publicationId}`)
    dispatch(receiveAllPublications(data))
  }
}

const initialState = {
  categories: [],
  publications: [],
  currentPublication: {}
}

const publication = (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_ALL_PUBLICATIONS:
      return {...state, publications: action.publications}
    case RECEIVE_ONE_PUBLICATION:
      return {...state, currentPublication: action.currentPublication}
    default:
      return state
  }
}

export default publication
