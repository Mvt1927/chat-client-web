import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Button from "@mui/material/Button"
import mySetting from "/src/myGlobalSetting"
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import PersonIcon from '@mui/icons-material/Person';
import { ROUTES, toastOptions } from "../utils";
import { useAuthStore } from "../core/store/authStore";
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';


export default function Register() {

    const navigate = useNavigate();
    const authStore = useAuthStore()

    useEffect(() => {
        if (authStore.access_token !== "") {
            navigate(ROUTES.MESSAGE)
        }
    }, [authStore.access_token])

    const [values, setValues] = useState({ name: "", username: "", password: "", email: "", repassword: "" });
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const handleChange = (event) => {
        setValues({ ...values, [event.target.name]: event.target.value });
    };

    const validateForm = () => {
        const { name, username, email, password, repassword } = values;
        if (name === "") {
            // console.error("Username is required.");
            toast.error("Name is required.", toastOptions);
            return false;
        } else if (username === "") {
            // console.error("Username is required.");
            toast.error("Username is required.", toastOptions);
            return false;
        } else if (email === "") {
            // console.error("Email is required.");
            toast.error("Email is required.", toastOptions);
            return false;
        } else if (password === "") {
            // console.error("Password is required.");
            toast.error("Password is required.", toastOptions);
            return false;
        } else if (repassword === "") {
            // console.error("Re-enter Password is required.");
            toast.error("Re-enter Password is required.", toastOptions);
            return false;
        } else if (repassword !== password) {
            // console.error("Re-enter Password and Password does not match.");
            toast.error("Re-enter Password and Password does not match.", toastOptions);
            return false;
        }
        return true;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (validateForm()) {
            const response = await authStore.fetchSignup(values)
            if (response.status !== 201) {
                Array.isArray(response.data.message) ?
                    response.data.message.map((message) => {
                        toast.error((message || "error"), toastOptions)
                    }) :
                    toast.error((response.data.message || "error"), toastOptions);
            }
        }
    };


    const handleNavigateToLogin = () => {
        navigate(ROUTES.LOGIN)
    }

    const handleVisiblePassword = () => {
        setIsPasswordVisible(!isPasswordVisible)
    }
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
            <div className="flex flex-col bg-white shadow-md px-4 sm:px-6 md:px-8 lg:px-10 py-8 rounded-3xl w-50 max-w-md">
                <div className="font-medium self-center text-2xl sm:text-3xl text-gray-800">
                    Join us Now
                </div>
                <div className="mt-4 self-center text-xs sm:text-sm text-gray-800">
                    Enter your credentials to create your account
                </div>

                <div className="mt-10">
                    <form action="" onSubmit={(event) => handleSubmit(event)}>
                        <div className="flex flex-col mb-5">
                            <label htmlFor="name" className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">Name:</label>
                            <div className="relative">
                                <div className="inline-flex items-center justify-center absolute h-full w-10 mt-[1px] text-gray-400">
                                    <PersonIcon className="text-blue-500"></PersonIcon>
                                </div>
                                <input
                                    onChange={(e) => handleChange(e)}
                                    id="name" type="text" name="name" className="text-sm placeholder-gray-500 pl-10 pr-4 rounded-2xl border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
                                    placeholder="Enter your name" />
                            </div>
                        </div>
                        <div className="flex flex-col mb-5">
                            <label htmlFor="username" className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">Username:</label>
                            <div className="relative">
                                <div className="inline-flex items-center justify-center absolute h-full w-10 mt-[1px] text-gray-400">
                                    <PersonIcon className="text-blue-500"></PersonIcon>
                                </div>
                                <input
                                    onChange={(e) => handleChange(e)}
                                    id="username" type="text" name="username" className="text-sm placeholder-gray-500 pl-10 pr-4 rounded-2xl border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
                                    placeholder="Enter your username" />
                            </div>
                        </div>
                        <div className="flex flex-col mb-5">
                            <label htmlFor="email" className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">E-Mail Address:</label>
                            <div className="relative">
                                <div className="inline-flex items-center justify-center absolute h-full w-10 mt-[1px] text-gray-400">
                                    <AlternateEmailIcon className="text-blue-500"></AlternateEmailIcon>
                                </div>
                                <input
                                    onChange={(e) => handleChange(e)}
                                    id="email" type="email" name="email" className="text-sm placeholder-gray-500 pl-10 pr-4 rounded-2xl border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
                                    placeholder="Enter your email" />
                            </div>
                        </div>
                        <div className="flex flex-col mb-6">
                            <label htmlFor="password" className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">Password:</label>
                            <div className="relative">
                                <div className="inline-flex items-center justify-center absolute h-full w-10 mt-[1px] text-gray-400">
                                    <div className="h-fit w-fit cursor-pointer" onClick={handleVisiblePassword}>
                                        {isPasswordVisible ?
                                            <LockOpenOutlinedIcon className="text-blue-500 justify-center flex" />
                                            :
                                            <LockOutlinedIcon className="text-blue-500 justify-center flex" />}

                                    </div>
                                </div>
                                <input
                                    onChange={(e) => handleChange(e)}
                                    id="password" type={isPasswordVisible ? "text" : "password"} name="password" className=" text-sm placeholder-gray-500 pl-10 pr-4 rounded-2xl border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400" placeholder="Enter your password" />
                            </div>
                        </div>
                        <div className="flex flex-col mb-6">
                            <label htmlFor="repassword" className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">Re-Enter Password:</label>
                            <div className="relative">
                                <div className="inline-flex items-center justify-center absolute h-full w-10 mt-[1px] text-gray-400">
                                    <div className="h-fit w-fit cursor-pointer" onClick={handleVisiblePassword}>
                                        {isPasswordVisible ?
                                            <LockOpenOutlinedIcon className="text-blue-500 justify-center flex" />
                                            :
                                            <LockOutlinedIcon className="text-blue-500 justify-center flex" />}

                                    </div>
                                </div>
                                <input
                                    onChange={(e) => handleChange(e)}
                                    id="repassword" type={isPasswordVisible ? "text" : "password"} name="repassword" className=" text-sm placeholder-gray-500 pl-10 pr-4 rounded-2xl border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400" placeholder="Re-Enter your password" />
                            </div>
                        </div>

                        <div className="flex w-full">
                            <button type="submit" className=" flex mt-2 items-center justify-center focus:outline-none text-white text-sm sm:text-base bg-blue-500 hover:bg-blue-600 rounded-2xl py-2 w-full transition duration-150 ease-in ">
                                <span className="mr-2 uppercase">Sign Up</span>
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
                        <span className="ml-2 ">You have an account?
                            <a onClick={handleNavigateToLogin} className="text-xs ml-2 text-blue-500 font-semibold cursor-pointer">Login here</a>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
