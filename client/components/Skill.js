import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {receiveAllSkills, receiveOneSkill} from '../store'

class Skill extends Component {
  constructor(props) {
    super(props)
    this.state = {
      categories: this.props.categories || [0],
      skills: []
    }
  }

  render() {
    return <div id="skill-component" />
  }
}

const mapStateToProps = state => ({skills: state.skills})

const mapDispatchToProps = dispatch => ({
  receiveAllSkills: skill => dispatch(receiveAllSkills(skill)),
  receiveOneSkill: skillId => dispatch(receiveOneSkill(skillId))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Skill))
