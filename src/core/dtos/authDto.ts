import { AxiosResponse } from "axios";
import { Socket } from "socket.io-client";
import { IUserInfo } from "./contactsDto";

export interface ISignin {
  username: string;
  password: string;
}

export interface ISignup extends ISignin {
  email: string;
  firstName: string;
  lastName: string;
}

export interface ITokenPayload {
  id: number;
  name: string;
  username: string;
  iat: number;
  exp: number;
}

export interface IAuthStore {
  access_token: string;
  user: IUserInfo
  fetchSignin(data: ISignin): Promise<AxiosResponse>;
  fetchSignup(data: ISignup): any;
  clearAuth(): void;
}

export interface IImage {
  id: number;
  status: string | null;
  name: string;
  url: string;
  createdAt: Date;
  updateAt: Date;
}

export interface ResponseGenerator {
  config?: any;
  data?: any;
  headers?: any;
  request?: any;
  status?: number;
  statusText?: string;
}
