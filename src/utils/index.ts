// export const BASE_URL = "https://chatapp-server2.herokuapp.com/"

// export const BASE_URL = "http://127.0.0.1:3333/"
export const BASE_URL = "https://192.168.1.12:3333/"
export const PEER_HOST = "192.168.1.12"
export const PEER_PORT = 3334

export enum ROUTES {
    LOGIN = '/login',
    LOGOUT = '/logout',
    REGISTER = '/signup',
    HOME = '/',
    MESSAGE = '/m',
    MESSAGE_ID = '/m/:id',
    TEST = '/test',
}
export const toastOptions = {
    position: "bottom-right",
    autoClose: 3000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
};
export const TIMEOUT = 1000
export enum SOCKET {
    SEND_MESSAGE = "sendMessage",
    RECEIVE_MESSAGE = "receiveMessage"
}



