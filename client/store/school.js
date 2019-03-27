import axios from 'axios'

export const RECEIVE_ALL_SCHOOLS = 'RECEIVE_ALL_SCHOOLS'
export const RECEIVE_ONE_SCHOOL = 'RECEIVE_ONE_SCHOOL'

export const receiveAllSchools = schools => ({
  type: RECEIVE_ALL_SCHOOLS,
  schools
})

export const receiveOneSchool = schoolId => ({
  type: RECEIVE_ONE_SCHOOL,
  schoolId
})

export const fetchAllSchools = () => {
  return async dispatch => {
    const {data} = await axios.get(`/api/schools/`)
    dispatch(receiveAllSchools(data))
  }
}

export const fetchOneSchool = schoolId => {
  return async dispatch => {
    const {data} = await axios.get(`/api/schools/${schoolId}`)
    dispatch(receiveAllSchools(data))
  }
}

const initialState = {
  categories: [],
  schools: [],
  currentSchools: {}
}

const school = (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_ALL_SCHOOLS:
      return {...state, schools: action.schools}
    case RECEIVE_ONE_SCHOOL:
      return {...state, currentSchools: action.currentSchools}
    default:
      return state
  }
}

export default school
