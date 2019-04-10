import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import axios from 'axios'
import {Category} from './index'

class ResumeBox extends Component {
  constructor() {
    super()
    this.state = {
      categories: []
    }
  }

  async componentDidMount() {
    const {data} = await axios.get('/api/categories/1')
    this.setState({categories: [data]})
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
