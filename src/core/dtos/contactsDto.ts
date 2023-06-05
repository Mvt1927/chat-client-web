import { IChat } from "./chatsDto";

export interface IContact {
    id: number,
    username: string,
    name: string
    chat: IChat[]
}

export interface IUserInfo {
    id: number,
    username: string,
    name: string,
}

export interface IContactStore {
    contacts: IContact[];
    selectedContact: IContact | null;
    setSelectedContact(contact: IContact): any;
    fetchContact(access_token: string): any;
    clear(): void;
    clearSelectedContact(): void;
}