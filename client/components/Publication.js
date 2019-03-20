import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {receiveAllPublications, receiveOnePublication} from '../store'

class Publication extends Component {
  constructor(props) {
    super(props)
    this.state = {
      categories: this.props.categories || [0],
      publications: []
    }
  }

  render() {
    return <div id="publication-component" />
  }
}

const mapStateToProps = state => ({publications: state.publications})

const mapDispatchToProps = dispatch => ({
  receiveAllPublications: publication =>
    dispatch(receiveAllPublications(publication)),
  receiveOnePublication: publicationId =>
    dispatch(receiveOnePublication(publicationId))
})

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Publication)
)
