import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import ReactModal from 'react-modal'
import ReactDOM from 'react-dom/client'

import './tailwind.css'
import './index.css'

import ModalProvider from './context/modal/ModalProvider.tsx'
import Content from './structure/Content.tsx'

ReactModal.setAppElement("#root")

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ModalProvider>
        <Content />
      </ModalProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
