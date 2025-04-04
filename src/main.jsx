import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { AuthProvider } from "./context/AuthContext";
import App from './App.jsx'
import api from "./api/axios";


createRoot(document.getElementById('root')).render(
  <StrictMode>
     <AuthProvider>
    <App />
    </AuthProvider>
  </StrictMode>,
)
