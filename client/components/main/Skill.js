import React, {Component} from 'react'
import axios from 'axios'

class Skill extends Component {
  constructor() {
    super()
    this.state = {
      skills: [],
      familiarSkills: [],
      proficientSkills: [],
      expertSkills: []
    }
  }

  async componentDidMount() {
    const {data} = await axios.get('/api/skills')
    let currentSkills = data.filter(s => this.props.categories[s.categoryId])
    let fam = currentSkills.filter(s => s.level === 'familiar')
    let prof = currentSkills.filter(s => s.level === 'proficient')
    let exp = currentSkills.filter(s => s.level === 'expert')
    this.setState({
      skills: currentSkills,
      familiarSkills: fam,
      proficientSkills: prof,
      expertSkills: exp
    })
  }

  async componentDidUpdate(prevProps) {
    const latest = this.props.categories
    const prev = prevProps.categories
    if (latest !== prev) {
      const {data} = await axios.get('/api/skills')
      let currentSkills = data.filter(s => this.props.categories[s.categoryId])
      let fam = currentSkills.filter(s => s.level === 'familiar')
      let prof = currentSkills.filter(s => s.level === 'proficient')
      let exp = currentSkills.filter(s => s.level === 'expert')
      this.setState({
        skills: currentSkills,
        familiarSkills: fam,
        proficientSkills: prof,
        expertSkills: exp
      })
    }
  }

  render() {
    this.state.skills.forEach(s => {
      s.slug = s.name
        .replace(/[^\d\w\s/]/g, '')
        .toLowerCase()
        .replace(/[^\d\w]/g, '-')
      s.keyName = s.slug + '-component'
    })
    console.log('Skill state', this.state)

    return (
      <div className="resume-component">
        {this.state.skills.length > 0 ? (
          <div id="skill-component">
            <h1>Skills</h1>
            {this.state.expertSkills.length > 0 ? (
              <div id="expert-skill-list">
                <h4>Expert:</h4>
                <ul>
                  {this.state.expertSkills.map((s, i) => (
                    <li key={i}>{s.name}</li>
                  ))}
                </ul>
              </div>
            ) : (
              <span />
            )}
            {this.state.proficientSkills.length > 0 ? (
              <div id="proficient-skill-list">
                <h4>Proficient:</h4>
                <ul>
                  {this.state.proficientSkills.map((s, i) => (
                    <li key={i}>{s.name}</li>
                  ))}
                </ul>
              </div>
            ) : (
              <span />
            )}
            {this.state.familiarSkills.length > 0 ? (
              <div id="familiar-skill-list">
                <h4>Familiar:</h4>
                <ul>
                  {this.state.familiarSkills.map((s, i) => (
                    <li key={i}>{s.name}</li>
                  ))}
                </ul>
              </div>
            ) : (
              <span />
            )}
          </div>
        ) : (
          <span id="no-skills" />
        )}
      </div>
    )
  }
}

export default Skill
