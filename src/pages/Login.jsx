import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Button from "@mui/material/Button"
import "react-toastify/dist/ReactToastify.css";
import myGlobalSetting from "/src/myGlobalSetting"


export default function Login() {
    const loginRoute = myGlobalSetting.loginAPI;
    const navigate = useNavigate();
    const token = sessionStorage.getItem(myGlobalSetting.ACCESS_TOKEN)
    if (token) {
        return navigate('/m')
    }
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
        if (validateForm()) {
            const { username, password } = values;
            const { data } = await axios.post(loginRoute, {
                username: username,
                password: password,
            }).catch(e=>{console.error(e)});
            console.log(data);
            if (data.statusCode === 200||data.status===true) {
                sessionStorage.setItem(myGlobalSetting.ACCESS_TOKEN,data.access_token?data.access_token:data.data?.access_token);
                // console.log(data.data?.access_token)
                navigate("/m");
            }else toast.error((data.message||"error"), toastOptions);
        }
    };

    return (
        <><div className="flex content-center justify-center h-screen flex-col items-center">
            <div className="login-card w-full sm:w-3/4 md:w-2/3 lg:w-1/3 h-fit min-h-3/4" >
                <form className="flex flex-col h-full justify-between" action="" onSubmit={(event) => handleSubmit(event)}>
                    <div className="text-center p-4 flex justify-center">
                        <h1 className="text-5xl w-fit text-blue-600">Login</h1>
                    </div>
                    <div className="flex flex-col w-full mt-4 mb-4 justify-start h-full">
                        <input
                            className="p4 border-solid text-black placeholder:text-slate-600 pl-5 focus:placeholder:text-slate-400 focus:border-blue-700 focus:border-2 focus:outline-none p-2 mb-2 mt-4 mx-4 border-blue-700 rounded-lg border text-lg"
                            type="text"
                            autoComplete="true"
                            placeholder="Username"
                            name="username"
                            onChange={(e) => handleChange(e)}
                            min="3"
                        />
                        <input
                            className="p4 border-solid text-black placeholder:text-slate-600 pl-5 focus:placeholder:text-slate-400 focus:border-blue-700 focus:border-2 focus:outline-none p-2 mx-4 mb-4 mt-2 border-blue-700 rounded-lg border text-lg"
                            autoComplete="true"
                            type="password"
                            placeholder="Password"
                            name="password"
                            onChange={(e) => handleChange(e)}
                        />
                    </div>
                    <div className="flex justify-center flex-col items-center my-4">
                        <Button color="primary" size='large' className="font-bold" variant="contained" type="submit"><div className="font-bold">Log In</div></Button>
                        <div className="text-center">
                            <span className="text-base">
                                Don't have an account ? <Link className="text-blue-500" to="/register">Create One.</Link>
                            </span>
                        </div>
                    </div>
                </form>
            </div>
        </div>
            <ToastContainer className="text-base" />
        </>
    );
}
