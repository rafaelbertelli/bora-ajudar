import React, { Component } from 'react'
import axios from 'axios'
import base from './base'

class Campanhas extends Component {
  constructor (props) {
    super(props)

    this.state = {
      campanhas: {},
      isProcessing: false,
    }
  }

  componentDidMount () {
    base.syncState('campanhas', {
      context: this,
      state: 'campanhas',
      asArray: false
    })
  }

  handleDonate (key) {
    this.setState({ isProcessing: true })
    axios
      .post('https://us-central1-bora-ajudar-89.cloudfunctions.net/api/donate', {
        campanha: key,
        valor: this.valor.value
      })
      .then(res => {
        window.location = res.data.url
      })
      .catch(err => {
        console.log('donate error', err)
        alert('Percebemos que o plano de hospedagem não permite este tipo de requisição. Contate o administrador para mais detalhes.')
        this.setState({ isProcessing: false })
      })
  }

  renderCampanha (key, campanha) {
    const porcentagem = ((parseFloat(campanha.doado) / parseFloat(campanha.meta)) * 100)

    return (
      <section className='page-section' key={key}>
        <div className='container'>
          <div className='product-item bg-faded'>
            <div className='product-item-title d-flex'>
              <div className='p-5 d-flex mr-auto rounded'>
                <h2 className='section-heading mb-0'>
                  <span className='section-heading-upper'>{campanha.subtitulo}</span>
                  <span className='section-heading-lower'>{campanha.nome}</span>
                </h2>
              </div>
            </div>
            <div className='product-item-description d-flex ml-auto'>
              <div className='p-5 rounded'>
                <p className='mb-0'>{campanha.descricao}</p>

                {campanha.tipo === 'doacao' &&
                  <div>
                    <div className='progress'>
                      <div className='progress-bar bg-success progress-bar-striped progress-bar-animated' role='progressbar' style={{ width: porcentagem + '%' }} 
                        aria-valuenow={porcentagem} aria-valuemin='0' aria-valuemax='100' />
                    </div>
                    <p>Meta: R$ {campanha.meta} / Atingidos: R$ {campanha.doado}</p>
                    <div className="input-group">
                      <select className="custom-select" ref={ref => this.valor = ref}>
                        <option value="0.01">R$ 0,01</option>
                        <option value="0.05">R$ 0,05</option>
                        <option value="2.00">R$ 2,00</option>
                        <option value="5.00">R$ 5,00</option>
                      </select>
                      <div className="input-group-append">
                        <button className="btn btn-outline-success" type="button" onClick={() => this.handleDonate(key)} disabled={this.state.isProcessing}>Contribuir</button>
                      </div>
                    </div>
                  </div>
                }

                {campanha.tipo === 'produto' &&
                  <div>
                    <h4>Como doar:</h4>
                    <p>{campanha.comoDoar}</p>
                  </div>
                }

              </div>
            </div>
            <div className='ml-auto' />
          </div>
        </div>
      </section>
    )
  }

  render () {
    return (
      <div>
        <section className='page-section'>
          <div className='container'>
            <div className='product-item'>
              <div className='product-item-title d-flex'>
                <div className='bg-faded p-5 d-flex ml-auto rounded'>
                  <h2 className='section-heading mb-0'>
                    <span className='section-heading-upper'>Ajude-nos por nossas</span>
                    <span className='section-heading-lower'>Campanhas</span>
                  </h2>
                </div>
              </div>
              <img className='product-item-img mx-auto d-flex rounded img-fluid mb-3 mb-lg-0' src='img/products-01-menor.jpg' alt='' />
              <div className='product-item-description d-flex mr-auto'>
                <div className='bg-faded p-5 rounded'>
                  <p className='mb-0'>We take pride in our work, and it shows. Every time you order a beverage from us, we guarantee that it will be an experience worth having. Whether it's our world famous Venezuelan Cappuccino, a refreshing iced herbal tea, or something as simple as a cup of speciality sourced black coffee, you will be coming back for more.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        {Object
          .keys(this.state.campanhas)
          .map(key => this.renderCampanha(key, this.state.campanhas[key]))}
      </div>
    )
  }
}

export default Campanhas
