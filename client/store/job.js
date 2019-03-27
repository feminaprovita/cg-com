import axios from 'axios'

export const RECEIVE_ALL_JOBS = 'RECEIVE_ALL_JOBS'
export const RECEIVE_ONE_JOB = 'RECEIVE_ONE_JOB'

export const receiveAllJobs = jobs => ({type: RECEIVE_ALL_JOBS, jobs})

export const receiveOneJob = jobId => ({type: RECEIVE_ONE_JOB, jobId})

export const fetchAllJobs = () => {
  return async dispatch => {
    const {data} = await axios.get(`/api/jobs/`)
    dispatch(receiveAllJobs(data))
  }
}

export const fetchOneJob = jobId => {
  return async dispatch => {
    const {data} = await axios.get(`/api/jobs/${jobId}`)
    dispatch(receiveAllJobs(data))
  }
}

const initialState = {
  categories: [],
  jobs: [],
  currentJob: {}
}

const job = (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_ALL_JOBS:
      return {...state, jobs: action.jobs}
    case RECEIVE_ONE_JOB:
      return {...state, currentJob: action.currentJob}
    default:
      return state
  }
}

export default job
