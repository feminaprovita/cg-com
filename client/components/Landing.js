import React from 'react'
import {withRouter} from 'react-router-dom'
import {Profile, ResumeBox} from './index'

const Landing = () => (
  <div id="landing-container">
    <Profile />
    <ResumeBox />
  </div>
)

export default withRouter(Landing)
