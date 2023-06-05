import { ISignin, ISignup, ResponseGenerator } from "../dtos";
import AXIOS from "./axiosClient";

const subdirectory = "/auth";


export const signup = async (data: ISignup) => {
  try {
    const res = await AXIOS.post(`${subdirectory}/signup`, data);
    return res;
  } catch (error) {
    return error.response || error;
  }
};

export const signin = async (data: ISignin) => {
  try {
    return await AXIOS.post(`${subdirectory}/signin`, data);
  } catch (error) {
    return error.response || error;
  }
};

export const getContacts = async (access_token: string) => {
  try {
    const res = await AXIOS.get(`${subdirectory}/users`, {
      headers: {
        "Authorization": `Bearer ${access_token}`,
      },
    });
    return res;
  } catch (error) {
    console.log(error)
    return error.response || error;
  }
};
