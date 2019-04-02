import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'

class Affiliation extends Component {
  // constructor(props) {
  //   super(props)
  // this.state = {
  //   categories: this.props.categories.length > 0 ? this.props.categories : [1],
  //   affiliations: this.props.affiliations
  // }
  // }

  render() {
    console.log('prop affiliations', this.props.affiliations)
    let affiliations = []
    this.props.affiliations.forEach(a => {
      if (this.props.categories.includes(a.categoryId)) {
        affiliations.push(a)
      }
    })

    console.log('affiliations', affiliations)

    return (
      <div id="affiliation-component">
        <p>inside affiliation component</p>
        {affiliations.length > 0
          ? affiliations.map(a => {
              let keyName = `${a.name}-component`
              return (
                <div key={keyName}>
                  <p>
                    <a href={a.url}>{a.name}</a>
                  </p>
                  <p>
                    {a.monthStart}-{a.monthEnd}
                  </p>
                </div>
              )
            })
          : ' '}
      </div>
    )
  }
}

export default withRouter(Affiliation)
