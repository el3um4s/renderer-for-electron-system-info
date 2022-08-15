import { SystemInfo, IsWindows, NameAPI, DefaultApiKey } from "./interfaces";

const nameAPI: NameAPI = "systemInfo";
const defaultApiKey: DefaultApiKey = "ipc";

const getSystemInfo = async (options: {
  callback?: (arg0: SystemInfo) => void;
  apiKey?: string;
}): Promise<SystemInfo> => {
  const { callback } = options;
  const apiKey = options?.apiKey || defaultApiKey;
  const api = globalThis[apiKey as keyof typeof globalThis][nameAPI];

  return new Promise((resolve) => {
    api.receive("getSystemInfo", (data: SystemInfo) => {
      const { chrome, node, electron, app } = data;
      if (callback) {
        callback({ chrome, node, electron, app });
      }
      resolve({ chrome, node, electron, app });
    });
  });
};

const requestSystemInfo = async (options: {
  callback?: (arg0: SystemInfo) => void;
  apiKey?: string;
}): Promise<SystemInfo> => {
  const { callback } = options;
  const apiKey = options?.apiKey || defaultApiKey;
  const api = globalThis[apiKey as keyof typeof globalThis][nameAPI];

  api.send("requestSystemInfo", null);

  return getSystemInfo({ callback, apiKey });
};

const getIsWindows = async (options: {
  callback?: (arg0: IsWindows) => void;
  apiKey?: string;
}): Promise<IsWindows> => {
  const { callback } = options;
  const apiKey = options?.apiKey || defaultApiKey;
  const api = globalThis[apiKey as keyof typeof globalThis][nameAPI];

  return new Promise((resolve) => {
    api.receive("getIsWindows", (data: IsWindows) => {
      const { isWindows } = data;
      if (callback) {
        callback({ isWindows });
      }
      resolve({ isWindows });
    });
  });
};

const requestIsWindows = async (options: {
  callback?: (arg0: IsWindows) => void;
  apiKey?: string;
}): Promise<IsWindows> => {
  const { callback } = options;
  const apiKey = options?.apiKey || defaultApiKey;
  const api = globalThis[apiKey as keyof typeof globalThis][nameAPI];

  api.send("requestIsWindows", null);
  return getIsWindows({ callback, apiKey });
};

const systemInfo = {
  requestSystemInfo,
  requestIsWindows,
  on: {
    getSystemInfo,
    getIsWindows,
  },
};

export default systemInfo;
