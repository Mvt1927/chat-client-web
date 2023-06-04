import { React, useRef } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Loading from "./components/Loading/Loading";
import { useServerStore } from "./core/store/serverStore";
import SuspensedLogin from "./pages/loading/Login";
import SuspensedLogout from "./pages/loading/Logout";
import SuspensedMessage from "./pages/loading/Message";
import SuspensedRegister from "./pages/loading/Register";
import SuspensedTest from "./pages/loading/Test";
import { ROUTES } from "./utils";

export default function MyRouter() {
    const socket = useRef();
    const serverStatus = useServerStore().serverStatus;

    return (
        <>
            {serverStatus === false ?
                <Loading />
                : <></>}
            <BrowserRouter>
                <Routes>
                    <Route path={ROUTES.HOME} exact element={<SuspensedLogin />} />
                    <Route path={ROUTES.TEST} exact element={<SuspensedTest />} />
                    <Route path={ROUTES.REGISTER} exact element={<SuspensedRegister />} />
                    <Route path={ROUTES.LOGIN} exact element={<SuspensedLogin />} />
                    <Route path={ROUTES.LOGOUT} exact element={<SuspensedLogout socket={socket} />} />
                    <Route path={ROUTES.MESSAGE} exact element={<SuspensedMessage socket={socket} />} />
                    <Route path={ROUTES.MESSAGE_ID} exact element={<SuspensedMessage socket={socket} />} />
                </Routes>
            </BrowserRouter>
        </>
    )
}