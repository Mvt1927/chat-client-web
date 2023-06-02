import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Button from "@mui/material/Button"
import "react-toastify/dist/ReactToastify.css";
import { useAuthStore } from "../core/store/authStore";
import { ROUTES } from "../utils";


export default function Test2() {
    const authStore = useAuthStore()
    const navigate = useNavigate();

    const handleNavi = () => {
        navigate(ROUTES.TEST)
    }

    return (
        <div className="flex content-center justify-center h-screen flex-col items-center">
            <div className="login-card w-full sm:w-3/4 md:w-2/3 lg:w-1/3 h-fit min-h-3/4" >
                <Button onClick={handleNavi} color="primary" size='large' className="font-bold" variant="contained" type="submit">
                    <div className="font-bold">TEST</div>
                </Button>
            </div>
        </div>
    );
}
