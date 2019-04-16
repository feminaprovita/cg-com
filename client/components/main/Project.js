import React, {Component} from 'react'
import {connect} from 'react-redux'
import axios from 'axios'
import ProjectOne from './ProjectOne'
// import {filterProjects} from '../../store'

class Project extends Component {
  constructor() {
    super()
    this.state = {
      projects: []
    }
  }

  async componentDidMount() {
    console.log('project mounting')
    const {data} = await axios.get('/api/projects')
    let currentProjects = data.filter(p => this.props.categories[p.categoryId])
    this.setState({projects: currentProjects})
  }

  async componentDidUpdate(prevProps, prevState) {
    const latest = this.props.categories
    const prev = prevProps.categories
    if (latest !== prev) {
      console.log('project updating')
      const {data} = await axios.get('/api/projects')
      let currentProjects = data.filter(
        p => this.props.categories[p.categoryId]
      )
      this.setState({projects: currentProjects})
    }
  }

  render() {
    console.log('projects rendering')
    // console.log('Project props', this.props)
    console.log('Project state', this.state.projects)
    this.state.projects.forEach(p => {
      p.slug = p.name
        .replace(/[^\d\w\s]/g, '')
        .toLowerCase()
        .replace(/[^\d\w]/g, '-')
      p.keyName = p.slug + '-component'
    })

    return (
      <div id="project-component">
        {/* {this.state.projects.length > 0 ? <h2>Projects</h2> : <div id="no-projects" />} */}
        {this.state.projects.length > 0 ? (
          <h2>Projects</h2>
        ) : (
          <p>no projects detected</p>
        )}
        {this.state.projects.map(p => (
          <ProjectOne key={p.keyName} project={p} />
        ))}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  projects: state.project.projects
})

const mapDispatchToProps = dispatch => ({
  filterProjects: (projArr, catObj) => dispatch(filterProjects(projArr, catObj))
})

export default Project
