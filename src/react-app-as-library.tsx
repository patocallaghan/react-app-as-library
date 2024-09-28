import { StrictMode } from 'react'
import App from './App.tsx'
import './index.css'

function ReactAppAsLibrary() {
  return (
    <StrictMode>
      <App />
    </StrictMode>
  )
}

export default ReactAppAsLibrary