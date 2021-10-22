import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("electronOnly", {
  github: async (): Promise<void> => ipcRenderer.invoke("github"),
  showIntervalOptionsDropdown: (args: any): void =>
    ipcRenderer.send("show-interval-options-dropdown", args),

  addGenericIpcListener: <T>(
    channel: string,
    listener: (e: Event, props: T) => void
  ) => ipcRenderer.on(channel, listener),
  removeGenericIpcListener: (channel: string) =>
    ipcRenderer.removeAllListeners(channel),
});
