import React, { Component } from 'react'
import { 
  BrowserRouter as Router,
  Route
} from 'react-router-dom'

import Header from './Header'
import Menu from './Menu'
import Home from './Home'
import Footer from './Footer'

class App extends Component {
  render () {
    return (
      <Router>
        <div>
          <Header />
          <Menu />
          <Route exact path='/' component={Home} />
          <Footer />
        </div>
      </Router>
    )
  }
}

export default App
