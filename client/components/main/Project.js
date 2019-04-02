import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import ProjectOne from './ProjectOne'

class Project extends Component {
  render() {
    console.log('prop categories', this.props.categories)
    let activeCatIds = []
    this.props.categories.forEach(c => activeCatIds.push(c.id))
    let projects = []
    this.props.projects.forEach(p => {
      p.slug = p.name
        .replace(/[^\d\w\s]/g, '')
        .toLowerCase()
        .replace(/[^\d\w]/g, '-')
      p.keyName = p.slug + '-component'
      if (activeCatIds.includes(p.categoryId)) {
        projects.push(p)
      } else console.log('nope', p)
    })

    console.log('projects', projects)
    return (
      <div id="project-component">
        {projects.map(p => <ProjectOne key={p.keyName} project={p} />)}
      </div>
    )
  }
}

export default withRouter(Project)
