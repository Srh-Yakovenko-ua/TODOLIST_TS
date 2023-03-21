import React from 'react'

import { createRoot } from 'react-dom/client'
import './index.css'
import { Provider } from 'react-redux'
import { HashRouter } from 'react-router-dom'

import App from './app/App'
import reportWebVitals from './reportWebVitals'
import { store } from './store/store'

const root = createRoot(document.getElementById('root') as HTMLElement)

root.render(
  <Provider store={store}>
    <HashRouter>
      <App />
    </HashRouter>
  </Provider>
)

reportWebVitals()
