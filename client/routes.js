import React, {Component} from 'react'
import {withRouter, Route, Switch} from 'react-router-dom'
import {Landing} from './components'

/**
 * COMPONENT
 */
class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route path="/" component={Landing} />
        {/* <Route path="/login" component={} /> */}
        {/* <Route path="/signup" component={} /> */}
      </Switch>
    )
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(Routes)
