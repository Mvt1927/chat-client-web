import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Button from "@mui/material/Button"
import "react-toastify/dist/ReactToastify.css";
import { useAuthStore } from "../core/store/authStore";
import jwtDecode from "jwt-decode";
import { ROUTES } from "../utils";
import { useChatsStore } from "../core/store/chatsStore";
import { useSocketStore } from "../core/store/socketStore";
import { usePeerStore } from "../core/store";
import Video from "../components/Chats/video";


export default function Test() {
    const authStore = useAuthStore();
    const chatStore = useChatsStore();
    const socketStore = useSocketStore();
    const navigate = useNavigate();
    const peerStore = usePeerStore()

    const [testStream, setTestStream] = useState(undefined)
    const validJwt = obj =>
        new Proxy(obj, {
            get: (obj, key) => {
                try {
                    var decodedToken = jwtDecode(obj[key], { complete: true })
                    var dateNow = new Date();
                    if (decodedToken.exp > dateNow.getTime())
                        return obj[key]
                    return undefined
                } catch (error) {
                    return {}
                }
            }
        });

    const handleNavi = () => {
        authStore.clearAuth()
        navigate(ROUTES.HOME)

    }

    const test = () => {
        console.log(authStore)
    }
    const testsocket = () => {
        console.log(socketStore.socket)
    }
    const testPeer = () => {

        console.log("send");
        socketStore.socket?.emit("call.request.send", {
            type: "text",
            receiverId: 5
        })
        socketStore.socket?.once('call.answer.receive', (data) => {
            console.log(data);
        })
    }
    const testMedia = async () => {
        const stream = await peerStore.getMedia({ audio: true, video: true })
        setTestStream(stream)
        console.log(stream);
    }
    const closeMedia = () => {
        peerStore.stream.getTracks().forEach(function (track) {
            track.stop();
            console.log("close");
        });
        console.log(peerStore.stream);
    }
    return (
        <div className="flex content-center justify-center h-screen flex-col items-center">
            <div className="login-card w-full sm:w-3/4 md:w-2/3 lg:w-1/3 h-fit min-h-3/4" >
                <Button onClick={test} color="primary" size='large' className="font-bold" variant="contained" type="submit">
                    <div className="font-bold">TEST</div>
                </Button>
                <Button onClick={testPeer} color="primary" size='large' className="font-bold" variant="contained" type="submit">
                    <div className="font-bold">TEST 1</div>
                </Button>
                <Button onClick={handleNavi} color="primary" size='large' className="font-bold" variant="contained" type="submit">
                    <div className="font-bold">TEST 2</div>
                </Button>
                <Button onClick={testsocket} color="primary" size='large' className="font-bold" variant="contained" type="submit">
                    <div className="font-bold">TEST 3</div>
                </Button>
                <Button onClick={testMedia} color="primary" size='large' className="font-bold" variant="contained" type="submit">
                    <div className="font-bold">testMedia</div>
                </Button>
                <Button onClick={closeMedia} color="primary" size='large' className="font-bold" variant="contained" type="submit">
                    <div className="font-bold">closeMedia</div>
                </Button>
                <Video srcObject={testStream} autoPlay/>
            </div>
        </div>
    );
}
