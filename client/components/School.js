import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {receiveAllSchools, receiveOneSchool} from '../store'

class School extends Component {
  constructor(props) {
    super(props)
    this.state = {
      categories: this.props.categories || [0],
      schools: []
    }
  }

  render() {
    return <div id="school-component">School component test</div>
  }
}

const mapStateToProps = state => ({schools: state.schools})

const mapDispatchToProps = dispatch => ({
  receiveAllSchools: school => dispatch(receiveAllSchools(school)),
  receiveOneSchool: schoolId => dispatch(receiveOneSchool(schoolId))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(School))
