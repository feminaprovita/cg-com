import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import axios from 'axios'
import {Category} from './index'

class ResumeBox extends Component {
  constructor() {
    super()
    this.state = {
      categoriesR: []
    }
  }

  async componentDidMount() {
    const {data} = await axios.get('/api/categories/1')
    this.setState({categoriesR: [data]})
  }

  render() {
    // console.log('ResumeBox state', this.state)

    return (
      <div id="components-holder">
        <Category activeCategories={this.state.categoriesR} />
      </div>
    )
  }
}

export default withRouter(ResumeBox)
