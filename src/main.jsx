import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import ServerConnectionChecker from './components/Server/CheckServerStatus'
import { checkServerStatus } from './core/apis/server'
import "react-toastify/dist/ReactToastify.css";
import MyRouter from './Router'
import '/src/css/index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
    <>
    {/* <React.StrictMode> */}
        <ServerConnectionChecker />
        <MyRouter />
        <ToastContainer className="text-base" />
    {/* </React.StrictMode> */}
    </>
)
// 