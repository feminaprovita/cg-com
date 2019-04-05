import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import axios from 'axios'

class Skill extends Component {
  constructor() {
    super()
    this.state = {
      skills: []
    }
  }

  async componentDidMount() {
    const {data} = await axios.get('/api/skills')
    this.setState({skills: data})
  }

  render() {
    // console.log('skill props', this.props)
    console.log('skill state', this.state)
    let skills = []
    let familiarSkills = []
    let proficientSkills = []
    let expertSkills = []
    this.state.skills.forEach(s => {
      s.slug = s.name
        .replace(/[^\d\w\s]/g, '')
        .toLowerCase()
        .replace(/[^\d\w]/g, '-')
      s.keyName = s.slug + '-component'
      if (this.props.categories.includes(s.categoryId)) {
        skills.push(s.name)
        if (s.level === 'familiar') familiarSkills.push(s.name)
        if (s.level === 'proficient') proficientSkills.push(s.name)
        if (s.level === 'expert') expertSkills.push(s.name)
      }
    })
    // console.log('skills', skills)
    // console.log('familiarSkills', familiarSkills)
    // console.log('proficientSkills', proficientSkills)
    // console.log('expertSkills', expertSkills)

    return (
      <div id="skill-component">
        <h2>Skills</h2>
        {expertSkills.length > 1 ? (
          <div id="expert-skill-list">
            <h4>Expert:</h4>
            <ul>{expertSkills.map((s, i) => <li key={i}>{s}</li>)}</ul>
          </div>
        ) : (
          <div />
        )}
        {proficientSkills.length > 1 ? (
          <div id="proficient-skill-list">
            <h4>Proficient:</h4>
            <ul>{proficientSkills.map((s, i) => <li key={i}>{s}</li>)}</ul>
          </div>
        ) : (
          <div />
        )}
        {familiarSkills.length > 1 ? (
          <div id="familiar-skill-list">
            <h4>Familiar:</h4>
            <ul>{familiarSkills.map((s, i) => <li key={i}>{s}</li>)}</ul>
          </div>
        ) : (
          <div />
        )}
      </div>
    )
  }
}

export default withRouter(Skill)
