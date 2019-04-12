import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
// import affiliation from './affiliation'
// import blog from './blog'
import category from './category'
// import job from './job'
// import presentation from './presentation'
import project from './project'
// import publication from './publication'
// import school from './school'
// import skill from './skill'

const reducer = combineReducers({
  // affiliation,
  // blog,
  category,
  // job,
  // presentation,
  project
  // publication,
  // school,
  // skill
})

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

// export * from './affiliation'
// export * from './blog'
export * from './category'
// export * from './job'
// export * from './presentation'
export * from './project'
// export * from './publication'
// export * from './school'
// export * from './skill'

export default store
