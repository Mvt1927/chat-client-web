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
                transports: ['websocket'],
                extraHeaders: {
                    access_token: access_token
                },
                auth:{
                    access_token:access_token
                }
            });
            socket.on("connect_error", (err) => {
                console.error(`connect_error due to ${err.message}`);
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
