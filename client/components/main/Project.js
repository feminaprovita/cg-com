import React, {Component} from 'react'
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
    let currentProjects = data.filter(p => this.props.categories[p.categoryId])
    this.setState({projects: currentProjects})
  }

  async componentDidUpdate(prevProps) {
    const latest = this.props.categories
    const prev = prevProps.categories
    if (latest !== prev) {
      const {data} = await axios.get('/api/projects')
      let currentProjects = data.filter(
        p => this.props.categories[p.categoryId]
      )
      this.setState({projects: currentProjects})
    }
  }

  render() {
    this.state.projects.forEach(p => {
      p.slug = p.name
        .replace(/[^\d\w\s]/g, '')
        .toLowerCase()
        .replace(/[^\d\w]/g, '-')
      p.keyName = p.slug + '-component'
    })
    console.log('Project state', this.state.projects)

    return (
      <div id="project-component">
        {this.state.projects.length > 0 ? (
          <h2>Projects</h2>
        ) : (
          <div id="no-projects" />
        )}
        {/* {this.state.projects.length > 0 ? (<h2>Projects</h2>) : (<p>no projects detected (debugging version)</p>)} */}
        {this.state.projects.map(p => (
          <ProjectOne key={p.keyName} project={p} />
        ))}
      </div>
    )
  }
}

export default Project
