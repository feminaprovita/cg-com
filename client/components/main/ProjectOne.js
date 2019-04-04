import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'

class Project extends Component {
  render() {
    const p = this.props.project
    const subKey = p.keyName + '-2'
    return (
      <div className="one-project" id={subKey}>
        <h3>{p.name}</h3>
        <p>
          <i>{p.role}</i>
        </p>
        {p.bullets && p.bullets.length > 0 ? (
          <ul>{p.bullets.map((b, i) => <li key={i}>{b}</li>)}</ul>
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
        {/* {p.jobId ?} */}
        {/* <p>❦❦❦</p> */}
      </div>
    )
  }
}

export default withRouter(Project)
