const functions = require('firebase-functions')
const request = require('request-promise');
const parse = require('xml2js').parseString;
const express = require('express')
const bodyParser = require('body-parser')
const app = express()


const MOEDA = 'BRL'

const SANDBOX_EMAIL = '...'
const SANDBOX_TOKEN = '...'
const SANDBOX_URL = 'https://ws.sandbox.pagseguro.uol.com.br/v2/checkout' // url de teste
const SANDBOX_URL_PGTO = 'https://sandbox.pagseguro.uol.com.br/v2/checkout/payment.html?code=' // redirecionamento para tela de pagamento

const PRODUCAO_EMAIL = '...'
const PRODUCAO_TOKEN = '...'
const PRODUCAO_URL = 'https://ws.pagseguro.uol.com.br/v2/checkout' // url de produção
const PRODUCAO_URL_PGTO = 'https://pagseguro.uol.com.br/v2/checkout/payment.html?code=' // redirecionamento para tela de pagamento


// Handle form datas
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

//Routes
app.get('/', (req, res) => {
    res.send('BoraAjudar Server')
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
          if(!err) {
            const code = json.checkout.code[0]
            
          }
      
          return false
        })
    })



})

exports.api = functions.https.onRequest(app)

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
