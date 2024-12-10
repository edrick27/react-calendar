import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles.css'
import { CalendarAPP } from './CalendarAPP'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <CalendarAPP />
    </BrowserRouter>
  </React.StrictMode>,
)
