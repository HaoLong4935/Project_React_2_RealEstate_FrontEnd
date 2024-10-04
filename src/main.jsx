import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { AuthContextProvider } from './context/AuthoContext.jsx'
import './index.scss'
import '../src/routes/aboutPage/aboutUs.css'
import { SocketContextProvider } from './context/SocketContext.jsx'
import { AdminContext, AdminContextProvider } from './context/AdminContext.jsx'
ReactDOM.createRoot(document.getElementById('root')).render(
  <AdminContextProvider>
    <AuthContextProvider>
      <SocketContextProvider>
        <App />
      </SocketContextProvider>
    </AuthContextProvider>
  </AdminContextProvider>
)
