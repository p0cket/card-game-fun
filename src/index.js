import React from 'react'
import { createRoot } from 'react-dom/client'
// import why did you render
import './wdyr'

import App from './App'
import { MainProvider } from './MainContext'

const rootElement = document.getElementById('root')
const root = createRoot(rootElement)

root.render(
  <MainProvider>
    <App />
  </MainProvider>,
)
