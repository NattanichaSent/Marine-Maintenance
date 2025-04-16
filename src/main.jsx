import '@ant-design/v5-patch-for-react-19';
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import FuelDashboard from './pages/FuelDashboard.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <FuelDashboard />
  </StrictMode>,
)
