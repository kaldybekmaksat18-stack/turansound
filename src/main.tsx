import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

// 🔴 ВАЖНО — ИМЕННО ЭТА СТРОКА
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
