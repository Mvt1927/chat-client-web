import { lazy, Suspense } from "react";
import Loading from "../../components/Loading/Loading";
const Register = lazy(() => import("../Register"));

export default function SuspensedRegister() {

    return (
        <Suspense fallback={<Loading />}>
            <Register />
        </Suspense>
    );
}
