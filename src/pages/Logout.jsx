import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../core/store/authStore";
import { useChatsStore } from "../core/store/chatsStore";
import { useContactsStore } from "../core/store/contactsStore";
import { useSocketStore } from "../core/store/socketStore";
import { ROUTES } from "../utils";

export default function Logout({ socket }) {
    const authStore = useAuthStore()
    const chatsStore = useChatsStore()
    const contactsStore = useContactsStore()
    const socketStore = useSocketStore()
    const navigate = useNavigate()

    useEffect(() => {
        if (authStore.access_token) {
            authStore.clearAuth()
            chatsStore.clear()
            contactsStore.clear()
            socketStore.socket?.disconnect()
            socketStore.clear()
        }
        navigate(ROUTES.HOME)
    },[])

    return (<div>Test</div>)
}