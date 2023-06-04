import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../core/store/authStore";
import myGlobalSetting from "../myGlobalSetting";
import { ROUTES } from "../utils";

export default function Logout({ socket }) {
    const authStore = useAuthStore()
    const navigate = useNavigate()

    useEffect(() => {
        if (authStore.access_token) {
            authStore.clearAuth()
            socket?.current?.disconnect()
        }
        navigate(ROUTES.HOME)
    },[])

    return (<div>Test</div>)
}