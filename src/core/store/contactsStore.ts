import { AxiosResponse } from "axios";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { getContacts } from "../apis";
import { checkServerStatus } from "../apis/server";
import { IContactStore } from "../dtos/contactsDto";

export const useContactsStore = create<IContactStore>()(
    persist(
        (set, get) => ({
            contacts: [],
            selectedContact: null,
            setSelectedContact(contact) {
                set({
                    selectedContact: contact || null
                })
            },
            fetchContact: async (access_token) => {
                const response: AxiosResponse = await getContacts(access_token);
                if (response.status === 200) {
                    set({
                        contacts: [...response.data.users] || []
                    });
                }
                return response
            },
            clear() {
                set({
                    contacts: [],
                    selectedContact: null,
                })
            },
            clearSelectedContact() {
                set({
                    selectedContact: null,
                })
            },
        }), {
        name: "server-storage"
    })
)