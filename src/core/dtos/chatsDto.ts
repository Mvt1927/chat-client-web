import { IMessage } from ".";
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