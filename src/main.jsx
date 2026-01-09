import React from 'react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import FooterSection from './components/Footer.jsx'
import { Provider } from 'react-redux'
import store from './redux/store.js'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <Navbar />
        <App />
        <FooterSection />
      </Provider>
    </BrowserRouter>
  </StrictMode>,
)
