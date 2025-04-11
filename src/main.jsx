import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import StoreContextProvider from './Context/StoreContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <StoreContextProvider>
      <App />
    </StoreContextProvider>
  </BrowserRouter>,
)


// Global context (StoreContextProvider) is isolated from routing (BrowserRouter) and app logic (App).
// Scalability:

// Adding new providers (e.g., authentication, theme context) is easy by wrapping additional context providers.
// Routing:

// The BrowserRouter ensures smooth navigation without full-page reloads.