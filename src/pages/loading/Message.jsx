import { lazy, Suspense } from "react";
import Loading from "../../components/Loading/Loading";
const Message = lazy(() => import("../Message"));


export default function SuspensedMessage({ socket }) {

    return (
        <Suspense fallback={<Loading />}>
            <Message socket={socket} />
        </Suspense>
    );
}
