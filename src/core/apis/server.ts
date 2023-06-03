import AXIOS from "./axiosClient";


export const checkServerStatus: () => Promise<boolean> = async () => {
    const status = AXIOS.get("")
        .then(function (response) {
            return true;
        })
        .catch(function (error) {
            return false;
        });
    return status
};