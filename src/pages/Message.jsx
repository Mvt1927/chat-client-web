import React, { useEffect, useState } from "react";
import "/src/css/Message.css";
import { useNavigate, useParams } from "react-router-dom";
import ContactsContainer from "../components/Contacts/contactsContainer"
import Wellcome from "../components/Chats/Welcome";
import ChatsContainer from "../components/Chats/chatsContainer";
import { useAuthStore } from "../core/store/authStore";
import { ROUTES } from "../utils";
import { useSocketStore } from "../core/store/socketStore";
import { useContactsStore } from "../core/store/contactsStore";
import { useChatsStore } from "../core/store/chatsStore";


export default function Message({ socket }) {
    const authStore = useAuthStore()
    const socketStore = useSocketStore()
    const contactsStore = useContactsStore()
    const chatsStore = useChatsStore()
    const navigate = useNavigate()
    const { id } = useParams()

    var status = true

    useEffect(() => {
        if (!authStore.access_token) {
            navigate(ROUTES.LOGIN)
        }
    }, [authStore.access_token]);

    useEffect(() => {
        if (authStore.access_token) {
            contactsStore.fetchContact(authStore.access_token)
        }
    }, [authStore.access_token, chatsStore.newChat]);

    useEffect(() => {
        if (authStore.access_token) {
            socketStore.fetchSocket(authStore.access_token)
        }
    }, [authStore.access_token]);

    useEffect(() => {
        if (Number.isInteger(parseInt(id)) && parseInt(id) >= 0) {
            const chatID = parseInt(id)
            if (contactsStore.contacts) {
                contactsStore.contacts.map(async (contact) => {
                    if (contact.id === chatID) {
                        contactsStore.setSelectedContact(contact)
                    }
                });
                if (contactsStore.selectedContact) {
                    navigate(ROUTES.MESSAGE + '/' + contactsStore.selectedContact.id)
                }
            }
        } else {
            contactsStore.setSelectedContact(null)
        }
    }, [id, contactsStore.contacts])

    useEffect(() => {
        if (socketStore.socket) {
            chatsStore.onSocketReceiveMessage(socketStore.socket)
        }
    }, [socketStore.socket]);

    useEffect(() => {
        chatsStore.fetchChats(authStore.access_token, contactsStore.selectedContact)
    }, [contactsStore.selectedContact]);

    if (status)
        return (
            <div className="App flex flex-row">
                <ContactsContainer />

                <div className={`chat ${!contactsStore.selectedContact && 'hidden'} md:block`}>
                    {!contactsStore.selectedContact
                        ? <Wellcome />
                        : <ChatsContainer />
                    }
                </div>
            </div>
        );
    return (<></>)
}

