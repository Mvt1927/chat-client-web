import { Component } from "react";
import Avatar from "@mui/material/Avatar"
import Button from "@mui/material/Button"
import { useContactsStore } from "../../core/store/contactsStore";

export default function UserCardTopContainer() {

    const contactsStore = useContactsStore()
    const selectedContact = contactsStore.selectedContact

    return (
        <Button color="inherit">
            <Avatar sx={{ width: 36, height: 36 }} className="mx-1 justify-center flex items-center">
                <img
                    src={selectedContact.avatar ? selectedContact.avatar.url : "/avatar.jpg"}
                    alt="avatar"
                />
            </Avatar>
            <div className="flex flex-col px-2 normal-case text-justify max-w-[30vw] sm:max-w-[40vw] md:max-w-[50vw]">
                <a className="text-base whitespace-nowrap max-w-full truncate">{`${selectedContact.name} (${selectedContact.username})`}</a>
            </div>
        </Button>
    )
}
