import { AxiosResponse } from "axios";

export interface ISignin {
  username: string;
  password: string;
}

export interface ISignup extends ISignin {
  email: string;
  firstName:string;
  lastName:string;
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
  username: string;
  id: number;
  name:string;
  fetchSignin(data: ISignin): any;
  fetchSignup(data: ISignup): any;
  clearAuth(): void;
}

export interface IUser {
  email: string;
  username: string;
  id: number;
  avatar?: string;
  firstName?: string;
  lastName?: string;
}

export interface ResponseGenerator {
  config?: any;
  data?: any;
  headers?: any;
  request?: any;
  status?: number;
  statusText?: string;
}
