import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Button from "@mui/material/Button"
import "react-toastify/dist/ReactToastify.css";
import myGlobalSetting from "/src/myGlobalSetting"
import { useAuthStore } from "../core/store/authStore";
import { ROUTES } from "../utils";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import PersonIcon from '@mui/icons-material/Person';


export default function Login() {
    const authStore = useAuthStore()
    const navigate = useNavigate();

    useEffect(() => {
        if (authStore.access_token != "") {
            navigate('/m')
            return <></>
        }
    }, [authStore.access_token])


    const [values, setValues] = useState({ username: "", password: "" });
    const toastOptions = {
        position: "bottom-right",
        autoClose: 3000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
    };

    const handleChange = (event) => {
        setValues({ ...values, [event.target.name]: event.target.value });
    };

    const validateForm = () => {
        const { username, password } = values;
        if (username === "") {
            toast.error("Email and Password is required.", toastOptions);
            return false;
        } else if (password === "") {
            toast.error("Email and Password is required.", toastOptions);
            return false;
        }
        return true;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        // console.log(authStore)
        if (validateForm()) {
            const { username, password } = values;
            const response = await authStore.fetchSignin({ username, password })

            if (response.status === 401) {
                toast.error((response.data.message || "error"), toastOptions);
            }
        }
    };

    const handleNavi = () => {
        navigate(ROUTES.TEST)
    }

    return (
        <>
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
                <div className="flex flex-col bg-white shadow-md px-4 sm:px-6 md:px-8 lg:px-10 py-8 rounded-3xl w-50 max-w-md">
                    <div className="font-medium self-center text-xl sm:text-3xl text-gray-800">
                        Welcome Back
                    </div>
                    <div className="mt-4 self-center text-xl sm:text-sm text-gray-800">
                        Enter your credentials to access your account
                    </div>

                    <div className="mt-10">
                        <form action="" onSubmit={(event) => handleSubmit(event)}>
                            <div className="flex flex-col mb-5">
                                <label htmlFor="username" className="mb-1 text-xs tracking-wide text-gray-600">Username:</label>
                                <div className="relative">
                                    <div className="inline-flex items-center  justify-center absolute h-full w-10 mt-[1px] text-gray-400">
                                        <PersonIcon className="text-blue-500"></PersonIcon>
                                    </div>
                                    <input
                                        onChange={(e) => handleChange(e)}
                                        id="username" type="text" name="username" className="text-sm placeholder-gray-500 pl-10 pr-4 rounded-2xl border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
                                        placeholder="Enter your username" />
                                </div>
                            </div>
                            <div className="flex flex-col mb-6">
                                <label htmlFor="password" className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">Password:</label>
                                <div className="relative">
                                    <div className="inline-flex items-center  justify-center absolute h-full w-10 mt-[1px] text-gray-400">
                                        <LockOutlinedIcon className="text-blue-500 justify-center flex" />
                                    </div>
                                    <input
                                        onChange={(e) => handleChange(e)}
                                        id="password" type="password" name="password" className=" text-sm placeholder-gray-500 pl-10 pr-4 rounded-2xl border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400" placeholder="Enter your password" />
                                </div>
                            </div>

                            <div className="flex w-full">
                                <button type="submit" className=" flex mt-2 items-center justify-center focus:outline-none text-white text-sm sm:text-base bg-blue-500 hover:bg-blue-600 rounded-2xl py-2 w-full transition duration-150 ease-in ">
                                    <span className="mr-2 uppercase">Sign In</span>
                                    <span>
                                        <svg className="h-6 w-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24" stroke="currentColor">
                                            <path d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </span>
                                </button>
                            </div>
                        </form>
                    </div>
                    <div className="flex justify-center items-center mt-6">
                        <div className="inline-flex items-center text-gray-700 font-medium text-xs text-center">
                            <span className="ml-2 ">You don't have an account?
                                <a href={ROUTES.REGISTER} className="text-xs ml-2 text-blue-500 font-semibold">Register now</a>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer className="text-base" />
        </>
    );
}
