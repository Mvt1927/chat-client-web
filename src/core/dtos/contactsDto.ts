import { IChat } from "./chatsDto";

export interface IContact {
    id: number,
    username: string,
    chat: IChat | {}
}

export interface IUserInfo {
    id: number,
    username: string,
    name: string,
}

export interface IContactStore {
    contacts: IContact[];
    selectedContactId: number;
    setSelectedContactId(id: number): any;
    fetchContact(access_token: string): any;
    clear(): void;
}