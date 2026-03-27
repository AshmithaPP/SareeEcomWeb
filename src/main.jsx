import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'
import './index.css'
import App from './App.jsx'
import { WishlistProvider } from './context/WishlistContext'
import { CartProvider } from './context/CartContext'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <WishlistProvider>
      <CartProvider>
        <App />
        <ToastContainer position="top-right" autoClose={3000} limit={2} />
      </CartProvider>
    </WishlistProvider>
  </StrictMode>,
)
