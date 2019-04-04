import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import axios from 'axios'
import ProjectOne from './ProjectOne'

class Project extends Component {
  constructor() {
    super()
    this.state = {
      projects: []
    }
  }

  async componentDidMount() {
    const {data} = await axios.get('/api/projects')
    this.setState({projects: data})
  }

  render() {
    // console.log('Project props', this.props)
    // console.log('Project state', this.state)
    let projects = []
    this.state.projects.forEach(p => {
      p.slug = p.name
        .replace(/[^\d\w\s]/g, '')
        .toLowerCase()
        .replace(/[^\d\w]/g, '-')
      p.keyName = p.slug + '-component'
      if (this.props.categories.includes(p.categoryId)) {
        projects.push(p)
      }
    })

    // console.log('projects', projects)
    return (
      <div id="project-component">
        {projects.length > 0 ? <h2>Projects</h2> : <div id="no-projects" />}
        {projects.map(p => <ProjectOne key={p.keyName} project={p} />)}
      </div>
    )
  }
}

export default withRouter(Project)