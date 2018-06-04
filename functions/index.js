const functions = require('firebase-functions')
const admin = require('firebase-admin')

const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()

app.use(cors())
admin.initializeApp(functions.config().firebase)

const request = require('request-promise');
const parse = require('xml2js').parseString;


const MOEDA = 'BRL'

const SANDBOX_EMAIL = '...'
const SANDBOX_TOKEN = '...'
const SANDBOX_URL = 'https://ws.sandbox.pagseguro.uol.com.br/v2/checkout' // url de teste
const SANDBOX_URL_CHECKOUT = 'https://sandbox.pagseguro.uol.com.br/v2/checkout/payment.html?code=' // redirecionamento para tela de pagamento

const PRODUCTION_EMAIL = '...'
const PRODUCTION_TOKEN = '...'
const PRODUCTION_URL = 'https://ws.pagseguro.uol.com.br/v2/checkout' // url de produção
const PRODUCTION_URL_CHECKOUT = 'https://pagseguro.uol.com.br/v2/checkout/payment.html?code=' // redirecionamento para tela de pagamento


// const ENVIRONMENT = 'DEV'
const ENVIRONMENT = 'PROD'


// Handle form datas
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))


//Routes
app.get('/', (req, res) => {
  res.send('BoraAjudar Server')
})

app.post('/donate', (req, res) => {
  request({
    uri: ENVIRONMENT === 'PROD' ? PRODUCTION_URL : SANDBOX_URL,
    method: 'POST',
    form: {
      token: ENVIRONMENT === 'PROD' ? PRODUCTION_TOKEN : SANDBOX_TOKEN,
      email: ENVIRONMENT === 'PROD' ? PRODUCTION_EMAIL : SANDBOX_EMAIL,
      currency: MOEDA,
      itemId1: req.body.campanha,
      itemDescription1: 'Doação',
      itemQuantity1: '1',
      itemAmount1: req.body.valor
    },
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    }
  })
  .then(xml => {
    parse(xml, (err, json) => {
      if (!err) {
        const code = json.checkout.code[0]
        res.send({
          url: (ENVIRONMENT === 'PROD' ? PRODUCTION_URL_CHECKOUT : SANDBOX_URL_CHECKOUT).concat(code)
        })
      }
      return false
    })
  })
})

app.post('/webhook', (req, res) => {
  // consulda a notificação de doação realizada
  const notificationCode = req.body.notificationCode
  const consultaNotificacao = 'https://ws.pagseguro.uol.com.br/v3/transactions/notifications'
  
  request(
    consultaNotificacao + notificationCode + 
    '?token=' + ENVIRONMENT === 'PROD' ? PRODUCTION_TOKEN : SANDBOX_TOKEN +
    '&email=' + ENVIRONMENT === 'PROD' ? PRODUCTION_EMAIL : SANDBOX_EMAIL
  )
  .then(notificationXML => {
    parse(notificationXML, (err, transactionJSON) => {
      const transaction = transactionJSON.transaction
      const transactionId = transaction.code[0]
      const status = transaction.status[0]
      const amount = transaction.grossAmount[0]
      const campanhaId = transaction.items[0].item[0].id[0]

      // consulta a campanha e faz a atualização do valor doado
      admin
        .database()
        .ref('campanhas/' + campanhaId)
        .once('value')
        .then(value => {
          const campanhaAtual = value.val()
          const totalDoado = parseFloat(campanhaAtual.doado) + parseFloat(amount)
          campanhaAtual.doado = totalDoado.toFixed(2)

          // atualiza no banco o valor total doado
          admin
            .database()
            .ref('campanhas/' + campanhaId)
            .set(campanhaAtual)
            .then(() => {
              res.send('ok')
            })
        })

      // grava a transação no banco
      admin
        .database()
        .ref('transactions/' + transactionId)
        .set(transaction)
        .then(() => {
          res.send('BoraAjudar Server')
        })

      res.send('ok')
    })
  })
})

exports.api = functions.https.onRequest(app)
