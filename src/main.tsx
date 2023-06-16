import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { AppBarComponent } from './components/AppBar/index.tsx'
import './index.css'
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <AppBarComponent />
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)
