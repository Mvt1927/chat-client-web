import React, { useEffect, useRef, useState } from "react";
import FunctionButton from "../functionButton";
import UserCardTopContainer from "./userCardTopContainer";
import Picker from "emoji-picker-react";
import { useNavigate } from "react-router-dom";
import { useContactsStore } from "../../core/store/contactsStore";
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import { useChatsStore } from "../../core/store/chatsStore";
import { ROUTES } from "../../utils";
import { useSocketStore } from "../../core/store/socketStore";
import CallIcon from '@mui/icons-material/Call';
import VideocamIcon from '@mui/icons-material/Videocam';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import AddIcon from '@mui/icons-material/Add';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import GifBoxIcon from '@mui/icons-material/GifBox';
import SendIcon from '@mui/icons-material/Send';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import CallEndIcon from '@mui/icons-material/CallEnd';
import CloseIcon from '@mui/icons-material/Close';
import Close from "@mui/icons-material/Close";
import PhoneIcon from '@mui/icons-material/Phone';
import { useAuthStore, usePeerStore } from "../../core/store";
import { Avatar } from "@mui/material";
import Video from "./video";


export default function CallContainer() {
    const chatsStore = useChatsStore()
    const socketStore = useSocketStore()
    const peerStore = usePeerStore()
    const authStore = useAuthStore()
    const contactsStore = useContactsStore()

    const handleRefuse = () => {
        console.log(chatsStore.call);
        socketStore.socket.emit("call.request.refuse", {
            chatId: chatsStore.call?.chat?.id
        })
        chatsStore.clearHasCall()
    }
    const handleClose = () => {
        socketStore.socket.emit("call.close", {
            chatId: chatsStore.call?.chat?.id
        })
        chatsStore.clearHasRequestCall()
    }


    const handleAccept = async () => {

        console.log(chatsStore.call);
        const stream = await peerStore.getMedia({ audio: true, video: true })
        const peer = await peerStore.fetchPeer(authStore.access_token)
        chatsStore.setOncall(true)
        peer.on('call', async function (call) {

            call.answer(stream);
            await peerStore.fetchPeerMedia(call)

            // var peervideo = document.getElementById('peerVideo')
            // peervideo.srcObject = peerStore.peerStream
            
            // var myvideo = document.getElementById('myVideo')
            // myvideo = peerStore.stream

            call.on('close', function () {
                alert("The videocall has finished");
            });

        });

        peer.on('open', function () {
            socketStore.socket.emit("call.request.accept", {
                chatId: chatsStore.call?.chat?.id,
                peerId: peer.id
            })
        })
    }
    return (
        <div className={`absolute ${!chatsStore.hasCall && 'hidden'} w-full h-full flex justify-center items-center z-20 backdrop-blur-[2px] bg-white bg-opacity-[0.02]`}>
            <div className={`${chatsStore.onCall && 'hidden'} flex flex-col justify-center items-center shadow-md px-4 sm:px-6 md:px-8 lg:px-10 py-8 rounded-3xl w-full h-full md:w-6/12 md:h-8/12 max-w-md bg-white`}>
                <div className={`right-container z-10 flex flex-col h-full`}>
                    <div className={`flex h-full w-full justify-around flex-col ${(chatsStore.hasRequestCall || chatsStore.onCall) && 'hidden'}`}>
                        <div className="flex justify-center flex-col items-center">
                            <Avatar sx={{ width: 124, height: 124 }} >
                                <img
                                    src={chatsStore.call?.chat?.userSend?.avatar ? chatsStore.call?.chat?.userSend?.avatar.url : "/avatar.jpg"}
                                    alt="avatar"
                                />
                            </Avatar>
                            <div className="flex justify-center mt-2">
                                {chatsStore.call?.chat?.userSend ? `${chatsStore.call?.chat.userSend.name} (${chatsStore.call?.chat.userSend.username})` : "name (username)"}
                            </div>
                        </div>
                        <div className="w-full flex justify-around">
                            <FunctionButton
                                onClick={handleRefuse}
                                className="text-white text-2xl"
                                size={50}
                                bgColor="#D21312"
                                Icon={Close}
                            />
                            <FunctionButton
                                onClick={handleAccept}
                                className="text-white text-2xl"
                                size={50}
                                bgColor="#44C662"
                                Icon={PhoneIcon}
                            />
                        </div>
                    </div>
                    <div className={`flex h-full w-full justify-around flex-col ${(!chatsStore.hasRequestCall || chatsStore.onCall) && 'hidden'}`}>
                        <div className="flex justify-center flex-col items-center">
                            <Avatar sx={{ width: 124, height: 124 }} >
                                <img
                                    src={contactsStore.selectedContact?.avatar ? contactsStore.selectedContact?.avatar.url : "/avatar.jpg"}
                                    alt="avatar"
                                />
                            </Avatar>
                            <div className="flex justify-center mt-2">
                                {contactsStore.selectedContact ? `${contactsStore.selectedContact?.name} (${contactsStore.selectedContact?.username})` : "name (username)"}
                            </div>
                        </div>
                        <div className="w-full flex justify-around">
                            <FunctionButton
                                onClick={handleClose}
                                className="text-white text-2xl"
                                size={50}
                                bgColor="#D21312"
                                Icon={CallEndIcon}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className={`${!chatsStore.onCall && 'hidden'} flex flex-col justify-center items-center shadow-md p-2 ml-2 rounded-3xl w-full h-full bg-white`}>
                <div className={`right-container z-10 flex flex-col h-full`}>
                    <div className={`relative h-full w-full justify-around flex-col`}>
                        <div className="relative h-full w-full">
                            <div className="peer-video h-full w-full">
                                {/* <video  id="peerVideo" ></video> */}
                                <Video srcObject={peerStore.peerStream} className="w-full h-full" autoPlay/>
                            </div>
                            <div className="absolute video2 h-4/12 w-2/12 min-w-[150px] min-h-[250px] top-2 right-2">
                                <Video srcObject={peerStore.stream}  className="w-full h-full" autoPlay/>
                            </div>
                        </div>
                        <div className="w-full flex justify-around absolute bottom-20">
                            <FunctionButton
                                onClick={handleClose}
                                className="text-white text-2xl"
                                size={50}
                                bgColor="#D21312"
                                Icon={CallEndIcon}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}