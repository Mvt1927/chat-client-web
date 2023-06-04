import { create } from "zustand";
import jwt from "jwt-decode";
import { persist } from "zustand/middleware";
import { signin, signup } from "../apis";
import { IAuthStore, ITokenPayload } from "../dtos";
import { AxiosResponse } from "axios";
import { ISocketStore } from "../dtos/socketDto";
import { io } from "socket.io-client";
import { BASE_URL } from "../../utils";

export const useSocketStore = create<ISocketStore>()(
    (set) => ({
        socket: undefined,
        fetchSocket(access_token) {
            const socket = io(BASE_URL, {
                extraHeaders: {
                    access_token: access_token,
                }
            });
            set({
                socket: socket
            });
            return socket
        },
        clear: () => {
            set({
                socket: undefined
            });
        },
    }),

);
