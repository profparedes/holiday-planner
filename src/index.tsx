import React, { Suspense } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'

import ReactDOM from 'react-dom/client'

import 'services/i18n'

import { HolidayPlannerProvider } from 'stores/HolidayContext'

import App from './App'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Suspense>
      <HolidayPlannerProvider>
        <App />
      </HolidayPlannerProvider>
    </Suspense>
  </React.StrictMode>,
)
