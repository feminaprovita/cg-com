import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {receiveAllProjects, receiveOneProject} from '../store'

class Project extends Component {
  constructor(props) {
    super(props)
    this.state = {
      categories: this.props.categories || [0],
      projects: []
    }
  }

  render() {
    return <div id="project-component">Project component test</div>
  }
}

const mapStateToProps = state => ({projects: state.projects})

const mapDispatchToProps = dispatch => ({
  receiveAllProjects: project => dispatch(receiveAllProjects(project)),
  receiveOneProject: projectId => dispatch(receiveOneProject(projectId))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Project))
