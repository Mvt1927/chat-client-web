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
    userReceive?: IUserInfo,
    userSend?: IUserInfo
}
export interface IChatStore {
    currentChats: IChat[],
    newChat: IChat|null
    fetchChats(access_token:string, contact:IContact): any
    onSocketReceiveMessage(socket: Socket, contact:IContact): any
    emitSocketSendMessage(socket: Socket, contact:IContact, message:string): any
    clear(): void
}