import React from 'react'
import { Route, Redirect, Switch, Link } from 'react-router-dom'

import { auth } from './base'

import AdminCampanhas from './AdminCampanhas'
import AdminEditarCampanha from './AdminEditarCampanha'

class Admin extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isAuthing: true,
      isLoggedIn: false,
      user: null
    }
  }

  componentDidMount() {
    auth.onAuthStateChanged(user => {
      this.setState({
        isAuthing: false,
        isLoggedIn: !!user,
        user: user
      })
    })
  }

  render() {
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
      <section className='page-section about-heading'>
        <div className='container'>
          <div className='about-heading-content mt-5'>
            <div className='row'>
              <div className='col-xl-9 col-lg-10 mx-auto'>
                <div className='bg-faded rounded p-5'>

                  <Switch>
                    <Route exact path='/admin' render={() => (
                      <div>
                        <h2 className='section-heading mb-4'>
                          <Link to={`${this.props.match.url}/campanhas`} className='section-heading-upper'>
                            Ir para campanhas
                            </Link>
                          <span className='section-heading-lower'>Painel Administrativo</span>
                        </h2>
                      </div>
                    )} />

                    <Route exact path={`${this.props.match.url}/campanhas`} component={AdminCampanhas} />
                    <Route path={`${this.props.match.url}/campanhas/:id`} component={AdminEditarCampanha} />
                  </Switch>

                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }
}

export default Admin
