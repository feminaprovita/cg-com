import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
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
    this.setState({
      publications: data
    })
  }

  render() {
    // console.log('pub props', this.props)
    console.log('pub state', this.state)
    let publications = []
    this.state.publications.forEach(p => {
      p.slug = (p.title.match(/^.*(?=[\.,:;!?(–—])/g) || p.title)
        .toString()
        .replace(/[^\d\w\s]/g, '')
        .toLowerCase()
        .replace(/[^\d\w]/g, '-')
      p.keyName = p.slug + '-component'
      if (this.props.categories.includes(p.categoryId)) {
        publications.push(p)
      }
    })
    // console.log('publications', publications)

    return (
      <div id="publication-component">
        {publications.length > 0 ? (
          <h2>Publications</h2>
        ) : (
          <div id="no-publications" />
        )}
        {publications.length > 0 ? (
          publications.map(p => {
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
          })
        ) : (
          <div />
        )}
      </div>
    )
  }
}

export default withRouter(Publication)
