import React, {Component} from 'react'
import axios from 'axios'

class Publication extends Component {
  constructor() {
    super()
    this.state = {
      allPublications: [],
      filteredPublications: []
    }
  }

  async componentDidMount() {
    const {data} = await axios.get('/api/publications')
    let currentPublications = data.filter(
      p => this.props.categories[p.categoryId]
    )
    this.setState({
      allPublications: data,
      filteredPublications: currentPublications
    })
  }

  componentDidUpdate(prevProps, prevState) {
    const latest = this.props.categories
    const prev = prevProps.categories
    if (latest !== prev) {
      let currentPublications = prevState.allPublications.filter(
        p => this.props.categories[p.categoryId]
      )
      this.setState({filteredPublications: currentPublications})
    }
  }

  render() {
    this.state.allPublications.forEach(p => {
      if(!p.slug) {
        p.slug = (p.title.match(/^.*(?=[\.,:;!?(–—])/g) || p.title)
          .toString()
          .replace(/[^\d\w\s]/g, '')
          .toLowerCase()
          .replace(/[^\d\w]/g, '-')
        p.keyName = p.slug + '-component'
      }
    })
    console.log('Publication state', this.state)

    return (
      <div className="resume-component">
        {this.state.filteredPublications.length > 0 ? (
          <div id="publication-component">
            <h1>Selected Publications</h1>
            {this.state.filteredPublications.map(p => {
              return (
                <div className="one-publication" key={p.keyName}>
                  <h4>{p.title}</h4>
                  <p>in{' '}<a href={p.url} target="blank"><i>{p.book}</i></a>, {p.footnote}.</p>
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
