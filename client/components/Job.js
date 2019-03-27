import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {receiveAllJobs, receiveOneJob} from '../store'

class Job extends Component {
  constructor(props) {
    super(props)
    this.state = {
      categories: this.props.categories || [0],
      jobs: []
    }
  }

  render() {
    return <div id="job-component">Job component test</div>
  }
}

const mapStateToProps = state => ({jobs: state.jobs})

const mapDispatchToProps = dispatch => ({
  receiveAllJobs: job => dispatch(receiveAllJobs(job)),
  receiveOneJob: jobId => dispatch(receiveOneJob(jobId))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Job))
