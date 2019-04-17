import React, {Component} from 'react'
import axios from 'axios'
import componentSort from '../../../script/utils.js'

class Job extends Component {
  constructor() {
    super()
    this.state = {
      jobs: []
    }
  }

  async componentDidMount() {
    const {data} = await axios.get('/api/jobs')
    let currentJobs = data.filter(j => {
      if (j.always) return true
      else {
        let categoryTest = j.categories.filter(
          jobCat => this.props.categories[jobCat.id] || j.always
        )
        return categoryTest.length > 0
      }
    })
    componentSort(currentJobs)
    this.setState({jobs: currentJobs})
  }

  async componentDidUpdate(prevProps) {
    const latest = this.props.categories
    const prev = prevProps.categories
    if (latest !== prev) {
      const {data} = await axios.get('/api/jobs')
      let currentJobs = data.filter(j => {
        if (j.always) return true
        else {
          let categoryTest = j.categories.filter(
            jobCat => this.props.categories[jobCat.id] || j.always
          )
          return categoryTest.length > 0
        }
      })
      componentSort(currentJobs)
      this.setState({jobs: currentJobs})
    }
  }

  render() {
    this.state.jobs.forEach(j => {
      const hold = j.company ? j.company : j.jobTitle
      j.slug = hold
        .replace(/[^\d\w\s]/g, '')
        .toLowerCase()
        .replace(/[^\d\w]/g, '-')
      j.keyName = j.slug + '-component'
    })
    console.log('job state', this.state)

    return (
      <div className="resume-component">
        {this.state.jobs.length > 0 ? (
          <div id="job-component">
            <h2>Jobs</h2>
            {this.state.jobs.length > 0 ? (
              this.state.jobs.map(j => {
                return (
                  <div className="one-job" key={j.keyName}>
                    <h4>{j.jobTitle}</h4>
                    {j.company ? (
                      j.volunteer ? (
                        j.url && j.location ? (
                          <p>
                            at{' '}
                            <a href={j.url} target="blank">
                              {j.company}
                            </a>, {j.location} <i>(volunteer)</i>
                          </p>
                        ) : (
                          <p>
                            at {j.company} <i>(volunteer)</i>
                          </p>
                        )
                      ) : (
                        <p>
                          at{' '}
                          <a href={j.url} target="blank">
                            {j.company}
                          </a>, {j.location}
                        </p>
                      )
                    ) : (
                      <span />
                    )}
                    <p>
                      {j.monthStart}&nbsp;&ndash;&nbsp;{j.monthEnd}
                    </p>
                    {j.bullets ? (
                      <ul>{j.bullets.map((b, i) => <li key={i}>{b}</li>)}</ul>
                    ) : (
                      <p>{j.paragraph}</p>
                    )}
                  </div>
                )
              })
            ) : (
              <span />
            )}
          </div>
        ) : (
          <span id="no-jobs" />
        )}
      </div>
    )
  }
}

export default Job
