import { lazy, Suspense } from "react";
import Loading from "../../components/Loading/Loading";
const Test = lazy(() => import("../Test"));

export default function SuspensedTest() {

    return (
        <Suspense fallback={<Loading />}>
            <Test />
        </Suspense>
    );
}
