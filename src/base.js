import Rebase from 're-base'
// import firebase from 'firebase'

import firebase from 'firebase/app';
import 'firebase/auth'
import 'firebase/database'

const config = {
  apiKey: 'AIzaSyBo_RWmXlnEr2ssjY6mot2q-xchNWkOU_o',
  authDomain: 'bora-ajudar-89.firebaseapp.com',
  databaseURL: 'https://bora-ajudar-89.firebaseio.com',
  projectId: 'bora-ajudar-89',
  storageBucket: 'bora-ajudar-89.appspot.com',
  messagingSenderId: '266929305262'
}

const app = firebase.initializeApp(config)
const base = Rebase.createClass(app.database())
export const auth = firebase.auth()
export default base
