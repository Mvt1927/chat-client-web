import { create } from "zustand";
import jwt from "jwt-decode";
import { persist } from "zustand/middleware";
import { signin, signup } from "../apis";
import { IAuth, IResAuth } from "../dtos";

export const useAuthStore = create<IAuth>()(
  persist(
    (set, get) => ({
      access_token: "",
      username: "",
      email: "",
      id: undefined,
      fetchSignin: async (data) => {
        const response = await signin(data);

        if (response.status == 200) {
          const decode_token: IResAuth = jwt(response.data.access_token);
          set({
            access_token: response.data.access_token,
            username: decode_token.username,
            id: decode_token.userId,
            email: decode_token?.email || "",
          });
        }
        return response
      },
      fetchSignup: async (data) => {
        const response = await signup(data);
        if (response.status == 201) {
          const decode_token: IResAuth = jwt(response.data.access_token);
          set({
            access_token: response.data.access_token,
            username: decode_token.username,
            id: decode_token.userId,
            email: decode_token?.email || "",
          });
        }
        return response
      },

      clearAuth: () => {
        set({
          access_token: "",
          username: "",
          email: "",
        });
      },
    }),
    {
      name: "auth-storage",
    }
  )
);
