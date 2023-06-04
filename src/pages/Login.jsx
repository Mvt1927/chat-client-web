import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuthStore } from "../core/store/authStore";
import { ROUTES, toastOptions } from "../utils";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import PersonIcon from '@mui/icons-material/Person';
import Loading from "../components/Loading/Loading";
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';


export default function Login() {
    const authStore = useAuthStore()
    const navigate = useNavigate();

    useEffect(() => {
        if (authStore.access_token !== "") {
            navigate(ROUTES.MESSAGE)
        }
    }, [authStore.access_token])

    const [values, setValues] = useState({ username: "", password: "" });
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const handleChange = (event) => {
        setValues({ ...values, [event.target.name]: event.target.value });
    };


    const validateForm = () => {
        const { username, password } = values;
        if (username === "") {
            toast.error("Username and Password is required.", toastOptions);
            return false;
        } else if (password === "") {
            toast.error("Username and Password is required.", toastOptions);
            return false;
        }
        return true;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (validateForm()) {
            const response = await authStore.fetchSignin(values)

            if (response.status !== 200) {
                Array.isArray(response.data.message) ?
                    response.data.message.map((message) => {
                        toast.error((message || "error"), toastOptions)
                    }) :
                    toast.error((response.data.message || "error"), toastOptions);
            }
        }
    };
    const handleNavigateToRegister = () => {
        navigate(ROUTES.REGISTER)
    }

    const handleVisiblePassword = () => {
        setIsPasswordVisible(!isPasswordVisible)
    }

    return (
        authStore.access_token ?
            <Loading /> :
            <>
                <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
                    <div className="flex flex-col bg-white shadow-md px-4 sm:px-6 md:px-8 lg:px-10 py-8 rounded-3xl w-50 max-w-md">
                        <div className="font-medium self-center text-2xl sm:text-3xl text-gray-800">
                            Welcome Back
                        </div>
                        <div className="mt-4 self-center text-xs sm:text-sm text-gray-800">
                            Enter your credentials to access your account
                        </div>

                        <div className="mt-10">
                            <form action="" onSubmit={(event) => handleSubmit(event)}>
                                <div className="flex flex-col mb-5">
                                    <label htmlFor="username" className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">Username:</label>
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
                                        <div className="inline-flex items-center justify-center absolute h-full w-10 text-gray-400">
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
                                    <a onClick={handleNavigateToRegister} className="text-xs ml-2 text-blue-500 font-semibold cursor-pointer">Register now</a>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </>
    );
}
