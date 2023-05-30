import { useEffect} from "react";
import {useNavigate } from "react-router-dom";

export function ToHome() {
    const navigate = useNavigate()
    return useEffect(() => {
        navigate('/m')
    })
}