import { React} from "react";
import {useParams, useNavigate} from "react-router-dom";
import myGlobalSetting from "./myGlobalSetting";
import Messages from "./pages/Message";
export default function MessageWId({socket}) {
    const navigate = useNavigate()
    const params = useParams();
    if (params.id == null) return <Messages noid={true} socket={socket} />;
    const id = Number(params.id)
    if (id||id==0) return <Messages id={params.id} socket={socket}/>;
    navigate(myGlobalSetting.ROUTE.LOGIN)
    return 
}