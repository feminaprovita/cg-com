import React from 'react'

import {Navbar, Landing} from './components'
import Routes from './routes'

const App = () => {
  return (
    <div>
      <Navbar />
      <Landing />
      <Routes />
    </div>
  )
}

export default App
