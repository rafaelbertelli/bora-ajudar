import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Header from './Header'
import Menu from './Menu'
import Home from './Home'
import Sobre from './Sobre'
import Campanhas from './Campanhas'
import Contato from './Contato'
import Footer from './Footer'

class App extends Component {
  render () {
    return (
      <Router>
        <div>
          <Header />
          <Menu />
          <Route exact path='/' component={Home} />
          <Route exact path='/sobre' component={Sobre} />
          <Route exact path='/campanhas' component={Campanhas} />
          <Route exact path='/contato' component={Contato} />
          <Footer />
        </div>
      </Router>
    )
  }
}

export default App
