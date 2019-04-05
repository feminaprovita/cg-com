import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'

import {
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

class ResumeBox extends Component {
  constructor() {
    super()
    this.state = {
      categories: [1, 2]
    }
  }

  render() {
    console.log('ResumeBox state', this.state)

    return (
      <div id="components-holder">
        <Category activeCategories={this.state.categories} />
        <Project categories={this.state.categories} />
        <Blog categories={this.state.categories} />
        <Presentation categories={this.state.categories} />
        <Publication categories={this.state.categories} />
        <School categories={this.state.categories} />
        <Job categories={this.state.categories} />
        <Affiliation categories={this.state.categories} />
        <Skill categories={this.state.categories} />
      </div>
    )
  }
}

export default withRouter(ResumeBox)
