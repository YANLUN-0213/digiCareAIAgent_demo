import React from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import 'primeicons/primeicons.css'
import 'primereact/resources/themes/lara-light-purple/theme.css'
import 'primereact/resources/primereact.min.css'
import 'primeflex/primeflex.css'
import './styles/global.scss'
import { PrimeReactProvider } from 'primereact/api'
import { ToastProvider } from './context/ToastContext'
import router from './router'

createRoot(document.getElementById('root')!).render(
  <ToastProvider>
    <PrimeReactProvider>
      <RouterProvider router={router} />
    </PrimeReactProvider>
  </ToastProvider>
)
