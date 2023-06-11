import { Socket } from "socket.io-client";
import { IContact, IMessage } from ".";
import { IUserInfo } from "./contactsDto"

export interface IChat {
    id: number
    type: "text" | "voice" | 'image' | 'call' | 'sticker';
    userSendId: number
    userReceiveId: number
    messageId: number | null
    imageID: number | null
    stickerID: number | null
    callID: number | null
    status: string | null
    createdAt: Date
    updateAt: Date
    messages?: IMessage,
    calls: any,
    image: any,
    sticker: any,
    userReceive?: IUserInfo,
    userSend?: IUserInfo
}
export interface ICall {
    type?: string,
    chat?: IChat,
    reciverPeerId?: string
}
export interface IChatStore {
    currentChats: IChat[],
    newChat: IChat | null,
    hasRequestCall: boolean,
    hasCall: boolean,
    onCall: boolean,
    call?: ICall
    fetchChats(access_token: string, contact: IContact): any
    onSocketReceive(socket: Socket, contact: IContact): any
    emitSocketSendMessage(socket: Socket, contact: IContact, message: string): any
    clearHasCall(): void
    clearHasRequestCall(): void
    setHasRequestCall(data: ICall): void
    setHasCall(data: any): void
    setOncall(isOnCall: boolean): void
    clear(): void
}