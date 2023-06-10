import { IImage } from "./authDto";
import { IChat } from "./chatsDto";

export interface IContact extends IUserInfo {
    chat: IChat[]
}

export interface IUserInfo {
    id: number,
    username: string,
    name: string,
    avatar: IImage | null,
}

export interface IContactStore {
    contacts: IContact[];
    selectedContact: IContact | null;
    setSelectedContact(contact: IContact): any;
    fetchContact(access_token: string): any;
    clear(): void;
    clearSelectedContact(): void;
}