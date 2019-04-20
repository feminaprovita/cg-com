import React, {Component} from 'react'
import axios from 'axios'
import componentSort from '../../../script/utils.js'

class Affiliation extends Component {
  constructor() {
    super()
    this.state = {
      allAffiliations: [],
      filteredAffiliations: []
    }
  }

  async componentDidMount() {
    const {data} = await axios.get('/api/affiliations')
    let currentAffiliations = data.filter(
      a => this.props.categories[a.categoryId]
    )
    componentSort(currentAffiliations)
    this.setState({
      allAffiliations: data,
      filteredAffiliations: currentAffiliations
    })
  }

  componentDidUpdate(prevProps, prevState) {
    const latest = this.props.categories
    const prev = prevProps.categories
    if (latest !== prev) {
      let currentAffiliations = prevState.allAffiliations.filter(
        a => this.props.categories[a.categoryId]
      )
      componentSort(currentAffiliations)
      this.setState({filteredAffiliations: currentAffiliations})
    }
  }

  render() {
    this.state.allAffiliations.forEach(a => {
      a.slug = a.name
        .replace(/[^\d\w\s]/g, '')
        .toLowerCase()
        .replace(/[^\d\w]/g, '-')
      a.keyName = a.slug + '-component'
    })
    console.log('Affiliation state', this.state)

    return (
      <div className="resume-component">
        {this.state.filteredAffiliations.length > 0 ? (
          <div id="affiliation-component">
            <h1>Professional Affiliations</h1>
            {this.state.filteredAffiliations.map(a => {
              return (
                <div className="one-affiliation" key={a.keyName}>
                  <p><b><a href={a.url}>{a.name}</a></b></p>
                  <p>{a.monthStart}&ndash;{a.monthEnd}</p>
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
