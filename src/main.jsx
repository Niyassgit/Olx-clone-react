import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './components/Context/Auth.jsx'
import { ProductProvider } from './components/Context/productContext.jsx'
import { ItemContextProvider } from './components/Context/Item.jsx'


createRoot(document.getElementById('root')).render(
  <ItemContextProvider>
    <ProductProvider>
      <AuthProvider>
        <StrictMode>
          <App />
        </StrictMode>
      </AuthProvider>
    </ProductProvider>
</ItemContextProvider>
)
