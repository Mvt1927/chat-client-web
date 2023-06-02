import { Suspense } from "react";
import Login from "../Login";

export default function SuspensedLogin() {
    
    return (
        <Suspense>
            <Login />
        </Suspense>
    );
}
