import React from 'react'
import { Redirect } from 'react-router-dom'

import base from './base'

class AdminEditarCampanha extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      campanha: {},
      isLoading: true,
      salved: false,
      tipo: ''
    }
  }

  componentDidMount () {
    const id = this.props.match.params.id
    base.fetch(`campanhas/${id}`, {
      context: this,
      asArray: false,
      then(campanha) {
        this.setState({ campanha, isLoading: false, tipo: campanha.tipo })
      }
    })
  }

  handleSave() {
    const nome = this.nome.value
    const subtitulo = this.subtitulo.value
    const descricao = this.descricao.value
    const tipo = this.state.tipo
    const meta = this.state.tipo === 'doacao' ? this.meta.value : null
    const doado = this.state.tipo === 'doacao' ? this.doado.value : null
    const comoDoar = this.state.tipo === 'produto' ? this.comoDoar.value : null

    const id = this.props.match.params.id
    base.update(`campanhas/${id}`, {
      data: { nome, descricao, subtitulo, tipo, meta, doado, comoDoar },
      then: err => {
        if(!err) {
          this.setState({ salved: true })
        }
      }
    })
  }

  render () {
    if (this.state.salved) {
      return <Redirect to='/admin/campanhas'></Redirect>
    }

    if (this.state.isLoading) {
      return (
        <div className='text-center my-5'>
          <i className='fa fa-spinner fa-spin fa-3x fa-fw text-success' aria-hidden='true' />
        </div>
      )
    }

    console.log(this.state)
    return (
      <div>
        <h1>Editar Campanha</h1>
        Campanha: <input type='text' defaultValue={this.state.campanha.nome} ref={ref => this.nome = ref} /><br />
        Sub-título: <input type='text' defaultValue={this.state.campanha.subtitulo} ref={ref => this.subtitulo = ref} /><br />
        Descrição: <textarea defaultValue={this.state.campanha.descricao} ref={ref => this.descricao = ref}></textarea><br />
        Tipo: <br />
          <input id='doacaoSelected' type='radio' name='tipo' defaultChecked={this.state.campanha.tipo === 'doacao'} onClick={() => this.setState({ 'tipo': 'doacao'})} />&nbsp;<label htmlFor='doacaoSelected'>Doação</label><br />
          <input id='produtoSelected' type='radio' name='tipo' defaultChecked={this.state.campanha.tipo === 'produto'} onClick={() => this.setState({ 'tipo': 'produto'})} />&nbsp;<label htmlFor='produtoSelected'>Produto</label><br />

        {
          this.state.tipo === 'doacao' &&
          <div>
            <h4>Doação</h4>
            Meta: <input type='number' min={0.00} step={0.01} defaultValue={this.state.campanha.meta} ref={ref => this.meta = ref} /><br />
            Doado: <input type='number' min={0.00} step={0.01}  defaultValue={this.state.campanha.doado} ref={ref => this.doado = ref} defaultValue={0.00} /><br />
          </div>
        }

        {
          this.state.tipo === 'produto' &&
          <div>
            <h4>Produto</h4>
            Como doar: <input type='text' defaultValue={this.state.campanha.comoDoar} ref={ref => this.comoDoar = ref} /><br />
          </div>
        }
        
        <button onClick={() => this.handleSave()}>Salvar edição da campanha</button>
        
      </div>
    )
  }
}

export default AdminEditarCampanha
