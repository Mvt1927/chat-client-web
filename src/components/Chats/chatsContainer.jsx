import React, { useEffect, useRef, useState } from "react";
import FunctionButton from "../functionButton";
import UserCardTopContainer from "./userCardTopContainer";
import { v4 as uuidv4 } from "uuid";
import axios from "axios"
import jwtDecode from "jwt-decode";
import Picker from "emoji-picker-react";
import { useNavigate } from "react-router-dom";
import { useContactsStore } from "../../core/store/contactsStore";
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import { useChatsStore } from "../../core/store/chatsStore";
import { ROUTES } from "../../utils";
import { useSocketStore } from "../../core/store/socketStore";


export default function ChatsContainer() {
    const [messages, setMessages] = useState([]);
    const socketStore = useSocketStore();
    const [msg, setMsg] = useState("");

    const scrollRef = useRef();
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const navigate = useNavigate()
    const handleEmojiPickerhideShow = (e) => {
        setShowEmojiPicker(!showEmojiPicker);
    };
    const contactsStore = useContactsStore();
    const chatsStore = useChatsStore()


    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [chatsStore.currentChats]);

    const sendChat = (event) => {
        event.preventDefault();
        setShowEmojiPicker(false)
        if (msg.length > 0) {
            handleSendMsg(msg);
            setMsg("");
        }
    };
    const handleSendMsg = async (msg) => {
        chatsStore.emitSocketSendMessage(socketStore.socket, contactsStore.selectedContact, msg)
    };
    const handleEnter = (e) => {
        if (e.code == 'Enter') {
            sendChat(e);
        }
    }
    const handleEmojiClick = (emojiObject) => {
        let message = msg;
        message += emojiObject.emoji;
        setMsg(message);
    };

    const handleBackClick = (e) => {
        e.preventDefault();
        chatsStore.clear();
        contactsStore.clearSelectedContact();
        navigate(ROUTES.MESSAGE)
    }

    return (
        <div id={contactsStore.selectedContact.username + "_container"} className="right-container flex flex-col h-full">
            <div className="friend-top-right-container border-b border-border-color h-14">
                <div className="friend-container h-full flex flex-row justify-between px-2.5 py-1">
                    <div className="w-fit flex items-center flex-nowrap">
                        <div className="md:hidden contents">
                            <FunctionButton
                                onClick={handleBackClick}
                                className="text-blue-400 text-2xl"
                                size={36}
                                Icon={KeyboardArrowLeftIcon}
                            />
                        </div>
                        <UserCardTopContainer obj={contactsStore.selectedContact} />
                    </div>
                    <div className="fun-btn flex flex-row w-fit items-center">
                        <FunctionButton
                            className="text-blue-400 fa-solid fa-phone text-lg"
                            size={36}
                            Icon={KeyboardArrowLeftIcon}
                        />
                        <FunctionButton
                            className="text-blue-400 fa-solid fa-video text-lg"
                            size={36}
                            Icon={KeyboardArrowLeftIcon}
                        />
                        <FunctionButton
                            className="text-blue-400 fa-solid fa-ellipsis text-lg"
                            size={36}
                            Icon={KeyboardArrowLeftIcon}
                        />
                    </div>
                </div>
            </div>
            <div className="message-mid-right-container -h-h-14">
                <div className="message-mid-container flex flex-col justify-between h-full ">
                    <div className="message-interface-container -h-h-14 overflow-hidden ">
                        <div className="message-interface h-full flex flex-col justify-end">
                            <div className="chat-messages h-fit overflow-auto px-4 py-4 gap-1.5">
                                {
                                    chatsStore.currentChats.map((chat, index) => {
                                        // console.log(message)
                                        return (
                                            <div className="message-container" ref={scrollRef} key={chat.id}>

                                                {chat.userReceiveId === contactsStore.selectedContact.id
                                                    ? <div className="message sender flex justify-end" >
                                                        <div className={`content w-fit bg-blue-400 rounded-3xl px-3 py-2 break-words 
                                                    ${chatsStore.currentChats[index - 1]?.userReceiveId === contactsStore.selectedContact.id ? "rounded-tr-md my-[1px]" : "my-0.5 "}
                                                    ${chatsStore.currentChats[index + 1]?.userReceiveId === contactsStore.selectedContact.id ? "rounded-br-md my-[1px]" : "my-0.5 "}`}>
                                                            <p className="w-fit max-w-[50vw] sm:max-w-[30vw] text-base font-light text-white">{chat.messages.value}</p>
                                                        </div>
                                                    </div>
                                                    : <div className="message reciver flex" >
                                                        <div className={`content w-fit bg-[#E4E6EB] rounded-3xl px-3 py-2 break-words 
                                                    ${chatsStore.currentChats[index - 1]?.userSendId === contactsStore.selectedContact.id ? "rounded-tl-md my-[1px] " : "my-0.5"} 
                                                    ${chatsStore.currentChats[index + 1]?.userSendId === contactsStore.selectedContact.id ? "rounded-bl-md my-[1px]" : "my-0.5"}`}>
                                                            <p className="w-fit max-w-[50vw] sm:max-w-[30vw] text-base font-light">{chat.messages.value}</p>
                                                        </div>
                                                    </div>}
                                            </div>
                                        );
                                    })}
                            </div>
                            {showEmojiPicker &&
                                <div style={{ bottom: 68, right: 64 }} className="absolute hidden text-xs w-[30vw] md:flex emoji-container">
                                    <Picker width={"30vw"} height={"50vh"} disableAutoFocus={true} suggestedEmojisMode={false} defaultSkinTone onEmojiClick={handleEmojiClick} />
                                </div>}
                        </div>
                    </div>
                    <div className="message-fuc-btn-container h-14 border-t border-f2f2f2">
                        <div className="message-fuc-btn p-2.252 h-full flex items-center">
                            <div className="fuc-btn-left flex flex-row w-fit items-center">
                                <FunctionButton
                                    className="fa-solid text-lg fa-circle-plus text-blue-400"
                                    size={36}
                                    Icon={KeyboardArrowLeftIcon}

                                />
                                <FunctionButton
                                    className="fa-regular text-lg fa-image text-blue-400"
                                    size={36}
                                    Icon={KeyboardArrowLeftIcon}

                                />
                                <FunctionButton
                                    className="fa-solid text-lg fa-gif text-blue-400"
                                    size={36}
                                    Icon={KeyboardArrowLeftIcon}

                                />
                            </div>
                            <div className="input-mid-container ml-2.5 pl-2.5 rounded-full flex flex-row justify-items-center h-full bg-f2f2f2">
                                <input
                                    type="text"
                                    className="text-sm font-light h-full w-full p-2.252 rounded-full bg-f2f2f2 
                        placeholder:text-sm placeholder:text-7C676B 
                        focus:outline-none"
                                    onChange={(e) => setMsg(e.target.value)}
                                    placeholder="Aa"

                                    onKeyDown={e => { handleEnter(e) }}
                                    value={msg}
                                />
                                <div className="md:contents hidden ">
                                    <FunctionButton
                                        onClick={handleEmojiPickerhideShow}
                                        className="fa-solid fa-face-smile text-lg text-blue-400"
                                        size={36}
                                        Icon={KeyboardArrowLeftIcon}

                                    />
                                </div>
                            </div>
                            <div className="fun-send-btn-end w-15 flex justify-center">
                                <FunctionButton
                                    onClick={sendChat}
                                    className="text-lg fa-solid fa-paper-plane-top text-blue-400"
                                    size={36}
                                    Icon={KeyboardArrowLeftIcon}

                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}