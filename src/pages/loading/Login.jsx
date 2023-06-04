import { lazy, Suspense } from "react";
import Loading from "../../components/Loading/Loading";
const Login = lazy(() => import("../Login"));


export default function SuspensedLogin() {

    return (
        <Suspense fallback={<Loading />}>
            <Login />
        </Suspense>
    );
}
