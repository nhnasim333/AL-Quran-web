import React from 'react'
import ReactDOM from 'react-dom/client'
import Player from './components/Player.tsx'
import './styles/global.css'
import './pwa.ts'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Player />
  </React.StrictMode>,
)
