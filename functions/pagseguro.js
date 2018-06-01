
// Exemplo de integração com o Pagseguro

const request = require('request-promise');
const parse = require('xml2js').parseString;


const MOEDA = 'BRL'

const SANDBOX_EMAIL = '...'
const SANDBOX_TOKEN = '...'
const SANDBOX_URL = 'https://ws.sandbox.pagseguro.uol.com.br/v2/checkout' // url de teste
const SANDBOX_URL_PGTO = 'https://sandbox.pagseguro.uol.com.br/v2/checkout/payment.html?code=' // redirecionamento para tela de pagamento

const PRODUCAO_EMAIL = '...'
const PRODUCAO_TOKEN = '...'
const PRODUCAO_URL = 'https://ws.pagseguro.uol.com.br/v2/checkout' // url de produção
const PRODUCAO_URL_PGTO = 'https://pagseguro.uol.com.br/v2/checkout/payment.html?code=' // redirecionamento para tela de pagamento


request({
  uri: SANDBOX_URL,
  method: 'POST',
  form: {
    token: SANDBOX_TOKEN,
    email: SANDBOX_EMAIL,
    currency: MOEDA,
    itemId1: 'idCampanha',
    itemDescription1: 'Doação',
    itemQuantity1: '1',
    itemAmount1: '1.00'
  },
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded; charset=ISO-8859-1'
  }
})
.then(xml => 
  parse(xml, (err, json) => 
    console.log(json)))

// https://comunidade.pagseguro.uol.com.br/hc/pt-br/community/posts/221503208-O-servidor-remoto-retornou-um-erro-401-N%C3%A3o-Autorizado
// https://sandbox.pagseguro.uol.com.br/vendedor/configuracoes.html
// https://pagseguro.uol.com.br/preferencias/integracoes.jhtml
