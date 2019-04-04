import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import axios from 'axios'

import {
  Affiliation,
  Blog,
  // Category,
  // Job,
  // Presentation,
  Project
  // Publication,
  // School,
  // Skill
} from './index'

class ResumeBox extends Component {
  constructor() {
    super()
    this.state = {
      categories: [1, 2, 3, 4]
    }
  }

  render() {
    console.log('ResumeBox state', this.state)

    return (
      <div id="components-dummy">
        {/* <Category /> */}
        <Affiliation categories={this.state.categories} />
        <Blog categories={this.state.categories} />
        {/* <Job />
      <Presentation /> */}
        <Project categories={this.state.categories} />
        {/* <Publication />
      <School />
      <Skill /> */}
      </div>
    )
  }
}

export default withRouter(ResumeBox)
