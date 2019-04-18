import React, {Component} from 'react'
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
    this.setState({
      schools: data
    })
  }

  render() {
    this.state.schools.forEach(s => {
      s.slug = s.shortName
        .replace(/[^\d\w\s]/g, '')
        .toLowerCase()
        .replace(/[^\d\w]/g, '-')
      s.keyName = s.slug + '-component'
    })
    console.log('School state', this.state)

    return (
      <div className="resume-component">
        <div id="school-component">
          <h1>Education</h1>
          {this.state.schools.map(s => {
            return (
              <div className="one-school" key={s.keyName}>
                {this.props.categories[s.categoryId] ? (
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
                {this.props.categories[s.categoryId] && s.thesis ? (
                  <p>
                    Thesis: <i>{s.thesis}</i>
                    <br />Advisor: {s.advisor}
                  </p>
                ) : (
                  <span />
                )}
                {this.props.categories[s.categoryId] && s.detail ? (
                  <p>{s.detail}</p>
                ) : (
                  <span />
                )}
                {this.props.categories[s.categoryId] &&
                s.projects.length > 0 ? (
                  <ul>{s.projects.map((p, i) => <li key={i}>{p.name}</li>)}</ul>
                ) : (
                  <span />
                )}
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}

export default School
