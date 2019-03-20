import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {receiveAllPresentations, receiveOnePresentation} from '../store'

class Presentation extends Component {
  constructor(props) {
    super(props)
    this.state = {
      categories: this.props.categories || [0],
      presentations: []
    }
  }

  render() {
    return <div id="presentation-component">Blog component test</div>
  }
}

const mapStateToProps = state => ({presentations: state.presentations})

const mapDispatchToProps = dispatch => ({
  receiveAllPresentations: presentation =>
    dispatch(receiveAllPresentations(presentation)),
  receiveOnePresentation: presentationId =>
    dispatch(receiveOnePresentation(presentationId))
})

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Presentation)
)
