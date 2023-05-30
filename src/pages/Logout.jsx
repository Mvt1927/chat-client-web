import myGlobalSetting from "../myGlobalSetting";
import { ToHome } from "../navigate";

export default function Logout({socket}){
    sessionStorage.removeItem(myGlobalSetting.ACCESS_TOKEN)
    socket?.current?.disconnect()
    return <ToHome />
}