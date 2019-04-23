import React, {Component} from 'react'
import axios from 'axios'
import ProjectOne from './ProjectOne'

class Project extends Component {
  constructor() {
    super()
    this.state = {
      allProjects: [],
      filteredProjects: []
    }
  }

  async componentDidMount() {
    const {data} = await axios.get('/api/projects')
    let currentProjects = data.filter(p => this.props.categories[p.categoryId])
    this.setState({
      allProjects: data,
      filteredProjects: currentProjects
    })
  }

  componentDidUpdate(prevProps, prevState) {
    const latest = this.props.categories
    const prev = prevProps.categories
    if (latest !== prev) {
      let currentProjects = prevState.allProjects.filter(
        p => this.props.categories[p.categoryId]
      )
      this.setState({filteredProjects: currentProjects})
    }
  }

  render() {
    this.state.allProjects.forEach(p => {
      if(!p.slug) {
        p.slug = p.name
          .replace(/[^\d\w\s]/g, '')
          .toLowerCase()
          .replace(/[^\d\w]/g, '-')
        p.keyName = p.slug + '-component'
      }
    })
    console.log('Project state', this.state)

    return (
      <div className="resume-component">
        {this.state.filteredProjects.length > 0 ? (
          <div id="project-component">
            <h1>Projects</h1>
            {this.state.filteredProjects.map(p => (
              <ProjectOne key={p.keyName} project={p} />
            ))}
          </div>
        ) : (
          <span id="no-projects" />
        )}
      </div>
    )
  }
}

export default Project
