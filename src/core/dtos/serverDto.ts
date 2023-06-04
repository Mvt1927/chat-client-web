export interface IServerStore {
    serverStatus : boolean;
    fetchCheckServerStatus(serverStatusChangeEvent?: () => void): void;
  }
  