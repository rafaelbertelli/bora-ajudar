import React from 'react'
import { Redirect } from 'react-router-dom'

import { auth } from './base'

class Login extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      isLoggedIn: false,
      isLogging: false,
      error: false,
      msg: 'Usuário e/ou senha inválidos'
    }

    this.username = null
    this.password = null
  }

  handleKey (e) {
    if (e.key === 'Enter') this.handleLogin()
  }

  handleLogin () {
    this.setState({isLogging: true})
    auth
      .signInWithEmailAndPassword(this.email.value, this.password.value)
      .then(() => {
        this.setState({isLoggedIn: true})
      })
      .catch(() => {
        this.setState({
          isLogging: false,
          error: true
        })
      })
  }

  render () {
    if (this.state.isLoggedIn) {
      return <Redirect to='/admin' />
    }

    return (
      <section className='page-section about-heading'>
        <div className='container'>
          <div className='about-heading-content mt-5'>
            <div className='row'>
              <div className='col-xl-9 col-lg-10 mx-auto'>
                <div className='bg-faded rounded p-5'>
                  <h2 className='section-heading mb-4'>
                    <span className='section-heading-upper'>Login</span>
                    <span className='section-heading-lower'>Morada da Melhor Idade</span>
                  </h2>
                  <div>
                    <div className='input-group mb-3'>
                      <div className='input-group-prepend'>
                        <span className='input-group-text' id='username'>Username</span>
                      </div>
                      <input ref={(ref) => this.email = ref} onKeyUp={(e) => this.handleKey(e)} type='text' className='form-control' placeholder='Username' aria-label='Username' aria-describedby='username' autoFocus />
                    </div>
                    <div className='input-group mb-3'>
                      <div className='input-group-prepend'>
                        <span className='input-group-text' id='password'>Password</span>
                      </div>
                      <input ref={(ref) => this.password = ref} onKeyUp={(e) => this.handleKey(e)} type='password' className='form-control' placeholder='Password' aria-label='Password' aria-describedby='password' />
                    </div>

                    {this.state.error &&
                      <div className='alert alert-warning' role='alert'>
                        {this.state.msg}
                      </div>
                    }

                    <div className='text-right'>
                      <button type='button' className='btn btn-secondary pull-right'
                        onClick={() => this.handleLogin()} disabled={this.state.isLogging}>Login</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }
}

export default Login
