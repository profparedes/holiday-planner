import React, { Suspense } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'

import ReactDOM from 'react-dom/client'

import 'services/i18n'

import App from './App'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Suspense>
      <App />
    </Suspense>
  </React.StrictMode>,
)
