/* eslint-disable complexity */
import React, {Component} from 'react'

class Project extends Component {
  render() {
    const p = this.props.project
    const subKey = p.keyName + '-2'
    return (
      <div className="one-project" id={subKey}>
        <h3>{p.name}</h3>
        <p><i>{p.role}</i></p>
        {p.bullets && p.bullets.length > 0 ? (
          <ul>{p.bullets.map((b, i) => <li key={i}>{b}</li>)}</ul>
        ) : (
          <p>{p.paragraph}</p>
        )}
        {p.url && !p.github && !p.video ? (
          <p><a href={p.url} target="blank">Website</a></p>
        ) : (
          <div />
        )}
        {p.url && p.github && !p.video ? (
          <p><a href={p.url} target="blank">Website
            </a>&nbsp;&nbsp;&nbsp;❦&nbsp;&nbsp;&nbsp;{' '}
            <a href={p.github} target="blank">Github</a></p>
        ) : (
          <div />
        )}
        {p.url && p.github && p.video ? (
          <p><a href={p.url} target="blank">Website
            </a>&nbsp;&nbsp;&nbsp;❦&nbsp;&nbsp;&nbsp;{' '}
            <a href={p.github} target="blank">Github
            </a>&nbsp;&nbsp;&nbsp;❦&nbsp;&nbsp;&nbsp;{' '}
            <a href={p.video} target="blank">Video presentation</a></p>
        ) : (
          <div />
        )}
        {!p.url && p.github && p.video ? (
          <p><a href={p.github} target="blank">Github
            </a>&nbsp;&nbsp;&nbsp;❦&nbsp;&nbsp;&nbsp;{' '}
            <a href={p.video} target="blank">Video presentation</a></p>
        ) : (
          <div />
        )}
        {!p.url && p.github && !p.video ? (
          <p><a href={p.github} target="blank">Github</a></p>
        ) : (
          <div />
        )}
        {!p.url && !p.github && p.video ? (
          <p><a href={p.video} target="blank">Video presentation</a></p>
        ) : (
          <div />
        )}
        {p.url && !p.github && p.video ? (
          <p><a href={p.url} target="blank">Website
            </a>&nbsp;&nbsp;&nbsp;❦&nbsp;&nbsp;&nbsp;{' '}
            <a href={p.video} target="blank">Video presentation</a></p>
        ) : (
          <div />
        )}
      </div>
    )
  }
}

export default Project
