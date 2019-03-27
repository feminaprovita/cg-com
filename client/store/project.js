import axios from 'axios'

export const RECEIVE_ALL_PROJECTS = 'RECEIVE_ALL_PROJECTS'
export const RECEIVE_ONE_PROJECT = 'RECEIVE_ONE_PROJECT'

export const receiveAllProjects = projects => ({
  type: RECEIVE_ALL_PROJECTS,
  projects
})

export const receiveOneProject = projectId => ({
  type: RECEIVE_ONE_PROJECT,
  projectId
})

export const fetchAllProjects = () => {
  return async dispatch => {
    const {data} = await axios.get(`/api/projects/`)
    dispatch(receiveAllProjects(data))
  }
}

export const fetchOneProject = projectId => {
  return async dispatch => {
    const {data} = await axios.get(`/api/projects/${projectId}`)
    dispatch(receiveAllProjects(data))
  }
}

const initialState = {
  categories: [],
  projects: [],
  currentProject: {}
}

const project = (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_ALL_PROJECTS:
      return {...state, projects: action.projects}
    case RECEIVE_ONE_PROJECT:
      return {...state, currentProject: action.currentProject}
    default:
      return state
  }
}

export default project
