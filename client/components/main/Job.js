import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import axios from 'axios'

class Job extends Component {
  constructor() {
    super()
    this.state = {
      jobs: [],
      allJobs: []
    }
  }

  async componentDidMount() {
    const {data} = await axios.get('/api/jobs')
    let activeJobs = []
    this.props.categories.forEach(c => {
      data.forEach(j => {
        j.categories.forEach(jobCat => {
          if (c === jobCat.id) {
            activeJobs.push(j)
          }
          // else console.log(j.jobTitle, c, '!==', jobCat.id)
        })
      })
    })
    // console.log('activeJobs', activeJobs)
    this.setState({
      jobs: activeJobs,
      allJobs: data
    })
  }

  async componentDidMount(nextProps) {
    try {
      // need to fix, but componentDidUpdate yields an infinite loop
      // this doesn't actually update either, SO
      if (nextProps.categories !== this.props.categories) {
        const {data} = await axios.get('/api/jobs')
        let activeJobs = []
        nextProps.categories.forEach(c => {
          data.forEach(j => {
            j.categories.forEach(jobCat => {
              if (c === jobCat.id) {
                activeJobs.push(j)
              }
              // else console.log(j.jobTitle, c, '!==', jobCat.id)
            })
          })
        })
        // console.log('activeJobs', activeJobs)
        this.setState({
          jobs: activeJobs,
          allJobs: data
        })
      }
    } catch (err) {
      console.trace(err)
    }
  }

  render() {
    console.log('job props', this.props)
    console.log('job state', this.state)
    let jobs = []
    this.state.jobs.forEach(j => {
      const hold = j.company ? j.company : j.jobTitle
      j.slug = hold
        .replace(/[^\d\w\s]/g, '')
        .toLowerCase()
        .replace(/[^\d\w]/g, '-')
      j.keyName = j.slug + '-component'
      if (j.always) jobs.push(j)
      j.categoryIds = []
      j.categories.forEach(c => j.categoryIds.push(c.id))
      j.categoryIds.forEach(id => {
        if (this.props.categories.includes(id)) jobs.push(j)
      })
    })
    jobs = Array.from(new Set(jobs))
    // console.log('jobs', jobs)

    return (
      <div id="job-component">
        {jobs.length > 0 ? <h2>Jobs</h2> : <div id="no-jobs" />}
        {jobs.length > 0 ? (
          jobs.map(j => {
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
                  <div />
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
          <div />
        )}
      </div>
    )
  }
}

export default withRouter(Job)
