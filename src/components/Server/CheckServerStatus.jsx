import React, { useEffect } from 'react';
import axios from 'axios';
import { TIMEOUT, toastOptions } from '../../utils';
import { checkServerStatus } from '../../core/apis/server';
import { useServerStore } from '../../core/store/serverStore';
import { toast } from 'react-toastify';

export default function ServerConnectionChecker() {
    const interval = TIMEOUT;
    const serverStore = useServerStore()
    const handleCheckServer = () => {
        serverStore.fetchCheckServerStatus((status) => {
            status ? toast.success("Server is now online.", toastOptions): toast.error("Server is not respone.", toastOptions);
        }
        )
    }
    useEffect(() => {

        const intervalId = setInterval(handleCheckServer, interval);

        return () => {
            clearInterval(intervalId);
        };
    }, []);

    return (<></>);
};
