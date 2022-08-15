export interface SystemInfo {
  chrome: string;
  node: string;
  electron: string;
  app: string;
}

export interface IsWindows {
  isWindows: boolean;
}

export type NameAPI = "systemInfo";
export type DefaultApiKey = "ipc";
