import React, { Component, useEffect, useRef, useState } from "react";
import jwt_decode from 'jwt-decode';
import "/src/css/Message.css";
import myGlobalSetting from "../myGlobalSetting";
import { useNavigate, useParams } from "react-router-dom";
import { io } from "socket.io-client";
import ContactsContainer from "../components/Contacts/contactsContainer"
import Welcome from "../components/Chats/Welcome";
import ChatsContainer from "../components/Chats/chatsContainer";
import axios from "axios";
import { useAuthStore } from "../core/store/authStore";


export default function Message({ socket }) {
    const authStore = useAuthStore()
    const [currentChatID, setCurrentChatID] = useState(NaN);
    var [currentChatUser, setCurrentChatUser] = useState(undefined);
    const [contacts, setContacts] = useState(null);
    const [currentUser, setCurrentUser] = useState(undefined);
    const [arrivalMessage, setArrivalMessage] = useState(null);
    const reload = useRef(false)

    const navigate = useNavigate()
    const params = useParams();

    const id = params.id

    const token = authStore.access_token

    var status = true

    useEffect(() => {
        if (authStore.access_token=="") {
            navigate(myGlobalSetting.ROUTE.LOGIN)
        }
    }, [authStore.access_token]);

    useEffect(() => {
        const getData = async () => {
            if (currentUser) {
                const config = {
                    headers: {
                        Authorization: 'Bearer ' + authStore.access_token
                    }
                }
                await axios.get(
                    myGlobalSetting.USERS,
                    config
                ).then(({ data }) => {
                    // console.log(data)
                    if (data.status===true)
                        setContacts([...data.users])
                    
                    // if (data.statusCode===200)
                    //     setContacts([...data.users])
                    else setContacts([])
                }).catch((e) => {
                    console.log(e)
                    setContacts([])
                })
                sessionStorage.setItem(myGlobalSetting.SOCKET, socket.current)
            }
        }
        getData()
    }, [currentUser, arrivalMessage]);

    useEffect(() => {
        if (currentUser) {
            socket.current = io(myGlobalSetting.HOST, {
                extraHeaders: {
                    access_token: token,
                }
            });
            console.log(socket.current)
            sessionStorage.setItem(myGlobalSetting.SOCKET, socket.current)
        }
    }, [currentUser]);

    useEffect(() => {
        if (Number.isInteger(parseInt(id)) && parseInt(id) >= 0) {
            const chatID = parseInt(id)
            setCurrentChatID(chatID);
            if (contacts) {
                contacts.map(async (contact) => {
                    if (contact.id == chatID) {
                        setCurrentChatUser(contact)
                    }
                });
                if (!currentChatUser) {
                    setCurrentChatID(NaN)
                    setCurrentChatUser(undefined)
                    navigate(myGlobalSetting.ROUTE.MESSAGE)
                }
            }
        } else {
            setCurrentChatID(NaN)
            setCurrentChatUser(undefined)
        }
    }, [id, contacts])

    const handleChatChange = (id, chat) => {
        setCurrentChatID(id)
        setCurrentChatUser(chat);
    };

    if (status)
        return (
            <div className="App flex flex-row">
                <ContactsContainer currentUser={currentUser} contacts={contacts} currentChatID={currentChatID} navigate={navigate} changeChat={handleChatChange} />

                <div className={`chat ${!currentChatID ? 'hidden' : ''} md:block`}>
                    {!currentChatUser
                        ? <Welcome currentUser={currentUser} />
                        : <ChatsContainer currentChatID={currentChatID} currentChat={currentChatUser} socket={socket} arrivalMessage={arrivalMessage} setCurrentChat={setCurrentChatUser} setCurrentChatID={setCurrentChatID} setArrivalMessage={setArrivalMessage} />
                    }
                </div>
            </div>
        );
}

