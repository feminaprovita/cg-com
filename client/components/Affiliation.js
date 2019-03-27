import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {receiveAllAffiliations, receiveOneAffiliation} from '../store'

class Affiliation extends Component {
  constructor(props) {
    super(props)
    this.state = {
      categories: this.props.categories || [0],
      affiliations: []
    }
  }

  render() {
    return <div id="affiliation-component">Affiliation component test</div>
  }
}

const mapStateToProps = state => ({affiliations: state.affiliations})

const mapDispatchToProps = dispatch => ({
  receiveAllAffiliations: affiliations =>
    dispatch(receiveAllAffiliations(affiliations)),
  receiveOneAffiliation: affiliationId =>
    dispatch(receiveOneAffiliation(affiliationId))
})

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Affiliation)
)
