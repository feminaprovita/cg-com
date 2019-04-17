import React, {Component} from 'react'
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
    let currentPresentations = data.filter(
      p => this.props.categories[p.categoryId]
    )
    currentPresentations.sort(
      (a, b) => new Date(b.dateStart) - new Date(a.dateStart)
    )
    this.setState({presentations: currentPresentations})
  }

  async componentDidUpdate(prevProps) {
    const latest = this.props.categories
    const prev = prevProps.categories
    if (latest !== prev) {
      const {data} = await axios.get('/api/presentations')
      let currentPresentations = data.filter(
        p => this.props.categories[p.categoryId]
      )
      currentPresentations.sort(
        (a, b) => new Date(b.dateStart) - new Date(a.dateStart)
      )
      this.setState({presentations: currentPresentations})
    }
  }

  render() {
    this.state.presentations.forEach(p => {
      p.slug = (p.name.match(/^.*(?=[\.,:;!?(–—])/g) || p.name)
        .toString()
        .replace(/[^\d\w\s]/g, '')
        .toLowerCase()
        .replace(/[^\d\w]/g, '-')
      p.keyName = p.slug + '-component'
    })
    console.log('pres state', this.state)

    return (
      <div className="resume-component">
        {this.state.presentations.length > 0 ? (
          <div id="presentation-component">
            <h2>Presentations</h2>
            {this.state.presentations.length > 0 ? (
              this.state.presentations.map(p => {
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
        ) : (
          <span id="no-presentations" />
        )}
      </div>
    )
  }
}

export default Presentation
