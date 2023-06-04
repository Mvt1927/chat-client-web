import { Socket } from "socket.io-client";

export interface ISocketStore {
    socket: Socket | undefined;
    fetchSocket(access_token: string): Socket;
    clear(): void;
}
