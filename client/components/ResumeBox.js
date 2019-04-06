import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'

import {Category} from './index'

class ResumeBox extends Component {
  constructor() {
    super()
    this.state = {
      categories: [1, 4]
    }
  }

  render() {
    console.log('ResumeBox state', this.state)

    return (
      <div id="components-holder">
        <Category activeCategories={this.state.categories} />
      </div>
    )
  }
}

export default withRouter(ResumeBox)
