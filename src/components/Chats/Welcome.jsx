import React from "react";

export default function Welcome({currentUser}) {
    return (
        <div className="flex h-3/5 text-center flex-col justify-center">
            <h1>
                Welcome, <span>{currentUser?.username}!</span>
            </h1>
            <h3>Please select a chat to Start messaging.</h3>
        </div>
    );
}

