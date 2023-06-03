import { CircularProgress } from "@mui/material";
import { React, useEffect, useRef, lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { checkServerStatus } from "./core/apis/server";
import { useServerStore } from "./core/store/serverStore";
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
    const serverStatus = useServerStore().serverStatus;



    useEffect(() => {
        checkServerStatus()
    })

    return (
        <>
            {serverStatus === false ?
                <div className="absolute w-full h-full flex justify-center items-center z-50">
                    <CircularProgress />
                </div>
                : <></>}
            <BrowserRouter>
                <Routes>
                    <Route path={ROUTES.HOME} exact element={
                        <Suspense fallback={
                            <div className="absolute w-full h-full flex justify-center items-center z-50">
                                <CircularProgress />
                            </div>
                        }>
                            <LoginPage />
                        </Suspense>
                    } />
                    <Route path={ROUTES.TEST} exact element={
                        <Suspense fallback={
                            <div className="absolute w-full h-full flex justify-center items-center z-50">
                                <CircularProgress />
                            </div>
                        }>
                            <TestPage />
                        </Suspense>
                    } />
                    <Route path={ROUTES.REGISTER} exact element={<RegisterPage />} />
                    <Route path={ROUTES.LOGIN} exact element={
                        <Suspense fallback={
                            <div className="absolute w-full h-full flex justify-center items-center z-50">
                                <CircularProgress />
                            </div>
                        }>
                            <LoginPage />
                        </Suspense>
                    } />
                    <Route path={ROUTES.LOGOUT} exact element={<LogoutPage socket={socket} />} />
                    <Route path={ROUTES.MESSAGE} exact element={<MessagePage socket={socket} />} />
                    <Route path={ROUTES.MESSAGE_ID} exact element={<MessagePage socket={socket} />} />
                </Routes>
            </BrowserRouter>
        </>
    )
}