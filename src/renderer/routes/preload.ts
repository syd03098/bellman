import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("electronOnly", {
  openExternalCanvas: async (restart?: boolean): Promise<void> =>
    ipcRenderer.invoke("open-external-canvas", restart),

  openEditOptions: (args: any): void =>
    ipcRenderer.send("open-edit-options", args),

  addGenericIpcListener: <T>(
    channel: string,
    listener: (e: Event, props: T) => void
  ) => ipcRenderer.on(channel, listener),
  removeGenericIpcListener: (channel: string) =>
    ipcRenderer.removeAllListeners(channel),
});
