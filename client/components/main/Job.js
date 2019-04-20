import React, {Component} from 'react'
import axios from 'axios'
import componentSort from '../../../script/utils.js'

class Job extends Component {
  constructor() {
    super()
    this.state = {
      allJobs: [],
      filteredJobs: []
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
    this.setState({
      allJobs: data,
      filteredJobs: currentJobs
    })
  }

  componentDidUpdate(prevProps, prevState) {
    const latest = this.props.categories
    const prev = prevProps.categories
    if (latest !== prev) {
      let currentJobs = prevState.allJobs.filter(j => {
        if (j.always) return true
        else {
          let categoryTest = j.categories.filter(
            jobCat => this.props.categories[jobCat.id] || j.always
          )
          return categoryTest.length > 0
        }
      })
      componentSort(currentJobs)
      this.setState({filteredJobs: currentJobs})
    }
  }

  render() {
    this.state.allJobs.forEach(j => {
      const hold = j.company ? j.company : j.jobTitle
      j.slug = hold
        .replace(/[^\d\w\s]/g, '')
        .toLowerCase()
        .replace(/[^\d\w]/g, '-')
      j.keyName = j.slug + '-component'
    })
    console.log('Job state', this.state)

    return (
      <div className="resume-component">
        {this.state.filteredJobs.length > 0 ? (
          <div id="job-component">
            <h1>Jobs</h1>
            {this.state.filteredJobs.length > 0 ? (
              this.state.filteredJobs.map(j => {
                return (
                  <div className="one-job" key={j.keyName}>
                    <h4>{j.jobTitle}</h4>
                    {j.company ? (
                      j.volunteer ? (
                        j.url && j.location ? (
                          <p>at{' '}<a href={j.url} target="blank">{j.company}</a>, {j.location} <i>(volunteer)</i></p>
                        ) : (
                          <p>at {j.company} <i>(volunteer)</i></p>
                        )
                      ) : (
                        <p>at{' '}<a href={j.url} target="blank">{j.company}</a>, {j.location}</p>
                      )
                    ) : (
                      <span />
                    )}
                    <p>{j.monthStart}&nbsp;&ndash;&nbsp;{j.monthEnd}</p>
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
