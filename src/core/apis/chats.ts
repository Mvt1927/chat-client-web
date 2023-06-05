import { IContact } from "../dtos";
import AXIOS from "./axiosClient";

const subdirectory = "/chat";

export const getChats = async (access_token: string, contact: IContact) => {
  try {
    const res = await AXIOS.get(`${subdirectory}/${contact.id}`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    return res;
  } catch (error) {
    return error.response || error;
  }
};
