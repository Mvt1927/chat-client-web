export interface IServer {
    serverStatus : boolean;
    fetchCheckServerStatus(serverStatusChangeEvent?: () => void): void;
  }
  