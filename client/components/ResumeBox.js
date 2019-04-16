import React, {Component} from 'react'
import {Category} from './index'

class ResumeBox extends Component {
  render() {
    return (
      <div id="components-holder">
        <Category />
      </div>
    )
  }
}

export default ResumeBox

// this is now needless extraction, bc all the good stuff is happening in categories
