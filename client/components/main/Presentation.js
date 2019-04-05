import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import axios from 'axios'

class Presentation extends Component {
  constructor() {
    super()
    this.state = {
      presentations: []
    }
  }

  async componentDidMount() {
    const {data} = await axios.get('/api/presentations')
    this.setState({presentations: data})
  }

  render() {
    // console.log('pres props', this.props)
    console.log('pres state', this.state)
    let presentations = []
    this.state.presentations.forEach(p => {
      p.slug = (p.name.match(/^.*(?=[\.,:;!?(–—])/g) || p.name)
        .toString()
        .replace(/[^\d\w\s]/g, '')
        .toLowerCase()
        .replace(/[^\d\w]/g, '-')
      p.keyName = p.slug + '-component'
      if (this.props.categories.includes(p.categoryId)) {
        presentations.push(p)
      }
    })
    // console.log('presentations', presentations)

    return (
      <div id="presentation-component">
        {presentations.length > 0 ? (
          <h2>Presentations</h2>
        ) : (
          <div id="no-presentations" />
        )}
        {presentations.length > 0 ? (
          presentations.map(p => {
            return (
              <div className="one-presentation" key={p.keyName}>
                <h4>{p.name}</h4>
                {p.url ? (
                  <p>
                    Presented to the{' '}
                    <a href={p.url} target="blank">
                      {p.org}
                    </a>
                  </p>
                ) : (
                  <p>
                    Presented to the{' '}
                    <a href={p.job.url} target="blank">
                      {p.job.company}
                    </a>
                  </p>
                )}
                {p.dateEnd ? (
                  <p>
                    {p.dateStart} through {p.dateEnd}
                  </p>
                ) : (
                  <p>{p.dateStart}</p>
                )}
                {p.location ? (
                  <p>Delivered in {p.location}</p>
                ) : (
                  <p>Delivered in {p.job.location}</p>
                )}
                {p.details ? <p>{p.details}</p> : <div />}
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

export default withRouter(Presentation)
