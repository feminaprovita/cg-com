/* eslint-disable complexity */
import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import axios from 'axios'

class School extends Component {
  constructor() {
    super()
    this.state = {
      schools: []
    }
  }

  async componentDidMount() {
    const {data} = await axios.get('/api/schools')
    this.setState({schools: data})
  }

  render() {
    // console.log('school props', this.props)
    console.log('school state', this.state)
    const schools = this.state.schools
    let focusSchools = []
    this.state.schools.forEach(s => {
      s.slug = s.shortName
        .replace(/[^\d\w\s]/g, '')
        .toLowerCase()
        .replace(/[^\d\w]/g, '-')
      s.keyName = s.slug + '-component'
      if (this.props.categories.includes(s.categoryId)) {
        focusSchools.push(s.shortName)
      }
    })
    // console.log('schools', schools)

    return (
      <div id="school-component">
        <h2>Education</h2>
        {schools.map(s => {
          return (
            <div className="one-school" key={s.keyName}>
              {focusSchools.includes(s.shortName) ? (
                <h4>{s.fullName}</h4>
              ) : (
                <h4>{s.shortName}</h4>
              )}
              {s.major ? (
                <p>
                  <a href={s.url} target="blank">
                    {s.degree} in {s.major}
                  </a>
                </p>
              ) : (
                <p>
                  <a href={s.url} target="blank">
                    {s.degree}
                  </a>
                </p>
              )}
              <p>
                <b>{s.graduation}</b>, {s.location}
              </p>
              {focusSchools.includes(s.shortName) && s.thesis ? (
                <p>
                  Thesis: <i>{s.thesis}</i>
                  <br />Advisor: {s.advisor}
                </p>
              ) : (
                <div />
              )}
              {focusSchools.includes(s.shortName) && s.detail ? (
                <p>{s.detail}</p>
              ) : (
                <div />
              )}
              {focusSchools.includes(s.shortName) && s.projects.length > 0 ? (
                <ul>{s.projects.map((p, i) => <li key={i}>{p.name}</li>)}</ul>
              ) : (
                <div />
              )}
            </div>
          )
        })}
      </div>
    )
  }
}

export default withRouter(School)
