import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

const {
  REACT_APP_FIRE_API_KEY,
  REACT_APP_FIRE_AUTH_DOMAIN,
  REACT_APP_FIRE_DATABASE_URL,
  REACT_APP_FIRE_PROJECT_ID,
  REACT_APP_FIRE_STORAGE_BUCKET,
  REACT_APP_FIRE_APP_ID,
  REACT_APP_FIRE_SENDER_ID,
} = process.env

const config = {
  apiKey: REACT_APP_FIRE_API_KEY,
  authDomain: REACT_APP_FIRE_AUTH_DOMAIN,
  databaseURL: REACT_APP_FIRE_DATABASE_URL,
  projectId: REACT_APP_FIRE_PROJECT_ID,
  storageBucket: REACT_APP_FIRE_STORAGE_BUCKET,
  messagingSenderId: REACT_APP_FIRE_SENDER_ID,
  appID: REACT_APP_FIRE_APP_ID, 
}

firebase.initializeApp(config)

export const auth = firebase.auth()

export default firebase
