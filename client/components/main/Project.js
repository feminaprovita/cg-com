import React, {Component, Fragment} from 'react'
import {withRouter} from 'react-router-dom'
import ProjectOne from './ProjectOne'

class Project extends Component {
  render() {
    console.log('prop categories', this.props.categories)
    let activeCatIds = []
    this.props.categories.forEach(c => activeCatIds.push(c.id))
    let projects = []
    this.props.projects.forEach(p => {
      if (activeCatIds.includes(p.categoryId)) {
        projects.push(p)
      } else console.log('nope', p)
    })

    console.log('projects', projects)
    return (
      <Fragment id="project-component">
        {projects.map(p => <ProjectOne project={p} />)}
      </Fragment>
    )
  }
}

export default withRouter(Project)
