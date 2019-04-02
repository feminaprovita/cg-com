import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'

class Project extends Component {
  render() {
    const p = this.props.project
    let slug
    slug = p.name.replace(/[^a-zA-Z0-9\s]/g, '').toLowerCase()
    console.log(slug)
    slug = slug.replace((/\s*|[^a-z0-9]/g, '-'))
    let keyName = slug + '-component'
    return (
      <div key={keyName}>
        <h3>{p.name}</h3>
        <p>
          <i>{p.role}</i>
        </p>
        {p.bullets && p.bullets.length > 0 ? (
          <ul>{p.bullets.map(b => <li>{b}</li>)}</ul>
        ) : (
          <p>{p.paragraph}</p>
        )}
        {p.url ? (
          <p>
            <a href={p.url}>Website</a>
          </p>
        ) : (
          <div />
        )}
        {p.github ? (
          <p>
            <a href={p.github}>Github</a>
          </p>
        ) : (
          <div />
        )}
        {p.video ? (
          <p>
            <a href={p.video}>Video presentation</a>
          </p>
        ) : (
          <div />
        )}
        {/* {p.jobId ?}
        {p.schoolId ?} */}
        <p>❦</p>
      </div>
    )
  }
}

export default withRouter(Project)
