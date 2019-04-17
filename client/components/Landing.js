import React from 'react'
import {withRouter} from 'react-router-dom'
import {Profile, Category} from './index'

const Landing = () => (
  <div id="landing-container">
    <Profile />
    <Category />
  </div>
)

export default Landing
