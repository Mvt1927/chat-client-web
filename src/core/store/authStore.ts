import { create } from "zustand";
import jwt from "jwt-decode";
import { persist } from "zustand/middleware";
import { signin, signup } from "../apis";
import { IAuthStore, ITokenPayload } from "../dtos";
import { AxiosResponse } from "axios";

export const useAuthStore = create<IAuthStore>()(
  persist(
    (set) => ({
      access_token: "",
      username: "",
      name: "",
      id: NaN,
      fetchSignin: async (data) => {
        const response: AxiosResponse = await signin(data);
        if (response.status === 200) {
          set({
            access_token: response.data.access_token,
            username: response.data.username,
            name: response.data.name,
            id: response.data.id,
          });
        }
        return response
      },
      fetchSignup: async (data) => {
        const response: AxiosResponse = await signup(data);
        if (response.status === 201) {
          set({
            access_token: response.data.access_token,
            username: response.data.username,
            name: response.data.name,
            id: response.data.id,
          });

        }
        return response
      },
      clearAuth: () => {
        set({
          access_token: "",
          username: "",
          name: "",
          id: NaN,
        });
      },
    }),
    {
      name: "auth-storage",
      onRehydrateStorage: (state) => {
        console.log('hydration starts')
        if (state.access_token != "") {
          try {
            var decodedToken: ITokenPayload = jwt(state.access_token)
            var dateNow = new Date();
            if (decodedToken.exp < dateNow.getTime())
              state.clearAuth()
          } catch (error) {
            state.clearAuth()
          }
        }
        // optional
        return (state, error) => {
          if (error) {
            state?.clearAuth()
          } else {
            console.log('hydration finished')
          }
        }
      },
    }
  )
);
