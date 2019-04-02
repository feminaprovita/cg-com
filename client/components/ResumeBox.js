import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import axios from 'axios'

import {
  Affiliation,
  // Blog,
  // Category,
  // Job,
  // Presentation,
  Project
  // Publication,
  // School,
  // Skill
} from './index'
import {
  dummyProjects,
  dummyAffiliations,
  dummyCategories
} from '../../scrap/hold'

class ResumeBox extends Component {
  constructor() {
    super()
    this.state = {
      categories: []
    }
  }

  async componentDidMount() {
    console.log('ResumeBox component mounting')
    const {data} = await axios.get('/api/categories')
    this.setState({
      categories: data || 0
    })
  }
  render() {
    console.log('ResumeBox state', this.state)
    let activeCatIds = []
    this.state.categories.forEach(c => activeCatIds.push(c.id))
    // console.log('activeCatIds', activeCatIds)
    return (
      <div id="components-dummy">
        {/* <Category /> */}
        <Affiliation
          categories={activeCatIds}
          affiliations={dummyAffiliations}
        />
        {/* <Blog />
      <Job />
      <Presentation /> */}
        <Project categories={activeCatIds} projects={dummyProjects} />
        {/* <Publication />
      <School />
      <Skill /> */}
      </div>
    )
  }
}

export default withRouter(ResumeBox)
