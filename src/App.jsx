import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Layout from './components/Layout'
import Home from './pages/Home/Home'
import Product from './pages/Product'
import ProductsPage from './pages/Products/ProductsPage'
import ProductDetailsPage from './pages/ProductDetails/ProductDetailsPage'

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product" element={<Product />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/product-details" element={<ProductDetailsPage />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App
