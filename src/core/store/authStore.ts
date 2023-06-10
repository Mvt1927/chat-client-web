import { create } from "zustand";
import jwt from "jwt-decode";
import { persist } from "zustand/middleware";
import { signin, signup } from "../apis";
import { IAuthStore, ITokenPayload } from "../dtos";
import { AxiosResponse } from "axios";
import moment from "moment";

export const useAuthStore = create<IAuthStore>()(
  persist(
    (set) => ({
      access_token: "",
      user: {
        id: NaN,
        username: "",
        name: "",
        avatar: null,
      },
      fetchSignin: async (data) => {
        const response: AxiosResponse = await signin(data);
        if (response.status === 200) {
          set({
            access_token: response.data.access_token,
            user: response.data.user
          });
        }
        return response
      },
      fetchSignup: async (data) => {
        const response: AxiosResponse = await signup(data);
        if (response.status === 201) {
          set({
            access_token: response.data.access_token,
            user: response.data.user
          });

        }
        return response
      },
      clearAuth: () => {
        set({
          access_token: "",
          user: {
            id: NaN,
            username: "",
            name: "",
            avatar: null,
          }
        });
      },
    }),
    {
      name: "auth-storage",
      onRehydrateStorage: (state) => {
        console.log('hydration starts')
        return (state, error) => {
          if (error) {
            state?.clearAuth()
          } else {
            console.log('hydration finished')
            if (state) {
              if (state.access_token != "") {
                try {
                  var decodedToken: ITokenPayload = jwt(state.access_token)
                  var dateNow = moment();
                  if (decodedToken.exp < dateNow.unix())
                    state.clearAuth()
                } catch (error) {
                  state.clearAuth()
                }
              }
            }
          }
        }
      },
    }
  )
);
