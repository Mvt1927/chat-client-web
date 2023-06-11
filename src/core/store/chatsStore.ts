import { AxiosResponse } from "axios";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { SOCKET } from "../../utils";
import { getChats, getContacts } from "../apis";
import { checkServerStatus } from "../apis/server";
import { IChatStore } from "../dtos/chatsDto";
import { IContactStore } from "../dtos/contactsDto";
import { useContactsStore } from "./contactsStore";
import { usePeerStore } from "./peerStore";

export const useChatsStore = create<IChatStore>()(
    persist(
        (set, get) => ({
            currentChats: [],
            newChat: null,
            hasRequestCall: false,
            hasCall: false,
            onCall: false,
            call: undefined,
            fetchChats: async (access_token, contact) => {
                const response: AxiosResponse = await getChats(access_token, contact);
                if (response.status === 200) {
                    set({
                        currentChats: [...response.data.chat] || []
                    });
                }
                return response
            },
            onSocketReceive(socket) {
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
                    socket.on("call.receive", (data) => {
                        console.log(data);

                        if (data.type === 'request') {
                            set({
                                call: data,
                                hasCall: true,
                            })
                        }else if (data.type === 'request.data') {
                            set({
                                call: data,
                            })
                        }else if (data.type === 'request.close') {
                            usePeerStore.getState().clear()
                            get().clearHasRequestCall()
                        }else
                        get().clearHasRequestCall()
                    })
                }
            },
            setOncall(isOnCall) {
                set({
                    onCall: isOnCall
                })
            },
            setHasRequestCall(data) {
                if (data) {
                    set({
                        call: data,
                        hasCall: true,
                        hasRequestCall: true,
                    })
                }
            },
            setHasCall(data) {
                if (data) {
                    set({
                        call: data,
                        hasCall: true,
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
            clearHasCall() {
                set({
                    call: undefined,
                    hasCall: false,
                    onCall: false,
                })
            },
            clearHasRequestCall() {
                set({
                    call: undefined,
                    hasCall: false,
                    hasRequestCall: false,
                    onCall: false,
                })
            },
            clear() {
                set({
                    currentChats: [],
                    newChat: null,
                    call: undefined,
                    hasCall: false,
                    onCall: false,
                    hasRequestCall: false
                })
            },
        }), {
        name: "chat-storage"
    })
)