import React, { Component, useEffect, useRef, useState } from "react";
import jwt_decode from 'jwt-decode';
import "/src/css/Message.css";
import myGlobalSetting from "../myGlobalSetting";
import { useNavigate, useParams } from "react-router-dom";
import { io } from "socket.io-client";
import ContactsContainer from "../components/Contacts/contactsContainer"
import Wellcome from "../components/Chats/Welcome";
import ChatsContainer from "../components/Chats/chatsContainer";
import axios from "axios";
import { useAuthStore } from "../core/store/authStore";
import { BASE_URL, ROUTES } from "../utils";
import { useSocketStore } from "../core/store/socketStore";
import { useContactsStore } from "../core/store/contactsStore";


export default function Message({ socket }) {
    const authStore = useAuthStore()
    const socketStore = useSocketStore()
    const conatctsStore = useContactsStore()


    const [currentChatID, setCurrentChatID] = useState(NaN);
    var [currentChatUser, setCurrentChatUser] = useState(undefined);
    const [contacts, setContacts] = useState(null);
    const [arrivalMessage, setArrivalMessage] = useState(null);

    const navigate = useNavigate()
    const params = useParams();

    const id = params.id


    var status = true

    useEffect(() => {
        if (authStore.access_token === "") {
            navigate(myGlobalSetting.ROUTE.LOGIN)
        }
    }, [authStore.access_token]);

    useEffect(() => {
        if (authStore.access_token) {
            conatctsStore.fetchContact(authStore.access_token)
        }
    }, [authStore.access_token, arrivalMessage]);

    useEffect(() => {
        if (authStore.access_token) {
            socketStore.fetchSocket(authStore.access_token)
        }
    }, [authStore.access_token]);

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

    if (status)
        return (
            <div className="App flex flex-row">
                <ContactsContainer />

                <div className={`chat ${!currentChatID ? 'hidden' : ''} md:block`}>
                    {!currentChatUser
                        ? <Wellcome />
                        : <ChatsContainer currentChatID={currentChatID} currentChat={currentChatUser} socket={socket} arrivalMessage={arrivalMessage} setCurrentChat={setCurrentChatUser} setCurrentChatID={setCurrentChatID} setArrivalMessage={setArrivalMessage} />
                    }
                </div>
            </div>
        );
}

