import React, {Component} from 'react'
import axios from 'axios'

class Publication extends Component {
  constructor() {
    super()
    this.state = {
      publications: []
    }
  }

  async componentDidMount() {
    const {data} = await axios.get('/api/publications')
    let currentPublications = data.filter(
      p => this.props.categories[p.categoryId]
    )
    this.setState({publications: currentPublications})
  }

  async componentDidUpdate(prevProps) {
    const latest = this.props.categories
    const prev = prevProps.categories
    if (latest !== prev) {
      const {data} = await axios.get('/api/publications')
      let currentPublications = data.filter(
        p => this.props.categories[p.categoryId]
      )
      this.setState({publications: currentPublications})
    }
  }

  render() {
    this.state.publications.forEach(p => {
      p.slug = (p.title.match(/^.*(?=[\.,:;!?(–—])/g) || p.title)
        .toString()
        .replace(/[^\d\w\s]/g, '')
        .toLowerCase()
        .replace(/[^\d\w]/g, '-')
      p.keyName = p.slug + '-component'
    })
    console.log('pub state', this.state)

    return (
      <div className="resume-component">
        {this.state.publications.length > 0 ? (
          <div id="publication-component">
            <h1>Publications</h1>
            {this.state.publications.map(p => {
              return (
                <div className="one-publication" key={p.keyName}>
                  <h4>{p.title}</h4>
                  <p>
                    in{' '}
                    <a href={p.url} target="blank">
                      <i>{p.book}</i>
                    </a>, {p.footnote}.
                  </p>
                  <p>{p.summary}</p>
                </div>
              )
            })}
          </div>
        ) : (
          <span id="no-publications" />
        )}
      </div>
    )
  }
}

export default Publication
