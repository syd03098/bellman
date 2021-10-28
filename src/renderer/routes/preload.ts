import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("electronOnly", {
  github: async (): Promise<void> => ipcRenderer.invoke("github"),

  openExternalCanvas: async (): Promise<void> =>
    ipcRenderer.invoke("open-external-canvas"),

  addGenericIpcListener: <T>(
    channel: string,
    listener: (e: Event, props: T) => void
  ) => ipcRenderer.on(channel, listener),
  removeGenericIpcListener: (channel: string) =>
    ipcRenderer.removeAllListeners(channel),
});
