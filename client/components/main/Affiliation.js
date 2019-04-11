import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import axios from 'axios'

class Affiliation extends Component {
  constructor() {
    super()
    this.state = {
      affiliations: []
    }
  }

  async componentDidMount() {
    const {data} = await axios.get('/api/affiliations')
    this.setState({
      affiliations: data
    })
  }

  render() {
    // console.log('aff props', this.props)
    // console.log('aff state', this.state)
    let affiliations = []
    this.state.affiliations.forEach(a => {
      a.slug = a.name
        .replace(/[^\d\w\s]/g, '')
        .toLowerCase()
        .replace(/[^\d\w]/g, '-')
      a.keyName = a.slug + '-component'
      if (this.props.categories.includes(a.categoryId)) {
        affiliations.push(a)
      }
    })
    // console.log('affiliations', affiliations)

    return (
      <div id="affiliation-component">
        {affiliations.length > 0 ? (
          <h2>Affiliations</h2>
        ) : (
          <div id="no-affiliations" />
        )}
        {affiliations.length > 0 ? (
          affiliations.map(a => {
            return (
              <div className="one-affiliation" key={a.keyName}>
                <p>
                  <b>
                    <a href={a.url}>{a.name}</a>
                  </b>
                </p>
                <p>
                  {a.monthStart}&ndash;{a.monthEnd}
                </p>
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

export default withRouter(Affiliation)
