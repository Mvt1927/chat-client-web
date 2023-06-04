import { lazy, Suspense } from "react";
import Loading from "../../components/Loading/Loading";
const Logout = lazy(() => import("../Logout"));


export default function SuspensedLogout({ socket }) {

    return (
        <Suspense fallback={<Loading />}>
            <Logout socket={socket}/>
        </Suspense>
    );
}
