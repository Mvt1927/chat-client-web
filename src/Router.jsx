import {React, useEffect, useRef, lazy} from "react";
import { BrowserRouter, Routes , Route } from "react-router-dom";
const LoginPage = lazy(() => import("./pages/Login"));
const LogoutPage = lazy(() => import("./pages/Logout"));
const RegisterPage = lazy(() => import("./pages/Register"));
const MessageWIdPage = lazy(() => import("./MessageRouter"));
const MessagePage = lazy(() => import("./pages/Message"));
import myGlobalSetting from "./myGlobalSetting";

export default function MyRouter(){
    const socket = useRef();
    return (
        <BrowserRouter>
            <Routes>
                <Route path="" exact element={<LoginPage />}/>
                <Route path={myGlobalSetting.ROUTE.REGISTER} element={<RegisterPage />}/>
                <Route path={myGlobalSetting.ROUTE.LOGIN} element={<LoginPage />}/>
                <Route path={myGlobalSetting.ROUTE.LOGOUT} element={<LogoutPage socket={socket} />}/>
                <Route path={myGlobalSetting.ROUTE.MESSAGE} exact element={<MessagePage socket={socket}/>}/>
                <Route path={myGlobalSetting.ROUTE.MESSAGE_ID} exact element={<MessagePage socket={socket}/>} />
            </Routes>
        </BrowserRouter>
    )
}