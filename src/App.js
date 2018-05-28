import React, { Component } from 'react'
import { 
  BrowserRouter as Router, 
  Route,
  Switch
} from 'react-router-dom'

import Admin from './Admin'
import Login from './Login'
import Header from './Header'
import Menu from './Menu'
import Home from './Home'
import Sobre from './Sobre'
import Campanhas from './Campanhas'
import Contato from './Contato'
import Footer from './Footer'
import Error404 from './Error404'
class App extends Component {
  render () {
    return (
      <Router>
        <div>
          <Header />
          <Menu />
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/sobre' component={Sobre} />
            <Route path='/campanhas' component={Campanhas} />
            <Route path='/contato' component={Contato} />
            <Route path='/login' component={Login} />
            <Route path='/admin' component={Admin} />
            <Route component={Error404} />
          </Switch>
          <Footer />
        </div>
      </Router>
    )
  }
}

export default App
