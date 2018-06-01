const functions = require('firebase-functions')
const admin = require('firebase-admin')

const express = require('express')
const bodyParser = require('body-parser')
const app = express()

admin.initializeApp(functions.config().firebase)

const request = require('request-promise');
const parse = require('xml2js').parseString;


const MOEDA = 'BRL'

const SANDBOX_EMAIL = '...'
const SANDBOX_TOKEN = '...'
const SANDBOX_URL = 'https://ws.sandbox.pagseguro.uol.com.br/v2/checkout' // url de teste
const SANDBOX_URL_CHECKOUT = 'https://sandbox.pagseguro.uol.com.br/v2/checkout/payment.html?code=' // redirecionamento para tela de pagamento

const PRODUCAO_EMAIL = '...'
const PRODUCAO_TOKEN = '...'
const PRODUCAO_URL = 'https://ws.pagseguro.uol.com.br/v2/checkout' // url de produção
const PRODUCAO_URL_CHECKOUT = 'https://pagseguro.uol.com.br/v2/checkout/payment.html?code=' // redirecionamento para tela de pagamento


// Handle form datas
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

//Routes
app.get('/', (req, res) => {
  const campanhaId = '-LDfnZ4LHLp3BCJMD3IR'
  const amount = '4.50'
  admin.
    database()
    .ref('campanhas/' + campanhaId)
    .once('value')
    .then(value => {
      const campanhaAtual = value.val()
      const totalDoado = parseFloat(campanhaAtual.doado) + parseFloat(amount)
      campanhaAtual.doado = totalDoado.toFixed(2)

      admin.
        database()
        .ref('campanhas/' + campanhaId)
        .set(campanhaAtual)
        .then(() => {
          res.send(campanhaAtual)
        })
    })


  // res.send('BoraAjudar Server')
})

app.post('/donate', (req, res) => {
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
    .then(xml => {
      parse(xml, (err, json) => {
        if (!err) {
          const code = json.checkout.code[0]
          res.send({
            url: SANDBOX_URL_CHECKOUT + code
          })
        }
        return false
      })
    })
})

app.post('/webhook', (req, res) => {
  const notificationCode = req.body.notificationCode
  const consultaNotificacao = 'https://ws.pagseguro.uol.com.br/v3/transactions/notifications'
  request(
    consultaNotificacao + notificationCode + '?token=' + SANDBOX_TOKEN + '&email=' + SANDBOX_EMAIL
  )
  .then(notificationXML => {
    parse(notificationXML, (err, transactionJSON) => {
      const transaction = transactionJSON.transaction
      const status = transaction.status[0]
      const amount = transaction.grossAmount[0]
      const campanhaId = transaction.items[0].item[0].id[0]

      // admin.
      //   database()
      //   .ref('transactions/111')
      //   .set({
      //     test: 1
      //   })
      //   .then(() => {
      //     res.send('BoraAjudar Server')
      //   })

      console.log(transactionJSON)
      res.send('ok')
    })
  })
})

exports.api = functions.https.onRequest(app)
