import { DataConnection, MediaConnection, Peer } from 'peerjs'
import PeerEvents from 'peerjs'

export interface IPeerStore {
    peer: Peer | undefined;
    connect: DataConnection | undefined,
    call: MediaConnection | undefined
    stream: MediaStream | undefined,
    peerStream: MediaStream | undefined,
    getMedia(constraints: {
        audio?: boolean,
        video?: boolean
    }): Promise<MediaStream | undefined>
    fetchPeerMedia(call: MediaConnection): Promise<void>
    fetchPeer(token: string): Promise<Peer>;
    fetchPeerConnect(peerId: string): Promise<DataConnection | undefined>;
    fetchPeerCall(peerId: string, stream: MediaStream): Promise<MediaConnection | undefined>
    clear(): void;
}