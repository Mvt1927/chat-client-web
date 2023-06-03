import { create } from "zustand";
import { persist } from "zustand/middleware";
import { checkServerStatus } from "../apis/server";
import { IServer } from "../dtos/serverDto";

export const useServerStore = create<IServer>()(
    persist(
        (set, get) => ({
            serverStatus: false,
            fetchCheckServerStatus: async (serverStatusChangeEvent?: (status?:boolean) => void) => {
                const status = await checkServerStatus();
                if (status !== get().serverStatus) {
                    if (serverStatusChangeEvent!=undefined) {
                        serverStatusChangeEvent(status)
                    }
                    set({
                        serverStatus: status
                    })
                }
            },
        }), {
        name: "server-store"
    })
)