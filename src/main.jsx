

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter as Router } from 'react-router-dom'
import Context,{FirebaseContext } from './store/Firebasecontext.jsx'
import {db} from './firebase/config.js'
ReactDOM.createRoot(document.getElementById('root')).render(
  <FirebaseContext.Provider value={{db}}>
    <Context>
        <App/>
    </Context>
  </FirebaseContext.Provider>
)

