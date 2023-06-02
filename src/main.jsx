import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import MyRouter from './Router'
import '/src/css/index.css'
ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <MyRouter />
    </React.StrictMode>
)
// 