import axios from 'axios'

export const RECEIVE_ALL_SKILLS = 'RECEIVE_ALL_SKILLS'
export const RECEIVE_ONE_SKILL = 'RECEIVE_ONE_SKILL'

export const receiveAllSkills = skills => ({type: RECEIVE_ALL_SKILLS, skills})

export const receiveOneSkill = skillId => ({type: RECEIVE_ONE_SKILL, skillId})

export const fetchAllSkills = () => {
  return async dispatch => {
    const {data} = await axios.get(`/api/skills/`)
    dispatch(receiveAllSkills(data))
  }
}

export const fetchOneSkill = skillId => {
  return async dispatch => {
    const {data} = await axios.get(`/api/skills/${skillId}`)
    dispatch(receiveAllSkills(data))
  }
}

const initialState = {
  categories: [],
  skills: [],
  currentSkill: {}
}

export function reducer(state = initialState, action) {
  switch (action.type) {
    case RECEIVE_ALL_SKILLS:
      return {...state, skills: action.skills}
    case RECEIVE_ONE_SKILL:
      return {...state, currentSkill: action.currentSkill}
    default:
      return state
  }
}

export default skill
