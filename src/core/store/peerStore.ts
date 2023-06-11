import { create } from "zustand";
import { PEER_HOST, PEER_PORT } from "../../utils";
import { IPeerStore } from "../dtos/peerDto";
import Peer, { MediaConnection } from "peerjs";

export const usePeerStore = create<IPeerStore>()(
    (set, get) => ({
        peer: undefined,
        connect: undefined,
        call: undefined,
        stream: undefined,
        peerStream: undefined,
        async getMedia(constraints) {
            try {
                const stream = await navigator.mediaDevices.getUserMedia(constraints);
                set({
                    stream:stream
                })
                return stream
            } catch (err) {
                console.log(err);
                return undefined
            }
        },
        async fetchPeerMedia(call: MediaConnection) {
            call.on('stream', function (stream) {
                set({
                    peerStream: stream
                })
            })
        },
        async fetchPeer(access_token) {
            const newPeer = new Peer({
                host: PEER_HOST,
                port: PEER_PORT,
                token: access_token
            });
            set({
                peer: newPeer
            })
            return newPeer
        },
        async fetchPeerConnect(peerId) {
            if (get().peer) {
                const conn = get().peer?.connect(peerId)
                set({
                    connect: conn
                })
                return conn
            }
        },
        async fetchPeerCall(peerId, stream) {
            const call = get().peer?.call(peerId, stream)
            set({
                call: call
            })
            return call
        },
        

        clear: () => {
            get().stream?.getTracks().forEach(function (track) {
                track.stop();
                console.log("close");
                
            });
            get().peerStream?.getTracks().forEach(function (track) {
                track.stop();
                console.log("close");

            });
            get().peer?.disconnect()
            set({
                peer: undefined,
                connect: undefined,
                call: undefined,
                peerStream: undefined,
                stream: undefined,
            });
        },
    }),

);
