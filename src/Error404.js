import React from 'react'
import { Link } from 'react-router-dom'

const Error404 = () => {
  return (
  <div>
    <section className='page-section about-heading'>
      <div className='container'>
        <img className='img-fluid rounded about-heading-img mb-3 mb-lg-0' src='img/about-menor.jpg' alt='' />
        <div className='about-heading-content'>
          <div className='row'>
            <div className='col-xl-9 col-lg-10 mx-auto'>
              <div className='bg-faded rounded p-5'>
                <h2 className='section-heading mb-4'>
                  <span className='section-heading-upper'>Página não encontrada!</span>
                  <span className='section-heading-lower'>Morada da Melhor Idade</span>
                </h2>
                <Link to='/' className='nav-link text-uppercase text-expanded'>Volte para a página anterior para continuar a navegar.</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
  )
}

export default Error404
