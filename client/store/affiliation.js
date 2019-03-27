import axios from 'axios'

export const RECEIVE_ALL_AFFILIATIONS = 'RECEIVE_ALL_AFFILIATIONS'
export const RECEIVE_ONE_AFFILIATION = 'RECEIVE_ONE_AFFILIATION'

export const receiveAllAffiliations = affiliations => ({
  type: RECEIVE_ALL_AFFILIATIONS,
  affiliations
})

export const receiveOneAffiliation = affiliationId => ({
  type: RECEIVE_ONE_AFFILIATION,
  affiliationId
})

export const fetchAllAffiliations = () => {
  return async dispatch => {
    const {data} = await axios.get(`/api/affiliations/`)
    dispatch(receiveAllAffiliations(data))
  }
}

export const fetchOneAffiliation = affiliationId => {
  return async dispatch => {
    const {data} = await axios.get(`/api/affiliations/${affiliationId}`)
    dispatch(receiveAllAffiliations(data))
  }
}

const initialState = {
  categories: [],
  affiliations: [],
  currentAffiliation: {}
}

const affiliation = (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_ALL_AFFILIATIONS:
      return {...state, affiliations: action.affiliations}
    case RECEIVE_ONE_AFFILIATION:
      return {...state, currentAffiliation: action.currentAffiliation}
    default:
      return state
  }
}

export default affiliation
