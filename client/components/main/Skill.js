import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import axios from 'axios'

class Skill extends Component {
  constructor() {
    super()
    this.state = {
      skills: [],
      allSkills: []
    }
  }

  async componentDidMount() {
    const {data} = await axios.get('/api/skills')
    let activeSkills = []
    this.props.categories.forEach(c => {
      data.forEach(sk => {
        if (c.id === sk.category.id) {
          activeSkills.push(sk)
        }
      })
    })
    this.setState({
      skills: activeSkills,
      allSkills: data
    })
  }

  render() {
    // console.log('skill props', this.props)
    // console.log('skill state', this.state.skills)
    let skills = []
    let familiarSkills = []
    let proficientSkills = []
    let expertSkills = []
    this.state.skills.forEach(s => {
      s.slug = s.name
        .replace(/[^\d\w\s/]/g, '')
        .toLowerCase()
        .replace(/[^\d\w]/g, '-')
      s.keyName = s.slug + '-component'
      this.props.categories.forEach(c => {
        if (c.id === s.categoryId) {
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
    })

    return (
      <div id="skill-component">
        {skills.length > 1 ? <h2>Skills</h2> : <div id="no-skills" />}
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

// misbehaving skills: excel, latin, french
