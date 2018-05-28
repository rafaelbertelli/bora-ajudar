import React from 'react'

import base from './base'

class AdminCampanhas extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      campanhas: {},
      tipo: ''
    }
  }

  componentDidMount () {
    base.syncState('campanhas', {
      context: this,
      state: 'campanhas',
      asArray: false
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

    base.push('campanhas', {
      data: { nome, descricao, subtitulo, descricao, tipo, meta, doado, comoDoar },
      then: err => {
        if(!err) {
          if(this.nome) {
             this.nome.value = ''
          }
          if(this.subtitulo) {
             this.subtitulo.value = ''
          }
          if(this.descricao) {
             this.descricao.value = ''
          }
          if(this.meta) {
             this.meta.value = ''
          }
          if(this.doado) {
             this.doado.value = ''
          }
          if(this.comoDoar) {
             this.comoDoar.value = ''
          }
          this.setState({ tipo: '' })
        }
      }
    })
  }

  removeCampanha(key) {
    base.remove(`campanhas/${key}`, err => {
      console.log(err)
    })
  }

  renderCampanha(key, campanha) {
    return (
      <li key={key}>
        {campanha.nome}
        &nbsp;
        <button onClick={() => 1}>Editar</button>
        <button onClick={() => this.removeCampanha(key)}>Remover</button>
      </li>
    )
  }

  render () {
    return (
      <div>
        <h1>Admin Campanhas</h1>
        <h2>Nova Campanha</h2>
        Campanha: <input type='text' ref={ref => this.nome = ref} /><br />
        Sub-título: <input type='text' ref={ref => this.subtitulo = ref} /><br />
        Descrição: <textarea ref={ref => this.descricao = ref}></textarea><br />
        Tipo: <br />
          <input id='doacaoSelected' type='radio' name='tipo' onClick={() => this.setState({ 'tipo': 'doacao'})} />&nbsp;<label htmlFor='doacaoSelected'>Doação</label><br />
          <input id='produtoSelected' type='radio' name='tipo' onClick={() => this.setState({ 'tipo': 'produto'})} />&nbsp;<label htmlFor='produtoSelected'>Produto</label><br />

        {
          this.state.tipo === 'doacao' &&
          <div>
            <h4>Doação</h4>
            Meta: <input type='number' min={0.00} step={0.01} ref={ref => this.meta = ref} /><br />
            Doado: <input type='number' min={0.00} step={0.01} ref={ref => this.doado = ref} defaultValue={0.00} /><br />
          </div>
        }

        {
          this.state.tipo === 'produto' &&
          <div>
            <h4>Produto</h4>
            Como doar: <input type='text' ref={ref => this.comoDoar = ref} /><br />
          </div>
        }
        
        <button onClick={() => this.handleSave()}>Salvar nova campanha</button>
        <ul>
          {
            Object
            .keys(this.state.campanhas)
            .map(key => this.renderCampanha(key, this.state.campanhas[key]))
          }
        </ul>
      </div>
    )
  }
}

export default AdminCampanhas
