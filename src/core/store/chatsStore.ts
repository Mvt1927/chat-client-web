import { AxiosResponse } from "axios";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { SOCKET } from "../../utils";
import { getChats, getContacts } from "../apis";
import { checkServerStatus } from "../apis/server";
import { IChatStore } from "../dtos/chatsDto";
import { IContactStore } from "../dtos/contactsDto";
import { useContactsStore } from "./contactsStore";

export const useChatsStore = create<IChatStore>()(
    persist(
        (set, get) => ({
            currentChats: [],
            newChat: null,
            fetchChats: async (access_token, contact) => {
                const response: AxiosResponse = await getChats(access_token, contact);
                if (response.status === 200) {
                    set({
                        currentChats: [...response.data.chat] || []
                    });
                }
                return response
            },
            onSocketReceiveMessage(socket) {
                if (socket) {

                    socket.on(SOCKET.RECEIVE_MESSAGE, (data) => {

                        if (useContactsStore.getState().selectedContact?.id === data.chat.userSendId || useContactsStore.getState().selectedContact?.id === data.chat.userReceiveId) {
                            set({
                                currentChats: [...get().currentChats, data.chat || []],
                            })
                        }
                        set({
                            newChat: data.chat,
                        })
                    })
                }
            },
            emitSocketSendMessage(socket, contact, message) {
                if (socket) {
                    socket.emit(SOCKET.SEND_MESSAGE, {
                        receiverId: contact.id,
                        type: "text",
                        message: message
                    })
                }
            },
            clear() {
                set({
                    currentChats: [],
                    newChat: null,
                })
            },
        }), {
        name: "chat-storage"
    })
)