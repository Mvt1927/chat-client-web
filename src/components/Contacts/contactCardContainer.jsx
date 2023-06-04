import { Component } from "react";
import Button from "@mui/material/Button"
import Avatar from '@mui/material/Avatar'
import moment from 'moment'
import dateShort from "./moment-shortformat";
import { useContactsStore } from "../../core/store/contactsStore";
import { ROUTES } from "../../utils";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../core/store/authStore";

export default function ContactCardContainer({ contact, className }) {
    const authStore = useAuthStore();
    const contactsStore = useContactsStore();
    const navigate = useNavigate();

    const handleOnClick = () => {
        contactsStore.setSelectedContactId(contact.id)
        navigate(`${ROUTES.MESSAGE}/${contact.id}`)
    }
    return (
        <div color="inherit" id={contact.id} className={(contactsStore.selectedContactId === contact.id ? " select " : "") + "" + className} onClick={handleOnClick}>
            <Button className="w-full" color="inherit">
                <div className="item-friend w-full h-full flex flex-row text-justify items-center normal-case ">
                    <div className="w-fit pr-2.5">
                        <Avatar sx={{ width: 42, height: 42 }} style={{ border: '1.5px solid gray' }} >
                            <img
                                src={contact.srcAvatar || '/avatar.jpg'}
                                alt=""
                            />
                        </Avatar>
                    </div>
                    <div className="friend-info w-4/5 flex flex-col">
                        <span className="name-friend text text-base truncate">{contact.name ? contact.name : contact.id}</span>
                        <div className="lastest-message flex flex-row">
                            <span className="short-text-latest-message max-w-fit w-4/6 text-xs font-light whitespace-nowrap truncate font-base">
                                {contact.chat?.userSendId
                                    ? authStore.id === contact.chat?.userSendId
                                        ? ("You: " + contact.chat.messages?.value)
                                        : contact.chat.messages?.value : ""}
                            </span>
                            <p className="text-xs">&nbsp;</p>
                            <p className="text-xs"> · </p>
                            <p className="text-xs">&nbsp;</p>
                            <span className="time-receive-latest-message w-1/6 text-xs font-light whitespace-nowrap">
                                {!contact.chat.updateAt ? "" : dateShort(contact.chat.updateAt)}
                            </span>
                        </div>
                    </div>
                </div>
            </Button>
        </div>
    );
}

