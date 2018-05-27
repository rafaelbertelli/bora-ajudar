import React from 'react'
import { Route, Redirect } from 'react-router-dom'

import { auth } from './base'

import AdminHome from './AdminHome'
import AdminCampanhas from './AdminCampanhas'

class Admin extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      isAuthing: true,
      isLoggedIn: false,
      user: null
    }
  }

  componentDidMount () {
    auth.onAuthStateChanged(user => {
      this.setState({
        isAuthing: false,
        isLoggedIn: !!user,
        user: user
      })
    })
  }

  render () {
    if (this.state.isAuthing) {
      return (
        <div className='text-center my-5'>
          <i className='fa fa-spinner fa-spin fa-3x fa-fw text-success' aria-hidden='true' />
        </div>
      )
    }

    if (!this.state.isLoggedIn) {
      return <Redirect to='/login' />
    }

    return (
      <div className='card'>
        <h1>Painel Administrativo</h1>
        <Route path='/' component={AdminHome} />
        <Route path={`${this.props.match.url}/campanhas`} component={AdminCampanhas} />
      </div>
    )
  }
}

export default Admin
