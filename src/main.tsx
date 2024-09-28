import { createRoot } from 'react-dom/client'
import './index.css'
import ReactAppAsLibrary from './react-app-as-library.tsx'

createRoot(document.getElementById('root')!).render(
  <ReactAppAsLibrary />
)
