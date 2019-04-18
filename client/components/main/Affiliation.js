import React, {Component} from 'react'
import axios from 'axios'
import componentSort from '../../../script/utils.js'

class Affiliation extends Component {
  constructor() {
    super()
    this.state = {
      affiliations: []
    }
  }

  async componentDidMount() {
    const {data} = await axios.get('/api/affiliations')
    let currentAffiliations = data.filter(
      a => this.props.categories[a.categoryId]
    )
    componentSort(currentAffiliations)
    this.setState({affiliations: currentAffiliations})
  }

  async componentDidUpdate(prevProps) {
    const latest = this.props.categories
    const prev = prevProps.categories
    if (latest !== prev) {
      const {data} = await axios.get('/api/affiliations')
      let currentAffiliations = data.filter(
        a => this.props.categories[a.categoryId]
      )
      componentSort(currentAffiliations)
      this.setState({affiliations: currentAffiliations})
    }
  }

  render() {
    this.state.affiliations.forEach(a => {
      a.slug = a.name
        .replace(/[^\d\w\s]/g, '')
        .toLowerCase()
        .replace(/[^\d\w]/g, '-')
      a.keyName = a.slug + '-component'
    })
    console.log('Affiliation state', this.state)

    return (
      <div className="resume-component">
        {this.state.affiliations.length > 0 ? (
          <div id="affiliation-component">
            <h1>Professional Affiliations</h1>
            {this.state.affiliations.map(a => {
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
            })}
          </div>
        ) : (
          <span id="no-affiliations" />
        )}
      </div>
    )
  }
}

export default Affiliation
