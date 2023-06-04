import React from "react";
import { useAuthStore } from "../../core/store/authStore";

export default function Wellcome() {
    const authStore = useAuthStore()
    return (
        <div className="flex h-3/5 text-center flex-col justify-center">
            <h1>
                Welcome, <span className="text-blue-400 font-light text-3xl">{authStore.name}</span> !
            </h1>
            <h3>Please select a chat to Start messaging.</h3>
        </div>
    );
}

