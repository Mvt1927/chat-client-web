import { React, useEffect, useRef, lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
const LoginPage = lazy(() => import("./pages/Login"));
const LogoutPage = lazy(() => import("./pages/Logout"));
const RegisterPage = lazy(() => import("./pages/Register"));
const MessagePage = lazy(() => import("./pages/Message"));
const TestPage = lazy(() => import("./pages/Test"));
const Test2Page = lazy(() => import("./pages/Test2"));
import myGlobalSetting from "./myGlobalSetting";
import { ROUTES } from "./utils";

export default function MyRouter() {
    const socket = useRef();
    return (
        <BrowserRouter>
            <Routes>
                <Route path={ROUTES.HOME} exact element={
                    <Suspense fallback={<div>Loading....</div>}>
                        <LoginPage /> 
                    </Suspense>
                } />
                <Route path={ROUTES.TEST} exact element={
                    <Suspense fallback={<div>Loading....</div>}>
                        <TestPage /> 
                    </Suspense>
                } />
                <Route path={ROUTES.REGISTER} exact element={<RegisterPage />} />
                <Route path={ROUTES.LOGIN} exact element={
                    <Suspense fallback={<div>Loading....</div>}>
                        <LoginPage /> 
                    </Suspense>
                } />
                <Route path={ROUTES.LOGOUT} exact element={<LogoutPage socket={socket} />} />
                <Route path={ROUTES.MESSAGE} exact element={<MessagePage socket={socket} />} />
                <Route path={ROUTES.MESSAGE_ID} exact element={<MessagePage socket={socket} />} />
            </Routes>
        </BrowserRouter>
    )
}