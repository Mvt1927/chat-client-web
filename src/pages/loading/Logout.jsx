import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../core/store/authStore";
import myGlobalSetting from "../myGlobalSetting";

export default function Logout({socket}){
    const authStore = useAuthStore()
    const navigate = useNavigate()
    
    useEffect(() => {
        authStore.clearAuth()
        socket?.current?.disconnect()
        navigate("")
    })
    
    return (<div>Test</div>)
}