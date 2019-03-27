import React from 'react'
import {withRouter} from 'react-router-dom'
import {
  Profile,
  Affiliation,
  Blog,
  Category,
  Job,
  Presentation,
  Project,
  Publication,
  School,
  Skill
} from './index'

const Landing = () => (
  <div id="landing-container">
    <Profile />
    <div id="component-tests">
      <Category />
      <Affiliation />
      <Blog />
      <Job />
      <Presentation />
      <Project />
      <Publication />
      <School />
      <Skill />
    </div>
  </div>
)

export default withRouter(Landing)
