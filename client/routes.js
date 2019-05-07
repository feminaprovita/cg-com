import React, {Component} from 'react'
import {withRouter, Route, Switch} from 'react-router-dom'

class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route path="/" component={Profile} />
      </Switch>
    )
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked when the url changes
export default withRouter(Routes)
